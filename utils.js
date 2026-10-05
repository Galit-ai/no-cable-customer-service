// פונקציות טהורות (ללא DOM): סינון, מיון וחישוב מדדים. הנוסחאות מוגדרות ב-SPEC.md סעיף 5.

const ALL = 'הכל'
// יעד שירות: מענה ראשון תוך 30 דקות (SPEC.md סעיף 5)
const SLA_MINUTES = 30
const DAY_MS = 24 * 60 * 60 * 1000

function average(values) {
  if (values.length === 0) return null
  return values.reduce((sum, v) => sum + v, 0) / values.length
}

// filters: { search, phone, subject, status, category, agent, fromDate, toDate }
// skip: שם פילטר להתעלם ממנו (לגרף הקטגוריות ולמספרי תגיות הסטטוס)
function applyFilters(tickets, filters, skip) {
  const term = filters.search.trim().toLowerCase()
  const phoneTerm = filters.phone.replace(/\D/g, '')
  const from = filters.fromDate ? new Date(`${filters.fromDate}T00:00:00`) : null
  const to = filters.toDate ? new Date(`${filters.toDate}T23:59:59`) : null

  return tickets.filter((t) => {
    if (skip !== 'status' && filters.status !== ALL && t.status !== filters.status) return false
    if (skip !== 'category' && filters.category !== ALL && t.category !== filters.category) return false
    if (filters.subject !== ALL && t.subject !== filters.subject) return false
    if (filters.agent !== ALL && t.assignedAgent !== filters.agent) return false

    const created = new Date(t.createdAt)
    if (from && created < from) return false
    if (to && created > to) return false

    if (term && !`${t.subject} ${t.customerName}`.toLowerCase().includes(term)) return false
    // חיפוש טלפון: ספרות בלבד, כך ש-050-123 ו-050123 זהים
    if (phoneTerm && !t.customerPhone.replace(/\D/g, '').includes(phoneTerm)) return false
    return true
  })
}

function isDateRangeReversed(filters) {
  return Boolean(filters.fromDate && filters.toDate && filters.fromDate > filters.toDate)
}

const PRIORITY_RANK = { נמוך: 1, בינוני: 2, גבוה: 3 }

// sort: { key, dir } או null לברירת מחדל (החדשה לישנה)
function sortTickets(tickets, sort) {
  const list = [...tickets]
  if (!sort) return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  const value = {
    id: (t) => Number(t.id.slice(2)),
    subject: (t) => t.subject,
    priority: (t) => PRIORITY_RANK[t.priority],
    createdAt: (t) => t.createdAt,
    csatScore: (t) => t.csatScore,
  }[sort.key]
  const dir = sort.dir === 'asc' ? 1 : -1

  return list.sort((a, b) => {
    const va = value(a)
    const vb = value(b)
    // פניות ללא ערך (למשל בלי CSAT) תמיד בסוף
    if (va === null && vb === null) return 0
    if (va === null) return 1
    if (vb === null) return -1
    if (typeof va === 'string') return va.localeCompare(vb, 'he') * dir
    return (va - vb) * dir
  })
}

// תאריך הייחוס ל"היום" ול"30 הימים האחרונים" (SPEC.md סעיף 2.2): הגדול מבין תמונת המצב של נתוני הדוגמה
// והפנייה החדשה ביותר בנתונים, כך שפנייה חדשה נספרת "היום" בלי תלות בשעון המחשב.
function referenceNow(tickets) {
  let latest = MOCK_NOW
  for (const t of tickets) {
    const created = new Date(t.createdAt)
    if (created > latest) latest = created
  }
  return latest
}

function computeKpis(tickets, now) {
  const startOfToday = new Date(now)
  startOfToday.setHours(0, 0, 0, 0)

  const responseMinutes = tickets
    .filter((t) => t.firstResponseAt)
    .map((t) => (new Date(t.firstResponseAt) - new Date(t.createdAt)) / 60_000)
  const resolutionHours = tickets
    .filter((t) => t.resolvedAt)
    .map((t) => (new Date(t.resolvedAt) - new Date(t.createdAt)) / 3_600_000)
  const csat = tickets.filter((t) => t.csatScore !== null).map((t) => t.csatScore)

  return {
    open: tickets.filter((t) => t.status !== 'סגור').length,
    inProgress: tickets.filter((t) => t.status === 'בטיפול').length,
    closed: tickets.filter((t) => t.status === 'סגור').length,
    today: tickets.filter((t) => new Date(t.createdAt) >= startOfToday).length,
    avgResponseMinutes: average(responseMinutes),
    avgResolutionHours: average(resolutionHours),
    slaPercent: responseMinutes.length === 0 ? null : (100 * responseMinutes.filter((m) => m <= SLA_MINUTES).length) / responseMinutes.length,
    avgCsat: average(csat),
    csatCount: csat.length,
  }
}

function statusCounts(tickets) {
  const counts = { פתוח: 0, בטיפול: 0, סגור: 0 }
  for (const t of tickets) counts[t.status]++
  return counts
}

// ממוין מהגדול לקטן; כל הקטגוריות מופיעות גם כשהספירה 0
function categoryBreakdown(tickets, categories) {
  return categories
    .map((category) => ({ category, count: tickets.filter((t) => t.category === category).length }))
    .sort((a, b) => b.count - a.count)
}

function dayKey(d) {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

// ספירת פניות חדשות לכל אחד מ-N הימים האחרונים (כולל ימים ריקים)
function dailyVolume(tickets, days, now) {
  const start = new Date(now)
  start.setHours(0, 0, 0, 0)
  start.setDate(start.getDate() - (days - 1))

  const buckets = []
  const index = new Map()
  for (let i = 0; i < days; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    index.set(dayKey(d), i)
    buckets.push({ label: `${d.getDate()}/${d.getMonth() + 1}`, count: 0 })
  }
  for (const t of tickets) {
    const i = index.get(dayKey(new Date(t.createdAt)))
    if (i !== undefined) buckets[i].count++
  }
  return buckets
}

function formatDuration(minutes) {
  if (minutes < 90) return `${Math.round(minutes)} דקות`
  return `${(minutes / 60).toFixed(1)} שעות`
}
