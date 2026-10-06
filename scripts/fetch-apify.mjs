// כלי פיתוח (לא חלק מהאתר): אוסף תגובות לקוחות מדפי הפייסבוק הציבוריים של המתחרים דרך Apify
// וכותב אותן ל-market-data.js. האיפיון: SPEC.md סעיף 14.
// שלב 1: apify/facebook-posts-scraper: הפוסטים האחרונים בכל דף
// שלב 2: apify/facebook-comments-scraper: התגובות לפוסטים (שם נמצא הסנטימנט של הלקוחות)
// שימוש: APIFY_TOKEN=xxx node scripts/fetch-apify.mjs [שם חברה ...]
// בלי ארגומנטים: כל המתחרים. עם ארגומנטים: רק הן, והשאר נשארות בקובץ כמות שהן.
// דורש Node 18+ ואין צורך ב-npm install. הטוקן נשאר מקומי ואינו נכנס לקוד האתר.
import { existsSync, readFileSync, writeFileSync } from 'node:fs'

const token = process.env.APIFY_TOKEN
if (!token) {
  console.error('חסר APIFY_TOKEN (ניתן להשיג ב-https://console.apify.com/account/integrations)')
  process.exit(1)
}

// No Cable היא חברה בדיונית ואין לה דף, ולכן הנתונים שלה נשארים דגימה בקובץ.
const PAGES = {
  HOT: 'https://www.facebook.com/hot.net.il/',
  yes: 'https://www.facebook.com/tv.yes/',
  'Partner TV': 'https://www.facebook.com/PartnerIL/',
  'Cellcom TV': 'https://www.facebook.com/cellcom.official/', // דף סלקום הכללי, אין דף ייעודי לטלוויזיה
  Netflix: 'https://www.facebook.com/netflixisrael/',
}
const FILE = new URL('../market-data.js', import.meta.url)
const HEADER = `// נתוני מחקר שוק: תגובות לקוחות מדפי הפייסבוק של החברות, בפורמט שמחזירים ה-Actors של Apify.
// הקובץ נכתב אוטומטית על ידי scripts/fetch-apify.mjs. פריט עם sample: true הוא דגימה שנכתבה ידנית ולא נתון אמיתי.
// SPEC.md סעיף 14.
const MARKET_MENTIONS = `
const POSTS_PER_PAGE = 5
const COMMENTS_PER_POST = 20

const selected = process.argv.slice(2)
const unknown = selected.filter((b) => !(b in PAGES))
if (unknown.length) {
  console.error(`חברה לא מוכרת: ${unknown.join(', ')}. האפשרויות: ${Object.keys(PAGES).join(', ')}`)
  process.exit(1)
}

async function runActor(actor, input) {
  const url = `https://api.apify.com/v2/acts/${actor}/run-sync-get-dataset-items?token=${token}`
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input) })
  if (!res.ok) throw new Error(`${actor} החזיר ${res.status}: ${await res.text()}`)
  return res.json()
}

const fresh = []
for (const [brand, pageUrl] of Object.entries(PAGES)) {
  if (selected.length && !selected.includes(brand)) continue
  console.log(`${brand}: מביא פוסטים...`)
  const posts = await runActor('apify~facebook-posts-scraper', { startUrls: [{ url: pageUrl }], resultsLimit: POSTS_PER_PAGE })
  const postUrls = posts.map((p) => p.url).filter(Boolean)
  if (!postUrls.length) continue

  console.log(`${brand}: מביא תגובות ל-${postUrls.length} פוסטים...`)
  const comments = await runActor('apify~facebook-comments-scraper', {
    startUrls: postUrls.map((url) => ({ url })),
    resultsLimit: COMMENTS_PER_POST,
  })
  comments.forEach((c, i) => {
    if (!c.text) return
    fresh.push({
      id: c.id ?? `${brand}-${i}`,
      brand,
      author: c.profileName ?? 'משתמש',
      text: c.text,
      date: c.date,
      likes: Number(c.likesCount ?? 0),
      replies: Number(c.commentsCount ?? 0),
      url: c.commentUrl ?? c.facebookUrl ?? c.postUrl ?? '',
    })
  })
}

// חברה שהתקבלו לה תגובות מוחלפת; השאר נשמרות כפי שהיו בקובץ
const fetched = new Set(fresh.map((c) => c.brand))
let kept = []
if (existsSync(FILE)) {
  const text = readFileSync(FILE, 'utf8')
  kept = JSON.parse(text.slice(text.indexOf('['), text.lastIndexOf(']') + 1)).filter((c) => !fetched.has(c.brand))
}
writeFileSync(FILE, HEADER + JSON.stringify([...kept, ...fresh], null, 1) + '\n')
console.log(`נשמרו ${fresh.length} תגובות חדשות (${[...fetched].join(', ') || 'אין'})`)
