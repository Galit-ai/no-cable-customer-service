// חיבור ל-Airtable דרך ה-REST API. האיפיון: SPEC.md סעיף 2.2.

const AIRTABLE_PAGE_SIZE = 100

// ממיר רשומת Airtable לפנייה במבנה של SPEC.md סעיף 4.1.
// ב-Airtable שדה ריק לא מגיע בכלל, ולכן חסר = null.
function recordToTicket(record) {
  const f = record.fields
  return {
    id: f.id,
    subject: f.subject,
    description: f.description || '',
    category: f.category,
    status: f.status,
    priority: f.priority,
    customerName: f.customerName || '',
    customerPhone: f.customerPhone || '',
    assignedAgent: f.assignedAgent || '',
    createdAt: f.createdAt,
    firstResponseAt: f.firstResponseAt || null,
    resolvedAt: f.resolvedAt || null,
    csatScore: typeof f.csatScore === 'number' ? f.csatScore : null,
  }
}

// פנייה תקינה חייבת את שדות החובה. רשומה שבורה מדולגת ולא מפילה את הדאשבורד.
function isValidTicket(t) {
  return Boolean(t.id && t.subject && t.category && t.status && t.priority && t.createdAt)
}

// הטוקן לא נשמר בריפו. מקבלים אותו מהקישור: https://.../#token=pat...
// החלק שאחרי # נשאר בדפדפן ולא נשלח לשרת. הוא נשמר לטאב הנוכחי בלבד (sessionStorage), כדי שרענון לא ימחק אותו.
function getAirtableToken(config) {
  if (config.token) return config.token
  try {
    const fromHash = new URLSearchParams(location.hash.slice(1)).get('token')
    if (fromHash) {
      sessionStorage.setItem('airtable-token', fromHash.trim())
      history.replaceState(null, '', location.pathname + location.search) // מסירים את הטוקן משורת הכתובת
    }
    return sessionStorage.getItem('airtable-token') || ''
  } catch {
    return '' // אין גישה ל-sessionStorage: ממשיכים עם נתוני דוגמה
  }
}

async function fetchAirtableTickets(config, token) {
  const tickets = []
  let offset = ''
  do {
    const url = `https://api.airtable.com/v0/${config.baseId}/${encodeURIComponent(config.table)}?pageSize=${AIRTABLE_PAGE_SIZE}${offset ? `&offset=${offset}` : ''}`
    const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
    if (!response.ok) throw new Error(`Airtable ${response.status}`)
    const data = await response.json()
    tickets.push(...data.records.map(recordToTicket).filter(isValidTicket))
    offset = data.offset || ''
  } while (offset)
  return tickets.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}
