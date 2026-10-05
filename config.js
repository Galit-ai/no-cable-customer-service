// הגדרות החיבור ל-Airtable. הקובץ נטען לדפדפן, ולכן כל מי שפותח את האתר יכול לראות אותו.
// לכן הטוקן חייב להיות לקריאה בלבד (data.records:read) ורק על הבסיס הזה. אף פעם לא טוקן עם הרשאת כתיבה.
// אם הטוקן ריק או שהחיבור נכשל, הדאשבורד מציג נתוני דוגמה (data.js).
const AIRTABLE_CONFIG = {
  baseId: 'appICZEbPgfTiBjr7',
  table: 'tblEuGeBg6jkNMr23', // מזהה הטבלה Tickets (אפשר גם את שמה)
  token: '', // Personal access token לקריאה בלבד: patXXXXXXXX...
}
