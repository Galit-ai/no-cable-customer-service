// נתוני דוגמה לדאשבורד. מבנה הפנייה מתועד ב-SPEC.md סעיף 4.

// PRNG פשוט עם seed קבוע, כדי שנתוני הדוגמה יהיו זהים בכל טעינה
function mulberry32(seed) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const random = mulberry32(42)

function pick(items) {
  return items[Math.floor(random() * items.length)]
}

function randomInt(min, max) {
  return Math.floor(random() * (max - min + 1)) + min
}

const CATEGORIES = ['ניתוק שירות', 'החזרת ציוד וזיכוי', 'חיובים', 'אמצעי תשלום', 'חיבור חדש', 'חבילות ומבצעים']

const SUBJECTS_BY_CATEGORY = {
  'ניתוק שירות': [
    {
      subject: 'בקשה להתנתקות מהשירות',
      description: 'הלקוח מבקש להפסיק את השירות ולסגור את החשבון. יש לבדוק קיום התחייבות, לברר סיבת הניתוק ולהציע שימור לפני סגירה.',
    },
    {
      subject: 'ביטול חבילת ערוצים',
      description: 'הלקוח מבקש לבטל חבילת ערוצים נוספת (ספורט / סרטים) ולהישאר עם חבילת הבסיס.',
    },
    {
      subject: 'מעבר דירה - הפסקת שירות זמנית',
      description: 'הלקוח עובר דירה ומבקש להפסיק את השירות בכתובת הנוכחית. יש לתאם מועד ניתוק ולבדוק אפשרות העברה לכתובת החדשה.',
    },
  ],
  'החזרת ציוד וזיכוי': [
    {
      subject: 'החזרת ממיר וזיכוי',
      description: 'הלקוח התנתק מהשירות ומבקש להחזיר את הממיר ולקבל זיכוי על דמי השכירות ששולמו.',
    },
    {
      subject: 'ציוד הוחזר אך הזיכוי לא התקבל',
      description: 'הלקוח החזיר ציוד בנקודת איסוף (קיים אישור החזרה) לפני יותר משבועיים, אך טרם קיבל זיכוי בחשבון.',
    },
    {
      subject: 'איסוף ציוד מהבית',
      description: 'הלקוח מבקש שנציג הנדסי יגיע לאסוף ממיר ונתב מהכתובת, כי אינו יכול להגיע לנקודת איסוף.',
    },
  ],
  'חיובים': [
    {
      subject: 'חיוב כפול בחשבון החודשי',
      description: 'הלקוח חויב פעמיים עבור אותו חודש. יש לבדוק בכרטיס הלקוח ולבצע זיכוי על החיוב הכפול.',
    },
    {
      subject: 'סכום החיוב גבוה מהמוסכם',
      description: 'הלקוח מדווח כי החיוב החודשי גבוה מהמחיר שסוכם איתו בעת ההצטרפות, ומבקש בדיקה.',
    },
    {
      subject: 'בקשה לחשבונית מתוקנת',
      description: 'הלקוח מבקש לתקן פרט בחשבונית (שם / כתובת / ח.פ) ולקבל חשבונית מעודכנת.',
    },
  ],
  'אמצעי תשלום': [
    {
      subject: 'החלפת כרטיס אשראי לתשלום',
      description: 'הכרטיס הרשום פג תוקף והלקוח מבקש לעדכן כרטיס אשראי חדש לחיוב החודשי.',
    },
    {
      subject: 'מעבר מכרטיס אשראי להוראת קבע',
      description: 'הלקוח מבקש לשלם בהוראת קבע בנקאית במקום בכרטיס אשראי. יש לשלוח טופס הרשאה לחיוב חשבון.',
    },
    {
      subject: 'עדכון פרטי חשבון בנק',
      description: 'הלקוח החליף בנק ומבקש לעדכן את פרטי החשבון שממנו מתבצעת הוראת הקבע.',
    },
  ],
  'חיבור חדש': [
    {
      subject: 'בקשה לחיבור לכבלים בדירה חדשה',
      description: 'לקוח חדש מבקש חיבור לשירות בכתובת שבה לא היה שירות. יש לבדוק זמינות תשתית ולתאם הגעת טכנאי.',
    },
    {
      subject: 'תיאום מועד להגעת טכנאי',
      description: 'הלקוח הזמין התקנה ומבקש לשנות את מועד ההגעה של הטכנאי, כי המועד המקורי לא מתאים לו.',
    },
    {
      subject: 'הוספת ממיר נוסף בבית',
      description: 'לקוח קיים מבקש חיבור ממיר נוסף לחדר נוסף. יש לבדוק עלות והתאמת הנקודה בקיר.',
    },
  ],
  'חבילות ומבצעים': [
    {
      subject: 'מידע על חבילות טריפל',
      description: 'הלקוח מבקש מידע על חבילות הכוללות טלוויזיה, אינטרנט וטלפון, כולל מחירים ותנאי התחייבות.',
    },
    {
      subject: 'מבצעים לחידוש התחייבות',
      description: 'הלקוח שמע על מבצע ללקוחות ותיקים ומבקש לברר אם הוא זכאי ומה התנאים.',
    },
    {
      subject: 'שדרוג מהירות האינטרנט',
      description: 'הלקוח מבקש מידע על שדרוג מהירות הגלישה, מה העלות החודשית ואם נדרש ציוד חדש.',
    },
  ],
}

const PRIORITIES = ['נמוך', 'בינוני', 'גבוה']

const AGENTS = ['דנה כהן', 'יוסי לוי', 'מיכל אברהם', 'עומר דוד', 'שירה מזרחי']

const CUSTOMER_FIRST_NAMES = [
  'נועה', 'איתי', 'רועי', 'ליאור', 'תמר', 'אורי', 'מאיה', 'גיל', 'הדר', 'עידן',
]
const CUSTOMER_LAST_NAMES = [
  'פרידמן', 'שפירא', 'גבע', 'רוזן', 'אזולאי', 'ברק', 'נחום', 'כץ', 'עמית', 'סגל',
]

function randomCustomerName() {
  return `${pick(CUSTOMER_FIRST_NAMES)} ${pick(CUSTOMER_LAST_NAMES)}`
}

function statusForTicket() {
  const r = random()
  if (r < 0.12) return 'פתוח'
  if (r < 0.27) return 'בטיפול'
  return 'סגור'
}

// נתוני דוגמה מעודדים: רוב הדירוגים 4-5
function randomCsat() {
  const r = random()
  if (r < 0.6) return 5
  if (r < 0.92) return 4
  return 3
}

const TICKET_COUNT = 70
const TODAY_COUNT = 7 // כמה פניות מגיעות "היום"
const DAYS_BACK = 30

// "עכשיו" קבוע עבור נתוני הדוגמה, כך שמדדים כמו "הגיעו היום" יהיו יציבים
const MOCK_NOW = new Date('2026-09-22T12:00:00Z')
const NOW = MOCK_NOW

// מחולל נפרד לטלפונים, כדי שהוספת השדה לא תשנה את שאר נתוני הדוגמה
const phoneRandom = mulberry32(7)
function randomPhone() {
  const prefix = ['050', '052', '053', '054', '058'][Math.floor(phoneRandom() * 5)]
  const rest = String(Math.floor(phoneRandom() * 10_000_000)).padStart(7, '0')
  return `${prefix}-${rest}`
}

function generateTickets() {
  const tickets = []

  for (let i = 0; i < TICKET_COUNT; i++) {
    const category = pick(CATEGORIES)
    const template = pick(SUBJECTS_BY_CATEGORY[category])
    const isToday = i < TODAY_COUNT
    // הפנייה הראשונה של היום עדיין פתוחה וממתינה למענה, כדי שיהיה מה להציג
    const status = i === 0 ? 'פתוח' : statusForTicket()

    // פיזור שווה על פני הימים (בלי ימים ריקים), בשעות פעילות 08:00-20:00.
    // "היום": 08:00-11:00, כדי שתמיד יהיה לפני "עכשיו"
    const daysBack = isToday ? 0 : 1 + ((i - TODAY_COUNT) % (DAYS_BACK - 1))
    const createdAt = new Date(NOW)
    createdAt.setHours(0, 0, 0, 0)
    createdAt.setDate(createdAt.getDate() - daysBack)
    createdAt.setMinutes(isToday ? randomInt(8 * 60, 11 * 60) : randomInt(8 * 60, 20 * 60))

    // פנייה "פתוח" חדשה עשויה עדיין לא לקבל מענה ראשוני
    const hasFirstResponse = i === 0 ? false : status !== 'פתוח' || random() < 0.6
    const firstResponseAt = hasFirstResponse
      ? new Date(createdAt.getTime() + randomInt(4, 50) * 60_000)
      : null

    const resolvedAt =
      status === 'סגור' && firstResponseAt
        ? new Date(firstResponseAt.getTime() + randomInt(30, 60 * 9) * 60_000)
        : null

    const csatScore = resolvedAt && random() < 0.8 ? randomCsat() : null

    tickets.push({
      id: `T-${1000 + i}`,
      subject: template.subject,
      description: template.description,
      category,
      status,
      priority: pick(PRIORITIES),
      customerName: randomCustomerName(),
      customerPhone: randomPhone(),
      assignedAgent: pick(AGENTS),
      createdAt: createdAt.toISOString(),
      firstResponseAt: firstResponseAt ? firstResponseAt.toISOString() : null,
      resolvedAt: resolvedAt ? resolvedAt.toISOString() : null,
      csatScore,
    })
  }

  return tickets.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

const mockTickets = generateTickets()

// נקודת החיבור היחידה למקור הנתונים. בחיבור למקור נתונים אמיתי מחליפים כאן את המימוש ב-fetch ל-API (למשל Airtable),
// והפונקציה ממשיכה להחזיר Promise של מערך פניות באותו מבנה.
function getTickets() {
  return Promise.resolve(mockTickets)
}
