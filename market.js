// מסך מחקר שוק: השוואת No Cable למתחרים לפי תגובות לקוחות ברשת. האיפיון: SPEC.md סעיף 14.
// החלק הראשון: פונקציות טהורות (ללא DOM). החלק השני: רינדור וחיבור.

const OWN_BRAND = 'No Cable'
const SENTIMENTS = ['חיובי', 'ניטרלי', 'שלילי']
const SENTIMENT_COLORS = { חיובי: '#0f7a56', ניטרלי: '#6b6a66', שלילי: '#c0392b' }

// ניתוח סנטימנט פשוט לפי מילות מפתח בעברית. מספיק להדגמה; אפשר להחליף במודל (SPEC.md 14.4).
const POSITIVE_WORDS = [
  'מעולה', 'מצוין', 'נהדר', 'מרוצה', 'ממליץ', 'שירות טוב', 'מהיר', 'יציב', 'אמין', 'משתלם',
  'זולה', 'הוגן', 'כיף', 'נוח', 'השתפר', 'השיפור', 'אדיבה', 'חלקה', 'נעים',
]
const NEGATIVE_WORDS = [
  'גרוע', 'איטי', 'תקלה', 'תקלות', 'יקר', 'מתסכל', 'נוראי', 'מאכזב', 'מעצבן', 'קריסה', 'קורסת',
  'הפסקת שידור', 'לא עונים', 'סיוט', 'התעלם', 'נתקע', 'לא הסבירו', 'בלי הסבר', 'מחכה', 'שוקל לבטל',
]

function detectSentiment(text) {
  const t = text.toLowerCase()
  const score = POSITIVE_WORDS.filter((w) => t.includes(w)).length - NEGATIVE_WORDS.filter((w) => t.includes(w)).length
  return score > 0 ? 'חיובי' : score < 0 ? 'שלילי' : 'ניטרלי'
}

// נושאי תלונה (SPEC.md 14.8): תגובה שלילית נספרת בכל נושא שמילת מפתח שלו מופיעה בה
const COMPLAINT_THEMES = {
  'מחיר וחיוב': ['יקר', 'מחיר', 'חיוב', 'חשבונית', 'עלייה', 'עלה', 'עלתה'],
  'תקלות שידור': ['תקלה', 'תקלות', 'הפסקת שידור', 'קריסה', 'קורסת', 'נתקע'],
  'שירות לקוחות': ['לא עונים', 'ממתינים', 'חיכיתי', 'התעלם', 'נציג', 'בשירות'],
  'ביטול מנוי': ['ביטול', 'מבטלים', 'לבטל'],
}

// צבע קבוע לכל נושא תלונה (ארבעה נושאים, ארבעה צבעים), בפלטה של הדאשבורד
const THEME_COLORS = { 'מחיר וחיוב': '#2a78d6', 'תקלות שידור': '#eb6834', 'שירות לקוחות': '#4a3aa7', 'ביטול מנוי': '#e87ba4' }

// כוונת עזיבה (SPEC.md 14.9): ביטוי שמעיד על ביטול, מעבר או חיפוש חלופה
const LEAVE_PHRASES = ['שוקל לעבור', 'שוקל לבטל', 'שוקל לעזוב', 'מחפש חלופה', 'עוברים ל', 'עברתי ל', 'מעבר ל', 'לעזוב', 'איך מבטלים', 'ביטול מנוי']

// שם שמופיע בטקסט -> שם החברה במסך
const BRAND_ALIASES = { HOT: 'HOT', yes: 'yes', Partner: 'Partner TV', Cellcom: 'Cellcom TV', נטפליקס: 'Netflix', Netflix: 'Netflix', 'No Cable': 'No Cable' }

function detectThemes(text) {
  return Object.keys(COMPLAINT_THEMES).filter((theme) => COMPLAINT_THEMES[theme].some((w) => text.includes(w)))
}

function detectLeaving(text) {
  return LEAVE_PHRASES.some((p) => text.includes(p))
}

// חברות אחרות שמוזכרות בטקסט של תגובה בדף של חברה
function mentionedBrands(text, ownBrand) {
  return [...new Set(Object.entries(BRAND_ALIASES).filter(([alias]) => text.includes(alias)).map(([, brand]) => brand))].filter((b) => b !== ownBrand)
}

function toMentions(raw) {
  return raw.map((m) => {
    const sentiment = detectSentiment(m.text)
    return {
      ...m,
      sentiment,
      themes: sentiment === 'שלילי' ? detectThemes(m.text) : [],
      leaving: detectLeaving(m.text),
      mentioned: mentionedBrands(m.text, m.brand),
    }
  })
}

// טבלת נושאים x חברות: מספר תגובות שליליות בכל נושא
function complaintMatrix(mentions) {
  const brands = brandSentiment(mentions).map((r) => r.brand)
  const rows = Object.keys(COMPLAINT_THEMES).map((theme) => ({
    theme,
    counts: brands.map((b) => mentions.filter((m) => m.brand === b && m.themes.includes(theme)).length),
  }))
  return { brands, rows }
}

// שורה לכל חברה: ספירה לפי סנטימנט. החברה שלנו ראשונה, ואחריה לפי מספר התגובות.
function brandSentiment(mentions) {
  const rows = new Map()
  for (const m of mentions) {
    const row = rows.get(m.brand) || { brand: m.brand, total: 0, חיובי: 0, ניטרלי: 0, שלילי: 0 }
    row.total += 1
    row[m.sentiment] += 1
    rows.set(m.brand, row)
  }
  return [...rows.values()].sort((a, b) => (b.brand === OWN_BRAND) - (a.brand === OWN_BRAND) || b.total - a.total)
}

// (חיוביות פחות שליליות) באחוזים מכלל התגובות. ללא תגובות: null
function netSentiment(row) {
  return row && row.total ? Math.round(((row.חיובי - row.שלילי) / row.total) * 100) : null
}

// ספירה שבועית; שבוע מתחיל ביום א' (UTC). שבועות בלי תגובות מופיעים עם 0.
function weeklyTrend(mentions) {
  if (mentions.length === 0) return []
  const weekStart = (iso) => {
    const d = new Date(iso)
    d.setUTCHours(0, 0, 0, 0)
    d.setUTCDate(d.getUTCDate() - d.getUTCDay())
    return d.getTime()
  }
  const counts = new Map()
  for (const m of mentions) counts.set(weekStart(m.date), (counts.get(weekStart(m.date)) || 0) + 1)
  const times = [...counts.keys()]
  const result = []
  for (let t = Math.min(...times); t <= Math.max(...times); t += 7 * DAY_MS) {
    const d = new Date(t)
    result.push({ label: `${String(d.getUTCDate()).padStart(2, '0')}/${String(d.getUTCMonth() + 1).padStart(2, '0')}`, count: counts.get(t) || 0 })
  }
  return result
}

function engagement(m) {
  return m.likes + m.replies * 2
}

// ---------- רינדור ----------

// תגובות מהחודש האחרון בלבד (SPEC.md 14.5). הייחוס הוא התגובה החדשה ביותר בנתונים, לא שעון המחשב.
const MARKET_WINDOW_DAYS = 30

const marketState = { mentions: [], brand: ALL, until: null }
let marketReady = false

function recentMentions(mentions, days) {
  if (mentions.length === 0) return { recent: [], until: null }
  const until = Math.max(...mentions.map((m) => new Date(m.date).getTime()))
  return { recent: mentions.filter((m) => new Date(m.date).getTime() > until - days * DAY_MS), until }
}

function formatDay(ms) {
  return new Date(ms).toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' })
}

function marketSourceText(mentions) {
  const sampleBrands = [...new Set(mentions.filter((m) => m.sample).map((m) => m.brand))]
  if (sampleBrands.length === 0) return 'נתונים מ-Apify (תגובות בדפי פייסבוק ציבוריים)'
  if (sampleBrands.length === new Set(mentions.map((m) => m.brand)).size) return 'דגימת נתונים בפורמט של Apify (לא נתונים חיים)'
  return `נתונים מ-Apify. דגימה בלבד (לא נתונים חיים) עבור: ${sampleBrands.join(', ')}`
}

function renderMarketKpis(all, filtered) {
  const rows = brandSentiment(all)
  const own = rows.find((r) => r.brand === OWN_BRAND)
  const rivals = rows.filter((r) => r.brand !== OWN_BRAND)
  const rivalsAvg = rivals.length ? Math.round(rivals.reduce((s, r) => s + netSentiment(r), 0) / rivals.length) : null
  const count = (s) => filtered.filter((m) => m.sentiment === s).length
  const negPct = filtered.length ? Math.round((count('שלילי') / filtered.length) * 100) : null
  const ownNet = netSentiment(own)
  const cards = [
    { label: 'סה״כ תגובות', value: String(filtered.length), accent: 'var(--blue)' },
    { label: 'תגובות חיוביות', value: String(count('חיובי')), accent: 'var(--green)' },
    { label: 'תגובות שליליות', value: String(count('שלילי')), sub: negPct === null ? '' : `${negPct}% מהתגובות`, accent: '#c0392b' },
    {
      label: `ציון סנטימנט ${OWN_BRAND}`,
      value: ownNet === null ? '—' : String(ownNet),
      sub: rivalsAvg === null ? '' : `ממוצע מתחרים: ${rivalsAvg} (חיוביות פחות שליליות, באחוזים)`,
      accent: ownNet !== null && rivalsAvg !== null && ownNet >= rivalsAvg ? 'var(--green)' : 'var(--yellow)',
    },
  ]
  $('market-kpis').replaceChildren(
    ...cards.map((c) => {
      const card = el('div', 'kpi')
      card.style.setProperty('--accent', c.accent)
      card.append(el('div', 'kpi-label', c.label), el('div', 'kpi-value', c.value), el('div', 'kpi-sub', c.sub || ''))
      return card
    }),
  )
}

// עמודות מוערמות: שורה לכל חברה, לחיצה מסננת. מחושב על כל החברות, כדי שאפשר לעבור ביניהן.
function renderSentimentChart(all) {
  const rows = brandSentiment(all)
  const max = Math.max(...rows.map((r) => r.total), 1)
  const list = el('div', 'cat-chart')
  for (const r of rows) {
    const row = el('button', 'cat-row sent-row')
    row.type = 'button'
    row.setAttribute('aria-pressed', String(r.brand === marketState.brand))
    if (marketState.brand !== ALL && r.brand !== marketState.brand) row.classList.add('dim')
    row.setAttribute('aria-label', `${r.brand}: ${r.חיובי} חיוביות, ${r.ניטרלי} ניטרליות, ${r.שלילי} שליליות`)
    const track = el('span', 'cat-track sent-track')
    track.style.width = `${(r.total / max) * 100}%`
    for (const s of SENTIMENTS) {
      if (!r[s]) continue
      const seg = el('span', 'sent-seg', String(r[s]))
      seg.style.flex = String(r[s])
      seg.style.background = SENTIMENT_COLORS[s]
      track.append(seg)
    }
    row.append(el('span', 'cat-label', r.brand), el('span', 'sent-bar', ''), el('span', 'cat-value', String(r.total)))
    row.querySelector('.sent-bar').append(track)
    row.addEventListener('click', () => {
      marketState.brand = marketState.brand === r.brand ? ALL : r.brand
      renderMarket()
    })
    list.append(row)
  }
  const legend = el('div', 'legend')
  for (const s of SENTIMENTS) {
    const item = el('span', 'legend-item', s)
    const dot = el('span', 'dot')
    dot.style.background = SENTIMENT_COLORS[s]
    item.prepend(dot)
    legend.append(item)
  }
  $('sentiment-chart').replaceChildren(list, legend)
}

// קו שבועי ב-SVG, עם ערך גלוי מעל כל נקודה (בלי תלות ב-hover)
function renderTrendChart(filtered) {
  const container = $('trend-chart')
  container.replaceChildren()
  const weeks = weeklyTrend(filtered)
  if (weeks.length === 0) {
    container.append(el('p', 'empty', 'אין תגובות להצגה'))
    return
  }
  const W = 600, H = 240
  const m = { top: 24, right: 20, bottom: 28, left: 34 }
  const plotW = W - m.left - m.right
  const plotH = H - m.top - m.bottom
  const maxCount = Math.max(...weeks.map((w) => w.count), 1)
  const step = maxCount <= 4 ? 1 : maxCount <= 10 ? 2 : Math.ceil(maxCount / 4)
  const yMax = Math.ceil(maxCount / step) * step
  const y = (v) => m.top + plotH - (v / yMax) * plotH
  // RTL: השבוע הישן ביותר בימין
  const inset = 16
  const x = (i) => (weeks.length === 1 ? W / 2 : W - m.right - inset - (i / (weeks.length - 1)) * (plotW - 2 * inset))

  const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, class: 'chart-svg', role: 'img', 'aria-label': 'גרף קו: תגובות לפי שבוע' })
  for (let v = 0; v <= yMax; v += step) {
    svg.append(svgEl('line', { x1: m.left, x2: W - m.right, y1: y(v), y2: y(v), class: 'grid' }))
    svg.append(svgEl('text', { x: m.left - 6, y: y(v) + 4, class: 'axis-label', 'text-anchor': 'end' }, String(v)))
  }
  svg.append(svgEl('polyline', { points: weeks.map((w, i) => `${x(i)},${y(w.count)}`).join(' '), class: 'line' }))
  weeks.forEach((w, i) => {
    svg.append(svgEl('circle', { cx: x(i), cy: y(w.count), r: 4, class: 'point' }))
    svg.append(svgEl('text', { x: x(i), y: y(w.count) - 9, class: 'axis-label value-label', 'text-anchor': 'middle' }, String(w.count)))
    svg.append(svgEl('text', { x: x(i), y: H - 8, class: 'axis-label', 'text-anchor': 'middle' }, w.label))
  })
  container.append(svg)

  const table = document.createElement('table')
  table.className = 'visually-hidden'
  table.innerHTML = '<caption>תגובות לפי שבוע (שבוע המתחיל ביום א׳)</caption>'
  for (const w of weeks) {
    const tr = table.insertRow()
    tr.insertCell().textContent = w.label
    tr.insertCell().textContent = String(w.count)
  }
  container.append(table)
}

function renderTopComments(filtered) {
  const top = [...filtered].sort((a, b) => engagement(b) - engagement(a)).slice(0, 8)
  const list = el('ul', 'top-list')
  if (top.length === 0) list.append(el('li', 'empty', 'אין תגובות להצגה'))
  for (const m of top) {
    const item = el('li', 'top-item')
    const body = el('div', 'top-body')
    let textNode
    if (m.url) {
      textNode = el('a', 'top-text', m.text)
      textNode.href = m.url
      textNode.target = '_blank'
      textNode.rel = 'noreferrer'
    } else {
      textNode = el('span', 'top-text', m.text)
    }
    body.append(textNode, el('div', 'top-meta', `${m.brand} · ${m.author} · 👍 ${m.likes} · 💬 ${m.replies}`))
    const badge = el('span', 'sent-badge', m.sentiment)
    badge.style.background = SENTIMENT_COLORS[m.sentiment]
    const side = el('span', 'top-side')
    side.append(badge)
    if (m.leaving) {
      side.append(el('span', 'mention-tag leave-tag', 'חושב לעזוב'))
      for (const b of m.mentioned) side.append(el('span', 'mention-tag', `מוזכר: ${b}`))
    }
    item.append(body, side)
    list.append(item)
  }
  $('top-comments').replaceChildren(list)
}

function buildTable(headers, rows) {
  const table = el('table', 'research-table')
  const head = table.createTHead().insertRow()
  for (const h of headers) head.append(el('th', '', h))
  const body = table.createTBody()
  for (const { cells, fake } of rows) {
    const tr = body.insertRow()
    if (fake) tr.className = 'fake'
    for (const c of cells) {
      const td = tr.insertCell()
      if (c instanceof Node) td.append(c)
      else td.textContent = c
    }
  }
  return table
}

function sourceCell(source, url) {
  if (!url) return source
  const a = el('a', '', source)
  a.href = url
  a.target = '_blank'
  a.rel = 'noreferrer'
  return a
}

function brandCell(brand, fake) {
  const span = el('span', '', brand)
  if (fake) span.append(el('span', 'fake-tag', 'חברת דמה'))
  return span
}

function renderResearch() {
  $('packages-table').replaceChildren(
    buildTable(
      ['חברה', 'חבילה', 'מחיר לחודש', 'מה כלול', 'מקור'],
      MARKET_PACKAGES.map((p) => ({ fake: p.fake, cells: [brandCell(p.brand, p.fake), p.name, p.price, p.includes, sourceCell(p.source, p.url)] })),
    ),
  )
  $('series-table').replaceChildren(
    buildTable(
      ['סדרה', 'ז׳אנר', 'איפה שודרה', 'הערכה', 'זמינה ב-No Cable (דמה)', 'מקור'],
      MARKET_SERIES.map((s) => ({ cells: [s.title, s.genre, s.platform, s.note, s.noCable ? 'כן' : 'לא', sourceCell(s.source, s.url)] })),
    ),
  )
}

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function renderComplaints(mentions) {
  const { brands, rows } = complaintMatrix(mentions)
  const max = Math.max(...rows.flatMap((r) => r.counts), 1)
  const table = buildTable(
    ['נושא התלונה', ...brands],
    rows.map((r) => {
      const [red, green, blue] = hexToRgb(THEME_COLORS[r.theme])
      const label = el('span', '', r.theme)
      const dot = el('span', 'dot')
      dot.style.background = THEME_COLORS[r.theme]
      label.prepend(dot)
      return {
        cells: [
          label,
          ...r.counts.map((c) => {
            const span = el('span', 'heat', c === 0 ? '—' : String(c))
            if (c > 0) {
              const alpha = 0.25 + 0.65 * (c / max)
              span.style.background = `rgba(${red}, ${green}, ${blue}, ${alpha})`
              if (alpha > 0.8) span.style.color = '#fff'
            }
            return span
          }),
        ],
      }
    }),
  )
  table.classList.add('heat-table')
  $('complaints-table').replaceChildren(table)
}

function renderMarket() {
  const all = marketState.mentions
  const filtered = all.filter((m) => marketState.brand === ALL || m.brand === marketState.brand)
  const windowText = marketState.until ? ` · תגובות מ-${MARKET_WINDOW_DAYS} הימים האחרונים (עד ${formatDay(marketState.until)})` : ''
  $('market-source').textContent = marketSourceText(all) + windowText
  renderMarketKpis(all, filtered)
  renderSentimentChart(all)
  renderTrendChart(filtered)
  renderTopComments(filtered)
  renderComplaints(marketState.mentions)
  renderResearch()
  $('trend-scope').textContent = marketState.brand === ALL ? 'כל החברות' : marketState.brand
  $('market-clear').hidden = marketState.brand === ALL
}

function showTab(name) {
  const market = name === 'market'
  $('service-view').hidden = market
  $('market-view').hidden = !market
  for (const tab of document.querySelectorAll('.tab')) tab.setAttribute('aria-selected', String(tab.dataset.tab === name))
  if (market && !marketReady) {
    marketReady = true
    const { recent, until } = recentMentions(MARKET_MENTIONS, MARKET_WINDOW_DAYS)
    marketState.mentions = toMentions(recent)
    marketState.until = until
    renderMarket()
  }
}

function setupTabs() {
  for (const tab of document.querySelectorAll('.tab')) tab.addEventListener('click', () => showTab(tab.dataset.tab))
  $('market-clear').addEventListener('click', () => {
    marketState.brand = ALL
    renderMarket()
  })
}

setupTabs()
