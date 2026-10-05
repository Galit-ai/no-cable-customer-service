// הגדרות החיבור ל-Airtable. הקובץ נטען לדפדפן, ולכן כל מי שפותח את האתר (והריפו ציבורי) יכול לראות אותו.
// לכן הטוקן חייב להיות לקריאה בלבד (data.records:read) ורק על הבסיס הזה. אף פעם לא טוקן עם הרשאת כתיבה.
// מבטלים את הטוקן ב-airtable.com/create/tokens אחרי שהבדיקה הסתיימה.
// אם הטוקן ריק, אפשר למסור אותו בקישור: ...#token=pat... (airtable.js). בלי טוקן או אם החיבור נכשל: נתוני דוגמה (data.js).
const AIRTABLE_CONFIG = {
  baseId: 'appICZEbPgfTiBjr7',
  table: 'tblEuGeBg6jkNMr23', // מזהה הטבלה Tickets (אפשר גם את שמה)
  token: 'patFzdefw2cUmXucH.78d17b02aabe250b027e16fb7a7ce18dbb8aa18f89ce289f8387582c50848cf8', // Personal access token לקריאה בלבד: pat...
}
