// כרטיס שערי חליפין: מקור מידע חיצוני (Frankfurter API). האיפיון: SPEC.md סעיף 15.
// ה-API ציבורי, ללא טוקן, עם CORS, ולכן נקרא ישירות מהדפדפן. כשל בו לא משפיע על שאר הדאשבורד.

const EXCHANGE_API_URL = 'https://api.frankfurter.dev/v1/latest'
const EXCHANGE_CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'דולר' },
  { code: 'EUR', symbol: '€', name: 'יורו' },
  { code: 'GBP', symbol: '£', name: 'לירה שטרלינג' },
]
const EXCHANGE_TIMEOUT_MS = 8000
// השערים של הבנק האירופי מתפרסמים פעם ביום עבודה, ולכן מרעננים פעם ביממה (SPEC.md 15.7)
const EXCHANGE_REFRESH_MS = 24 * 60 * 60 * 1000
const EXCHANGE_CHECK_MS = 60 * 60 * 1000
// שער ישן מ-4 ימים (סוף שבוע ארוך וחג) מסומן באזהרה
const EXCHANGE_STALE_DAYS = 4

let currentRates = null
let lastExchangeFetchMs = 0

// פונקציה טהורה: ה-API מחזיר כמה יחידות זרות מקבלים עבור שקל אחד, והכרטיס מציג כמה שקלים שווה יחידה אחת.
function parseExchangeRates(data) {
  const rates = EXCHANGE_CURRENCIES.map((c) => {
    const perShekel = data && data.rates ? data.rates[c.code] : undefined
    if (typeof perShekel !== 'number' || perShekel <= 0) throw new Error(`חסר שער עבור ${c.code}`)
    return { ...c, ils: 1 / perShekel }
  })
  return { date: data.date, rates }
}

// פונקציה טהורה: ממירה סכום בין שקלים למטבע זר לפי השער (שקלים ליחידה). מעוגל לשתי ספרות.
function convertAmount(amount, ils, direction) {
  if (!Number.isFinite(amount) || amount < 0 || !(ils > 0)) return null
  const value = direction === 'toIls' ? amount * ils : amount / ils
  return Math.round(value * 100) / 100
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
  const ageDays = (Date.now() - new Date(`${result.date}T00:00:00Z`).getTime()) / (24 * 60 * 60 * 1000)
  note.textContent = `שערים נכון ל-${result.date}`
  if (ageDays > EXCHANGE_STALE_DAYS) note.textContent += ' · השער ישן, כדאי לוודא מול מקור עדכני'
}

function formatMoney(value, symbol) {
  return `${symbol}${value.toLocaleString('he-IL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function renderConverter() {
  const result = document.getElementById('conv-result')
  if (!result || !currentRates) return
  const rate = currentRates.rates.find((r) => r.code === document.getElementById('conv-currency').value)
  const amount = parseFloat(document.getElementById('conv-amount').value)
  const direction = document.getElementById('conv-direction').value
  const converted = rate ? convertAmount(amount, rate.ils, direction) : null
  if (converted === null) {
    result.textContent = 'יש להזין סכום תקין'
    return
  }
  result.textContent =
    direction === 'toIls'
      ? `${formatMoney(amount, rate.symbol)} = ${formatMoney(converted, '₪')}`
      : `${formatMoney(amount, '₪')} = ${formatMoney(converted, rate.symbol)}`
}

function fillConverterCurrencies(rates) {
  const select = document.getElementById('conv-currency')
  if (!select || select.options.length) return
  for (const r of rates) select.append(new Option(`${r.name} (${r.code})`, r.code))
}

async function loadExchangeRates() {
  const box = document.getElementById('exchange-rates')
  try {
    currentRates = await fetchExchangeRates()
    lastExchangeFetchMs = Date.now()
    renderExchangeRates(currentRates)
    fillConverterCurrencies(currentRates.rates)
    renderConverter()
  } catch (err) {
    console.error(err)
    // כישלון ברענון לא מוחק שערים קיימים; רק בטעינה הראשונה מוצגת הודעת שגיאה
    if (!currentRates) {
      box.textContent = 'לא ניתן לטעון שערי חליפין כרגע.'
      box.classList.add('rates-error')
    }
  }
}

function initExchangeRates() {
  if (!document.getElementById('exchange-rates')) return
  loadExchangeRates()
  for (const id of ['conv-amount', 'conv-currency', 'conv-direction']) {
    document.getElementById(id).addEventListener('input', renderConverter)
  }
  document.getElementById('exchange-refresh').addEventListener('click', loadExchangeRates)
  // רענון פעם ביממה: בדיקה כל שעה, וגם כשחוזרים ללשונית שנשארה פתוחה
  setInterval(() => {
    if (Date.now() - lastExchangeFetchMs >= EXCHANGE_REFRESH_MS) loadExchangeRates()
  }, EXCHANGE_CHECK_MS)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && Date.now() - lastExchangeFetchMs >= EXCHANGE_REFRESH_MS) loadExchangeRates()
  })
}

initExchangeRates()
