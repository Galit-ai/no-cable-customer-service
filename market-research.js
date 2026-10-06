// נתוני מחקר שוק ידניים: חבילות לפי חברה וסדרות ישראליות. האיפיון: SPEC.md סעיף 14.7.
// הנתונים נאספו מחיפוש באינטרנט (מקורות מצוינים בכל שורה) וחלקם ישן, ולכן יש לוודא מול אתרי החברות.
// שורות עם fake: true הן נתונים מומצאים של No Cable, חברת דמה, ואינם נתון אמיתי.

const MARKET_PACKAGES = [
  {
    brand: 'No Cable', fake: true, name: 'No Cable משפחה', price: '119 ₪',
    includes: '60 ערוצים, כולל ספורט וילדים · נטפליקס Standard כלול · ממיר ללא עלות · שלושת החודשים הראשונים ב-49 ₪',
    source: 'מומצא (חברת דמה)',
  },
  {
    brand: 'No Cable', fake: true, name: 'No Cable בסיס', price: '79 ₪',
    includes: '35 ערוצים, כולל כל הערוצים הישראליים · בלי ספורט פרימיום · בלי נטפליקס',
    source: 'מומצא (חברת דמה)',
  },
  {
    brand: 'Partner TV', name: 'Partner TV עם נטפליקס', price: '89 ₪ (69 ₪ בלי נטפליקס)',
    includes: '40 ערוצים, כולל ספורט, ילדים, טבע, חדשות וכל הערוצים הישראליים · נטפליקס כלול בחבילה של 89 ₪',
    source: 'Globes, Times of Israel (מקור ישן)', url: 'https://en.globes.co.il/en/article-partner-offers-television-for-nis-69-monthly-1001194237',
  },
  {
    brand: 'Cellcom TV', name: 'Cellcom TV בסיס', price: '99–100 ₪',
    includes: 'ערוצי ישראל, ערוצי סרטים וסדרות ישראליות, Idan Plus · ספורט פרימיום בתוספת 52 ₪ · בלי נטפליקס · גישה לתוכן של HOT דרך Next TV · חבילת טריפל (אינטרנט 40 מגה, טלוויזיה וקו נייח) ב-149 ₪',
    source: 'Globes, JPost (מקורות ישנים)', url: 'https://en.globes.co.il/en/article-1001036049',
  },
  {
    brand: 'HOT', name: 'HOT חבילת בסיס / מלאה', price: '129 ₪ בסיס · 399 ₪ מלאה',
    includes: 'בסיס: 16 ערוצים (כולל הערוצים המסחריים, חדשות וקולנוע) · מלאה: כל הערוצים כולל פרימיום · חבילות צרות לילדים או לספורט ב-120 ₪ · יותר מ-170 ערוצים וכ-40,000 כותרי VOD',
    source: 'Globes (מקורות ישנים; המחירים כנראה השתנו)', url: 'https://en.globes.co.il/en/article-1000813063',
  },
  {
    brand: 'yes', name: 'yes Total', price: 'כ-199–299 ₪',
    includes: 'חבילה מורחבת של yes (קיימות גם yes Basic, yes Movies & Series ו-yes+ כשירות סטרימינג נפרד). לא נמצא פירוט ערוצים',
    source: 'אתר מידע משני (subger.com), לא אומת באתר yes', url: 'https://subger.com/en/service/yes-israel',
  },
  {
    brand: 'Netflix', name: 'Netflix (סטרימינג בלבד)', price: '32.90 / 54.90 / 69.90 ₪',
    includes: 'Basic (720p, מכשיר אחד) / Standard (1080p, שני מכשירים) / Premium (4K, ארבעה מכשירים). בלי ערוצים חיים',
    source: 'Calcalist, Globes (המחירים ייתכן שהתעדכנו)', url: 'https://en.globes.co.il/en/article-1001290389',
  },
]

// השוואה בין סדרות ישראליות בלבד
const MARKET_SERIES = [
  {
    title: 'חטופים (Hatufim)', genre: 'מתח / דרמה בטחונית', platform: 'קשת, ערוץ 2 (2010–2012, שתי עונות)',
    note: 'מקום 1 ברשימת New York Times לסדרות הזרות של העשור · המקור של Homeland האמריקאית', noCable: true,
    source: 'Times of Israel, Wikipedia', url: 'https://www.timesofisrael.com/israels-hatufim-is-ny-times-best-foreign-show-of-decade/',
  },
  {
    title: 'פאודה (Fauda)', genre: 'מתח / דרמה בטחונית', platform: 'yes; בעולם: נטפליקס (מידע כללי, לא אומת בחיפוש)',
    note: 'מקום 8 ברשימת New York Times לסדרות הזרות של העשור', noCable: true,
    source: 'Times of Israel', url: 'https://www.timesofisrael.com/israels-hatufim-is-ny-times-best-foreign-show-of-decade/',
  },
  {
    title: 'שטיסל (Shtisel)', genre: 'דרמה משפחתית', platform: 'yes; בעולם: נטפליקס (מידע כללי, לא אומת בחיפוש)',
    note: 'אזכור כבוד ברשימת New York Times · על משפחה חרדית בירושלים', noCable: true,
    source: 'Times of Israel', url: 'https://www.timesofisrael.com/israels-hatufim-is-ny-times-best-foreign-show-of-decade/',
  },
  {
    title: 'טהרן (Tehran)', genre: 'מתח / ריגול', platform: 'כאן 11; בעולם: Apple TV+ (מידע כללי, לא אומת בחיפוש)',
    note: 'לא הופיעה ברשימת New York Times, אבל מופיעה ברשימות אחרות של סדרות ישראליות מובילות', noCable: false,
    source: 'Times of Israel',
  },
]
