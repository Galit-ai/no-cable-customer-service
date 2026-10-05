// חיבור בין הנתונים, הסינון והתצוגה. האיפיון: SPEC.md סעיפים 6-8.

const CATEGORY_LIST = ['ניתוק שירות', 'החזרת ציוד וזיכוי', 'חיובים', 'אמצעי תשלום', 'חיבור חדש', 'חבילות ומבצעים']
const STATUSES = ['פתוח', 'בטיפול', 'סגור']
const STATUS_COLORS = { פתוח: '#eda100', בטיפול: '#2a78d6', סגור: '#1baf7a' }
const PRIORITY_MARK = { גבוה: '▲', בינוני: '◆', נמוך: '▼' }

const state = {
  tickets: [],
  filters: { search: '', phone: '', subject: ALL, status: ALL, category: ALL, agent: ALL, fromDate: '', toDate: '' },
  sort: null,
  expandedId: null,
}

const $ = (id) => document.getElementById(id)
const isNarrow = () => window.matchMedia('(max-width: 599px)').matches

function el(tag, className, text) {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (text !== undefined) node.textContent = text
  return node
}

function formatDateTime(iso) {
  return new Date(iso).toLocaleString('he-IL', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
}

function hasActiveFilters() {
  const f = state.filters
  return f.search !== '' || f.phone !== '' || f.subject !== ALL || f.status !== ALL || f.category !== ALL || f.agent !== ALL || f.fromDate !== '' || f.toDate !== ''
}

// ---------- KPI ----------

function renderKpis(tickets) {
  const k = computeKpis(tickets)
  const cards = [
    { label: 'פניות פתוחות', value: String(k.open), sub: `מתוכן ${k.inProgress} בטיפול`, accent: 'var(--yellow)' },
    { label: 'פניות שנסגרו', value: String(k.closed), accent: 'var(--green)' },
    { label: 'הגיעו היום', value: String(k.today), accent: 'var(--blue)' },
    { label: 'זמן תגובה ממוצע', value: k.avgResponseMinutes === null ? '—' : String(Math.round(k.avgResponseMinutes)), unit: k.avgResponseMinutes === null ? '' : "דק'", sub: k.slaPercent === null ? '' : `${Math.round(k.slaPercent)}% נענו תוך ${SLA_MINUTES} דק'`, accent: 'var(--violet)' },
    { label: 'זמן פתרון ממוצע', value: k.avgResolutionHours === null ? '—' : k.avgResolutionHours.toFixed(1), unit: k.avgResolutionHours === null ? '' : 'שעות', accent: 'var(--orange)' },
    { label: 'שביעות רצון (CSAT)', value: k.avgCsat === null ? '—' : k.avgCsat.toFixed(1), unit: k.avgCsat === null ? '' : '/ 5', sub: `מתוך ${k.csatCount} דירוגים`, accent: 'var(--magenta)' },
  ]
  $('kpis').replaceChildren(
    ...cards.map((c) => {
      const card = el('div', 'kpi')
      card.style.setProperty('--accent', c.accent)
      const value = el('div', 'kpi-value', c.value)
      if (c.unit) value.append(' ', el('span', 'kpi-unit', c.unit))
      card.append(el('div', 'kpi-label', c.label), value, el('div', 'kpi-sub', c.sub || ''))
      return card
    }),
  )
}

// ---------- תגיות סטטוס ----------

function renderStatusChips() {
  // המספרים משקפים את כל הפילטרים חוץ מסטטוס
  const base = applyFilters(state.tickets, state.filters, 'status')
  const counts = statusCounts(base)
  const items = [{ value: ALL, label: `הכל (${base.length})` }, ...STATUSES.map((s) => ({ value: s, label: `${s} (${counts[s]})` }))]
  $('status-chips').replaceChildren(
    ...items.map(({ value, label }) => {
      const b = el('button', 'chip', label)
      b.type = 'button'
      b.setAttribute('aria-pressed', String(state.filters.status === value))
      b.addEventListener('click', () => {
        // לחיצה חוזרת על התגית הפעילה מחזירה ל"הכל"
        state.filters.status = state.filters.status === value ? ALL : value
        render()
      })
      return b
    }),
  )
}

// ---------- רשימת פניות ----------

const SORTABLE = [
  ['id', 'מזהה'], ['subject', 'נושא'], [null, 'קטגוריה'], [null, 'סטטוס', 'col-status'], ['priority', 'עדיפות', 'col-priority'],
  [null, 'לקוח', 'col-customer'], [null, 'נציג'], ['createdAt', 'נפתחה'], ['csatScore', 'CSAT'],
]

function nextSort(key) {
  const s = state.sort
  if (!s || s.key !== key) return { key, dir: 'asc' }
  return s.dir === 'asc' ? { key, dir: 'desc' } : null
}

function noteKey(id) { return `ticket-note:${id}` }

function buildDetail(t, idPrefix) {
  const box = el('div', 'detail')
  box.addEventListener('click', (e) => e.stopPropagation())
  box.append(el('p', '', t.description))

  const dl = el('dl')
  const respMinutes = t.firstResponseAt ? (new Date(t.firstResponseAt) - new Date(t.createdAt)) / 60_000 : null
  const waitingMinutes = (MOCK_NOW - new Date(t.createdAt)) / 60_000
  const slaBreached = respMinutes === null ? waitingMinutes > SLA_MINUTES : respMinutes > SLA_MINUTES
  const resp = (respMinutes === null ? 'טרם נענתה' : formatDuration(respMinutes)) + (slaBreached ? ` · חריגה מיעד ${SLA_MINUTES} דק'` : '')
  const reso = t.resolvedAt ? formatDuration((new Date(t.resolvedAt) - new Date(t.createdAt)) / 60_000) : 'טרם נסגרה'
  for (const [term, value] of [['טלפון לקוח: ', t.customerPhone], ['תגובה ראשונה: ', resp], ['זמן פתרון: ', reso]]) {
    const wrap = el('div')
    wrap.append(el('dt', '', term), el('dd', value.includes('חריגה') ? 'breach' : '', value))
    dl.append(wrap)
  }
  box.append(dl)

  const label = el('label', '', 'הערות נציג (מתוך השיחה עם הלקוח)')
  const area = el('textarea')
  area.id = `${idPrefix}-${t.id}`
  area.rows = 3
  area.placeholder = 'הוסיפו כאן הערות מתוך השיחה עם הלקוח…'
  label.htmlFor = area.id
  try { area.value = localStorage.getItem(noteKey(t.id)) || '' } catch { /* אין localStorage - ממשיכים בלי */ }
  area.addEventListener('input', () => {
    try { localStorage.setItem(noteKey(t.id), area.value) } catch { /* ההערה עובדת עד רענון */ }
  })
  box.append(label, area, el('small', '', 'נשמר בדפדפן הזה בלבד'))
  return box
}

function toggleExpanded(id) {
  state.expandedId = state.expandedId === id ? null : id
  renderList()
}

function dotted(text, color) {
  const span = el('span')
  const dot = el('span', 'dot')
  dot.style.background = color
  dot.setAttribute('aria-hidden', 'true')
  span.append(dot, text)
  return span
}

function renderList() {
  const filtered = applyFilters(state.tickets, state.filters)
  const sorted = sortTickets(filtered, state.sort)
  if (state.expandedId && !sorted.some((t) => t.id === state.expandedId)) state.expandedId = null

  $('summary').textContent = `מציג ${sorted.length} מתוך ${state.tickets.length} פניות`
  const host = $('tickets-list')

  if (sorted.length === 0) {
    const empty = el('div', 'empty', 'לא נמצאו פניות התואמות לסינון ')
    const btn = el('button', 'btn-light', 'נקה סינונים')
    btn.type = 'button'
    btn.addEventListener('click', clearFilters)
    empty.append(btn)
    host.replaceChildren(empty)
    return
  }

  // טבלה (דסקטופ/טאבלט)
  const table = el('table')
  const headRow = table.createTHead().insertRow()
  for (const [key, label, cls] of SORTABLE) {
    const th = el('th', cls || '')
    th.scope = 'col'
    if (key) {
      const active = state.sort && state.sort.key === key
      th.setAttribute('aria-sort', active ? (state.sort.dir === 'asc' ? 'ascending' : 'descending') : 'none')
      const b = el('button', '', label + (active ? (state.sort.dir === 'asc' ? ' ▲' : ' ▼') : ''))
      b.type = 'button'
      b.addEventListener('click', () => { state.sort = nextSort(key); renderList() })
      th.append(b)
    } else {
      th.textContent = label
    }
    headRow.append(th)
  }

  const body = table.createTBody()
  for (const t of sorted) {
    const expanded = state.expandedId === t.id
    const tr = body.insertRow()
    tr.className = 'row-main'
    tr.tabIndex = 0
    tr.setAttribute('aria-expanded', String(expanded))
    tr.addEventListener('click', () => toggleExpanded(t.id))
    tr.addEventListener('keydown', (e) => {
      if (e.target === tr && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); toggleExpanded(t.id) }
    })
    const cells = [
      [t.id], [t.subject], [dotted(t.category, CATEGORY_COLORS[t.category])], [dotted(t.status, STATUS_COLORS[t.status])],
      [`${PRIORITY_MARK[t.priority]} ${t.priority}`, 'col-priority'], [t.customerName, 'col-customer'], [t.assignedAgent],
      [formatDateTime(t.createdAt)], [t.csatScore === null ? '—' : String(t.csatScore)],
    ]
    for (const [content, cls] of cells) {
      const td = tr.insertCell()
      if (cls) td.className = cls
      td.append(content)
    }
    if (expanded) {
      const dr = body.insertRow()
      dr.className = 'row-detail'
      const td = dr.insertCell()
      td.colSpan = SORTABLE.length
      td.append(buildDetail(t, 'note'))
    }
  }

  // כרטיסים (מובייל)
  const cards = el('div', 'cards')
  for (const t of sorted) {
    const card = el('div', 'card')
    card.tabIndex = 0
    card.setAttribute('aria-expanded', String(state.expandedId === t.id))
    card.addEventListener('click', () => toggleExpanded(t.id))
    card.addEventListener('keydown', (e) => {
      if (e.target === card && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); toggleExpanded(t.id) }
    })
    const meta = el('div', 'meta')
    meta.append(dotted(t.status, STATUS_COLORS[t.status]), dotted(t.category, CATEGORY_COLORS[t.category]), el('span', '', t.assignedAgent), el('span', '', formatDateTime(t.createdAt)))
    card.append(el('h3', '', `${t.id} · ${t.subject}`), meta)
    if (state.expandedId === t.id) card.append(buildDetail(t, 'note-m'))
    cards.append(card)
  }

  host.replaceChildren(table, cards)
}

// ---------- רינדור כללי ----------

function renderCharts() {
  const days = dailyVolume(applyFilters(state.tickets, state.filters), 30)
  renderVolumeChart($('volume-chart'), days, isNarrow())

  // גרף הקטגוריות: כל הפילטרים חוץ מקטגוריה, כדי שאפשר יהיה לעבור בין קטגוריות
  const base = applyFilters(state.tickets, state.filters, 'category')
  const active = state.filters.category === ALL ? null : state.filters.category
  renderCategoryChart($('category-chart'), categoryBreakdown(base, CATEGORY_LIST), active, (cat) => {
    state.filters.category = state.filters.category === cat ? ALL : cat
    render()
  })
}

function render() {
  const filtered = applyFilters(state.tickets, state.filters)
  renderKpis(filtered)
  renderStatusChips()
  renderCharts()
  renderList()
  $('clear-filters').hidden = !hasActiveFilters()
  $('date-warning').hidden = !isDateRangeReversed(state.filters)
}

function clearFilters() {
  state.filters = { search: '', phone: '', subject: ALL, status: ALL, category: ALL, agent: ALL, fromDate: '', toDate: '' }
  $('search').value = ''
  $('phone').value = ''
  $('subject').value = ALL
  $('agent').value = ALL
  $('from-date').value = ''
  $('to-date').value = ''
  render()
}

function setupControls() {
  const agents = [...new Set(state.tickets.map((t) => t.assignedAgent))].sort((a, b) => a.localeCompare(b, 'he'))
  $('agent').replaceChildren(...[ALL, ...agents].map((a) => new Option(a === ALL ? 'כל הנציגים' : a, a)))

  // רשימת הנושאים מקובצת לפי קטגוריה
  const subjectSelect = $('subject')
  subjectSelect.replaceChildren(new Option('כל הנושאים', ALL))
  for (const category of CATEGORY_LIST) {
    const subjects = [...new Set(state.tickets.filter((t) => t.category === category).map((t) => t.subject))].sort((a, b) => a.localeCompare(b, 'he'))
    if (subjects.length === 0) continue
    const group = document.createElement('optgroup')
    group.label = category
    group.append(...subjects.map((s) => new Option(s, s)))
    subjectSelect.append(group)
  }

  const debounced = (key) => {
    let timer
    return (e) => {
      clearTimeout(timer)
      timer = setTimeout(() => { state.filters[key] = e.target.value; render() }, 150)
    }
  }
  $('search').addEventListener('input', debounced('search'))
  $('phone').addEventListener('input', debounced('phone'))
  subjectSelect.addEventListener('change', (e) => { state.filters.subject = e.target.value; render() })
  $('agent').addEventListener('change', (e) => { state.filters.agent = e.target.value; render() })
  $('from-date').addEventListener('change', (e) => { state.filters.fromDate = e.target.value; render() })
  $('to-date').addEventListener('change', (e) => { state.filters.toDate = e.target.value; render() })
  $('clear-filters').addEventListener('click', clearFilters)
  $('filters-toggle').addEventListener('click', (e) => {
    const open = $('filters').classList.toggle('open')
    e.currentTarget.setAttribute('aria-expanded', String(open))
  })
  window.matchMedia('(max-width: 599px)').addEventListener('change', renderCharts)
}

function init() {
  getTickets()
    .then((tickets) => {
      state.tickets = tickets
      setupControls()
      $('data-source').textContent = `${dataSource.note} · נכון ל-22/09/2026`
      $('status-msg').hidden = true
      $('content').hidden = false
      render()
    })
    .catch(() => {
      const msg = $('status-msg')
      msg.textContent = 'לא הצלחנו לטעון את הנתונים '
      const retry = el('button', 'btn-light', 'נסה שוב')
      retry.type = 'button'
      retry.addEventListener('click', () => { msg.textContent = 'טוען נתונים…'; init() })
      msg.append(retry)
    })
}

init()
