// נתוני מחקר שוק: תגובות לקוחות מדפי הפייסבוק של החברות, בפורמט שמחזירים ה-Actors של Apify.
// הקובץ נכתב אוטומטית על ידי scripts/fetch-apify.mjs. פריט עם sample: true הוא דגימה שנכתבה ידנית ולא נתון אמיתי.
// SPEC.md סעיף 14.
const MARKET_MENTIONS = [
 {
  "id": "fb_1",
  "brand": "No Cable",
  "author": "דנה א.",
  "text": "שירות הלקוחות של No Cable מעולה. התקשרתי בגלל תקלה בממיר והנציג פתר הכול בשיחה אחת. מרוצה מאוד, ממליץ.",
  "date": "2026-08-06T06:00:00.000Z",
  "likes": 64,
  "replies": 18,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_2",
  "brand": "No Cable",
  "author": "יוסי ב.",
  "text": "No Cable העלו מחיר בלי להודיע. קיבלתי חשבונית יקרה יותר ב-30 שקל. מעצבן ולא הסבירו כלום.",
  "date": "2026-09-11T11:17:00.000Z",
  "likes": 118,
  "replies": 54,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_3",
  "brand": "No Cable",
  "author": "מיכל ג.",
  "text": "חבילת הערוצים של No Cable משתלמת. מבחר ערוצים רחב, איכות שידור מצוינת והמחיר הוגן.",
  "date": "2026-08-17T16:34:00.000Z",
  "likes": 41,
  "replies": 12,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_4",
  "brand": "No Cable",
  "author": "אורי ד.",
  "text": "תקלות שידור חוזרות ב-No Cable. זו כבר הפעם השלישית החודש. מתסכל, והזמן ההמתנה בטלפון איטי ונוראי.",
  "date": "2026-09-21T07:51:00.000Z",
  "likes": 87,
  "replies": 47,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_5",
  "brand": "No Cable",
  "author": "נועה ה.",
  "text": "אפליקציית No Cable לצפייה בנייד. האפליקציה נוחה ומהירה, השיפור האחרון ממש הורגש.",
  "date": "2026-08-27T12:08:00.000Z",
  "likes": 29,
  "replies": 7,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_6",
  "brand": "No Cable",
  "author": "אבי ו.",
  "text": "מישהו יודע איך מבטלים מנוי ב-No Cable?. מחפש איך לעבור חבילה. יש מישהו שעשה את זה לאחרונה?",
  "date": "2026-10-02T17:25:00.000Z",
  "likes": 19,
  "replies": 23,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_7",
  "brand": "HOT",
  "author": "שירה ז.",
  "text": "HOT הפסקת שידור באמצע המשחק. הקריסה הייתה בדיוק ברבע האחרון. גרוע ומאכזב.",
  "date": "2026-09-07T08:42:00.000Z",
  "likes": 156,
  "replies": 92,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_8",
  "brand": "HOT",
  "author": "רן ח.",
  "text": "HOT שירות טכנאים מהיר. הטכנאי הגיע באותו יום והכול עובד. שירות טוב, מרוצה.",
  "date": "2026-08-12T13:59:00.000Z",
  "likes": 52,
  "replies": 13,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_9",
  "brand": "HOT",
  "author": "טל ט.",
  "text": "HOT או yes? מה כדאי היום. שתי החברות יקרות. מישהו עבר לאחרונה ויכול להמליץ?",
  "date": "2026-09-17T18:16:00.000Z",
  "likes": 130,
  "replies": 88,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_10",
  "brand": "HOT",
  "author": "גיל י.",
  "text": "החשבון של HOT עלה שוב. עלייה במחיר בלי הסבר. יקר מדי, שוקל לעבור.",
  "date": "2026-08-23T09:33:00.000Z",
  "likes": 101,
  "replies": 61,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_11",
  "brand": "HOT",
  "author": "דנה ך.",
  "text": "האינטרנט של HOT יציב ומהיר. סיבים אופטיים מעולים, מהירות מצוינת ואמין.",
  "date": "2026-09-28T14:50:00.000Z",
  "likes": 73,
  "replies": 22,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_12",
  "brand": "HOT",
  "author": "יוסי כ.",
  "text": "HOT לא עונים בטלפון. חיכיתי 40 דקות וניתקו לי. מתסכל ונוראי.",
  "date": "2026-09-02T19:07:00.000Z",
  "likes": 66,
  "replies": 35,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_13",
  "brand": "yes",
  "author": "מיכל ל.",
  "text": "yes שידרו את הסדרה החדשה בהקדמה. תוכן נהדר, הממיר החדש מהיר וכיף להשתמש בו.",
  "date": "2026-08-08T10:24:00.000Z",
  "likes": 48,
  "replies": 15,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_14",
  "brand": "yes",
  "author": "אורי ם.",
  "text": "yes ביטול מנוי זה סיוט. לא עונים, מעבירים בין נציגים ומעכבים. מעצבן ביותר.",
  "date": "2026-09-13T15:41:00.000Z",
  "likes": 121,
  "replies": 70,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_15",
  "brand": "yes",
  "author": "נועה מ.",
  "text": "yes+ מול נטפליקס. מבחינת מחיר yes משתלם יותר אם צופים בהרבה ערוצים.",
  "date": "2026-08-19T06:58:00.000Z",
  "likes": 37,
  "replies": 29,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_16",
  "brand": "yes",
  "author": "אבי ן.",
  "text": "ממיר yes נתקע כל הזמן. תקלה אחרי תקלה, ממיר איטי ומתסכל.",
  "date": "2026-09-23T11:15:00.000Z",
  "likes": 24,
  "replies": 16,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_17",
  "brand": "yes",
  "author": "שירה נ.",
  "text": "שירות הלקוחות של yes השתפר. פתרו לי את הבעיה מהר, נציגה אדיבה. מצוין.",
  "date": "2026-08-29T16:32:00.000Z",
  "likes": 33,
  "replies": 9,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_18",
  "brand": "Partner TV",
  "author": "רן ס.",
  "text": "Partner TV חבילה זולה ומשתלמת. מחיר טוב, הוספתי ערוצי ספורט בלי בעיות. ממליץ.",
  "date": "2026-10-04T07:49:00.000Z",
  "likes": 58,
  "replies": 20,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_19",
  "brand": "Partner TV",
  "author": "טל ע.",
  "text": "Partner TV האפליקציה קורסת. האפליקציה גרועה, קורסת כל כמה דקות. מאכזב.",
  "date": "2026-09-09T12:06:00.000Z",
  "likes": 27,
  "replies": 14,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_20",
  "brand": "Partner TV",
  "author": "גיל ף.",
  "text": "מעבר ל-Partner TV מ-HOT. ההתקנה הייתה חלקה והשירות נעים. מרוצה מהמעבר.",
  "date": "2026-08-14T17:23:00.000Z",
  "likes": 45,
  "replies": 26,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_21",
  "brand": "Partner TV",
  "author": "דנה א.",
  "text": "Partner TV מבצעי חבילה שווים?. מישהו ניסה? מתלבט בין Partner ל-Cellcom.",
  "date": "2026-09-19T08:40:00.000Z",
  "likes": 22,
  "replies": 31,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_22",
  "brand": "Cellcom TV",
  "author": "יוסי ב.",
  "text": "Cellcom TV איכות תמונה נהדרת. שידור יציב ואיכותי, החבילה משתלמת.",
  "date": "2026-08-25T13:57:00.000Z",
  "likes": 39,
  "replies": 11,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_23",
  "brand": "Cellcom TV",
  "author": "מיכל ג.",
  "text": "Cellcom TV החיוב שלא הוסבר. חיוב כפול ושירות לקוחות שהתעלם. מתסכל ויקר.",
  "date": "2026-09-30T18:14:00.000Z",
  "likes": 51,
  "replies": 28,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_24",
  "brand": "Cellcom TV",
  "author": "אורי ד.",
  "text": "Cellcom TV תקלה בשידור הערוצים. הפסקת שידור כל ערב. גרוע, מחכה שיתקנו.",
  "date": "2026-09-05T09:31:00.000Z",
  "likes": 34,
  "replies": 19,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_25",
  "brand": "Cellcom TV",
  "author": "נועה ה.",
  "text": "Cellcom TV ממליץ על החבילה המשפחתית. זול יחסית והשירות טוב, כיף לצפות.",
  "date": "2026-08-10T14:48:00.000Z",
  "likes": 26,
  "replies": 8,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_26",
  "brand": "Netflix",
  "author": "אבי ו.",
  "text": "נטפליקס עלתה שוב. עלייה במחיר, יקר מדי, שוקל לבטל ולחזור לכבלים.",
  "date": "2026-09-15T19:05:00.000Z",
  "likes": 210,
  "replies": 102,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_27",
  "brand": "Netflix",
  "author": "שירה ז.",
  "text": "נטפליקס הסדרה החדשה מעולה. תוכן מצוין, צפייה נוחה. ממליץ בחום.",
  "date": "2026-08-21T10:22:00.000Z",
  "likes": 95,
  "replies": 40,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_28",
  "brand": "Netflix",
  "author": "רן ח.",
  "text": "נטפליקס או חבילת ערוצים?. בעד כבלים בגלל ספורט ושידורים חיים. נטפליקס טובה לסדרות בלבד.",
  "date": "2026-09-26T15:39:00.000Z",
  "likes": 77,
  "replies": 66,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_29",
  "brand": "Netflix",
  "author": "טל ט.",
  "text": "נטפליקס התקלה בהזרמה. הצפייה איטית ונתקעת. מעצבן.",
  "date": "2026-08-31T06:56:00.000Z",
  "likes": 15,
  "replies": 9,
  "url": "",
  "sample": true
 }
]
