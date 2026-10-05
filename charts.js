// שני הגרפים, כ-SVG שנוצר ב-JS. האיפיון: SPEC.md סעיפים 6.3 ו-6.4.

const SVG_NS = 'http://www.w3.org/2000/svg'

const CATEGORY_COLORS = {
  'ניתוק שירות': '#2a78d6',
  'החזרת ציוד וזיכוי': '#eb6834',
  'חיובים': '#1baf7a',
  'אמצעי תשלום': '#eda100',
  'חיבור חדש': '#e87ba4',
  'חבילות ומבצעים': '#4a3aa7',
}

function svgEl(name, attrs, text) {
  const el = document.createElementNS(SVG_NS, name)
  for (const [k, v] of Object.entries(attrs || {})) el.setAttribute(k, v)
  if (text !== undefined) el.textContent = text
  return el
}

// גרף 1: עמודות אנכיות, עמודה ליום. tooltip הוא אלמנט HTML שמנוהל מבחוץ.
function renderVolumeChart(container, buckets, isNarrow) {
  container.replaceChildren()

  const W = 600
  const H = 260
  const m = { top: 12, right: 12, bottom: 28, left: 34 }
  const plotW = W - m.left - m.right
  const plotH = H - m.top - m.bottom

  // ציר Y מתחיל מ-0 ועם מקסימום "עגול"
  const maxCount = Math.max(...buckets.map((b) => b.count), 1)
  const step = maxCount <= 4 ? 1 : maxCount <= 10 ? 2 : Math.ceil(maxCount / 4)
  const yMax = Math.ceil(maxCount / step) * step
  const y = (v) => m.top + plotH - (v / yMax) * plotH

  const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, class: 'chart-svg', role: 'img', 'aria-label': 'גרף עמודות: פניות חדשות לפי יום' })

  for (let v = 0; v <= yMax; v += step) {
    svg.append(svgEl('line', { x1: m.left, x2: W - m.right, y1: y(v), y2: y(v), class: 'grid' }))
    svg.append(svgEl('text', { x: m.left - 6, y: y(v) + 4, class: 'axis-label', 'text-anchor': 'end' }, String(v)))
  }

  const slot = plotW / buckets.length
  const barW = slot * 0.7
  const labelEvery = isNarrow ? 10 : 5
  const tip = container.parentElement.querySelector('.tooltip')

  buckets.forEach((b, i) => {
    // RTL: היום הישן ביותר בימין, היום האחרון בשמאל
    const x = W - m.right - (i + 1) * slot + (slot - barW) / 2
    const h = (b.count / yMax) * plotH
    const bar = svgEl('rect', { x, y: y(b.count), width: barW, height: Math.max(h, 0), rx: 2, class: 'bar', tabindex: 0 })
    const text = `${b.label}: ${b.count} פניות`
    const show = () => {
      tip.textContent = text
      tip.hidden = false
      tip.style.left = `${((x + barW / 2) / W) * 100}%`
    }
    bar.addEventListener('mouseenter', show)
    bar.addEventListener('focus', show)
    bar.addEventListener('click', show)
    bar.addEventListener('mouseleave', () => (tip.hidden = true))
    bar.addEventListener('blur', () => (tip.hidden = true))
    svg.append(bar)

    if (i % labelEvery === 0 || i === buckets.length - 1) {
      svg.append(svgEl('text', { x: x + barW / 2, y: H - 8, class: 'axis-label', 'text-anchor': 'middle' }, b.label))
    }
  })

  container.append(svg)

  // טבלת נתונים לקוראי מסך
  const table = document.createElement('table')
  table.className = 'visually-hidden'
  table.innerHTML = '<caption>פניות חדשות לפי יום</caption>'
  for (const b of buckets) {
    const tr = table.insertRow()
    tr.insertCell().textContent = b.label
    tr.insertCell().textContent = String(b.count)
  }
  container.append(table)
}

// גרף 2: עמודות אופקיות. לחיצה = סינון קטגוריה.
function renderCategoryChart(container, rows, activeCategory, onSelect) {
  container.replaceChildren()
  const maxCount = Math.max(...rows.map((r) => r.count), 1)

  const list = document.createElement('div')
  list.className = 'cat-chart'
  for (const { category, count } of rows) {
    const row = document.createElement('button')
    row.type = 'button'
    row.className = 'cat-row'
    row.setAttribute('aria-pressed', String(category === activeCategory))
    if (activeCategory && category !== activeCategory) row.classList.add('dim')

    const label = document.createElement('span')
    label.className = 'cat-label'
    label.textContent = category

    const track = document.createElement('span')
    track.className = 'cat-track'
    const fill = document.createElement('span')
    fill.className = 'cat-fill'
    fill.style.width = `${(count / maxCount) * 100}%`
    fill.style.background = CATEGORY_COLORS[category]
    track.append(fill)

    const value = document.createElement('span')
    value.className = 'cat-value'
    value.textContent = String(count)

    row.append(label, track, value)
    row.addEventListener('click', () => onSelect(category))
    list.append(row)
  }
  container.append(list)
}
