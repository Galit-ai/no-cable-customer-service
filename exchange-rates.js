// כרטיס שערי חליפין: מקור מידע חיצוני (Frankfurter API). האיפיון: SPEC.md סעיף 15.
// ה-API ציבורי, ללא טוקן, עם CORS, ולכן נקרא ישירות מהדפדפן. כשל בו לא משפיע על שאר הדאשבורד.

const EXCHANGE_API_URL = 'https://api.frankfurter.dev/v1/latest'
const EXCHANGE_CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'דולר' },
  { code: 'EUR', symbol: '€', name: 'יורו' },
  { code: 'GBP', symbol: '£', name: 'לירה שטרלינג' },
]
const EXCHANGE_TIMEOUT_MS = 8000

// פונקציה טהורה: ה-API מחזיר כמה יחידות זרות מקבלים עבור שקל אחד, והכרטיס מציג כמה שקלים שווה יחידה אחת.
function parseExchangeRates(data) {
  const rates = EXCHANGE_CURRENCIES.map((c) => {
    const perShekel = data && data.rates ? data.rates[c.code] : undefined
    if (typeof perShekel !== 'number' || perShekel <= 0) throw new Error(`חסר שער עבור ${c.code}`)
    return { ...c, ils: 1 / perShekel }
  })
  return { date: data.date, rates }
}

async function fetchExchangeRates() {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), EXCHANGE_TIMEOUT_MS)
  try {
    const url = `${EXCHANGE_API_URL}?base=ILS&symbols=${EXCHANGE_CURRENCIES.map((c) => c.code).join(',')}`
    const res = await fetch(url, { signal: controller.signal })
    if (!res.ok) throw new Error(`שגיאת שרת ${res.status}`)
    return parseExchangeRates(await res.json())
  } finally {
    clearTimeout(timer)
  }
}

function renderExchangeRates(result) {
  const box = document.getElementById('exchange-rates')
  const note = document.getElementById('exchange-date')
  box.replaceChildren(
    ...result.rates.map((r) => {
      const card = document.createElement('div')
      card.className = 'rate'
      const label = document.createElement('div')
      label.className = 'rate-label'
      label.textContent = `${r.symbol} 1 ${r.name}`
      const value = document.createElement('div')
      value.className = 'rate-value'
      value.textContent = `₪${r.ils.toFixed(3)}`
      card.append(label, value)
      return card
    }),
  )
  note.textContent = `שערים נכון ל-${result.date}`
}

async function initExchangeRates() {
  const box = document.getElementById('exchange-rates')
  if (!box) return
  try {
    renderExchangeRates(await fetchExchangeRates())
  } catch (err) {
    console.error(err)
    box.textContent = 'לא ניתן לטעון שערי חליפין כרגע.'
    box.classList.add('rates-error')
  }
}

initExchangeRates()
