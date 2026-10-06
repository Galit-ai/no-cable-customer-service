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
  "id": "fb_30",
  "brand": "No Cable",
  "author": "שירן ל.",
  "text": "No Cable: ממתינים שעה לנציג. לא עונים בטלפון וזה מתסכל, שוקל לעבור ל-HOT.",
  "date": "2026-09-28T08:12:00.000Z",
  "likes": 58,
  "replies": 21,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_31",
  "brand": "No Cable",
  "author": "עמית ג.",
  "text": "תקלה בשידור של No Cable בזמן המשחק. קריסה באמצע, מאכזב.",
  "date": "2026-10-02T19:40:00.000Z",
  "likes": 44,
  "replies": 16,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_32",
  "brand": "No Cable",
  "author": "רועי ב.",
  "text": "No Cable החיוב עלה, יקר מדי. מחפש חלופה, אולי Partner TV.",
  "date": "2026-09-18T10:05:00.000Z",
  "likes": 71,
  "replies": 33,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_33",
  "brand": "No Cable",
  "author": "מיה ק.",
  "text": "מרוצה מ-No Cable, השירות מהיר והחבילה משתלמת.",
  "date": "2026-10-03T12:30:00.000Z",
  "likes": 36,
  "replies": 9,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_34",
  "brand": "No Cable",
  "author": "נדב ש.",
  "text": "No Cable ביטול מנוי? עברתי ל-yes בגלל המחיר.",
  "date": "2026-08-10T09:20:00.000Z",
  "likes": 25,
  "replies": 12,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_40",
  "brand": "Partner TV",
  "author": "קרן ו.",
  "text": "Partner TV האפליקציה קורסת, תקלה כל ערב. מתסכל.",
  "date": "2026-09-22T21:05:00.000Z",
  "likes": 30,
  "replies": 14,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_45",
  "brand": "Partner TV",
  "author": "גל ת.",
  "text": "Partner TV חבילה משתלמת, ממליץ בחום.",
  "date": "2026-09-27T09:30:00.000Z",
  "likes": 49,
  "replies": 15,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_47",
  "brand": "No Cable",
  "author": "הדר ו.",
  "text": "No Cable שירות לקוחות מעולה, נציג אדיב ופתר הכול.",
  "date": "2026-09-29T11:15:00.000Z",
  "likes": 67,
  "replies": 19,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_48",
  "brand": "No Cable",
  "author": "איתי ס.",
  "text": "No Cable ערוצי ספורט מצוינים, איכות שידור נהדרת.",
  "date": "2026-09-23T20:30:00.000Z",
  "likes": 54,
  "replies": 17,
  "url": "",
  "sample": true
 },
 {
  "id": "fb_3453660551477982",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "ומתי הכפתור בשלט יעודכן לאפליקציה החדשה?",
  "date": "2026-09-27T11:03:27.000Z",
  "likes": 7,
  "replies": 0,
  "url": "https://www.facebook.com/tv.yes/posts/pfbid02qzWdn7Yo2hXUY7cFnpnibBTPQUFWH6Yig1VCFpajsBue2TuWcobxwUvrCcQjE61Cl?comment_id=3453660551477982"
 },
 {
  "id": "fb_1068671142720558",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "חברים בואו לצוד דילים שווים ✂️👇🏻 \nצדים דילים מאלי אקספרס",
  "date": "2026-09-27T17:22:05.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/tv.yes/posts/pfbid02qzWdn7Yo2hXUY7cFnpnibBTPQUFWH6Yig1VCFpajsBue2TuWcobxwUvrCcQjE61Cl?comment_id=1068671142720558"
 },
 {
  "id": "fb_1982482222424173",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "די להאכיל אותנו לוקשים - תנו סדרות איכות וסרטי איכות למיעוט הנרדף .",
  "date": "2026-10-01T09:14:20.000Z",
  "likes": 6,
  "replies": 0,
  "url": "https://www.facebook.com/tv.yes/posts/pfbid0cFPX2Xv9yBqekijfCahxSXH2yJHzAgbi8mCTahizagBPdkcw27PfmBNLF7WrZJqVl?comment_id=1982482222424173"
 },
 {
  "id": "fb_965509609276605",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "אם הייתה תוכנת דיבור שמקריאה את הסדרות הייתי יכול לראות סדרות נתי לוינשטיין יש לי לקות ראייה וסדרות באנגלית קשה לי לראות רק אם יש משהו שמכיר את הסדרות ואחלה סדרות שאתם עושים",
  "date": "2026-10-01T16:12:48.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/tv.yes/posts/pfbid0cFPX2Xv9yBqekijfCahxSXH2yJHzAgbi8mCTahizagBPdkcw27PfmBNLF7WrZJqVl?comment_id=965509609276605"
 },
 {
  "id": "fb_1058269830371005",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "ישששששש\nאימה אמריקאית. התגעגעתי.",
  "date": "2026-10-01T20:57:30.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/tv.yes/posts/pfbid0cFPX2Xv9yBqekijfCahxSXH2yJHzAgbi8mCTahizagBPdkcw27PfmBNLF7WrZJqVl?comment_id=1058269830371005"
 },
 {
  "id": "fb_1606635677610459",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "Orel Lalazari",
  "date": "2026-10-01T10:03:28.000Z",
  "likes": 0,
  "replies": 1,
  "url": "https://www.facebook.com/tv.yes/posts/pfbid0cFPX2Xv9yBqekijfCahxSXH2yJHzAgbi8mCTahizagBPdkcw27PfmBNLF7WrZJqVl?comment_id=1606635677610459"
 },
 {
  "id": "fb_1284119617127435",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "הצטרפו אלינו לצוד את הדילים הכי שווים ✂️🛒\nצדים דילים מאלי אקספרס",
  "date": "2026-10-02T10:26:17.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/tv.yes/posts/pfbid0cFPX2Xv9yBqekijfCahxSXH2yJHzAgbi8mCTahizagBPdkcw27PfmBNLF7WrZJqVl?comment_id=1284119617127435"
 },
 {
  "id": "fb_930627013455164",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "איב אתה שורף בריאות",
  "date": "2026-09-25T00:03:26.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/reel/1095485259857881/?comment_id=930627013455164"
 },
 {
  "id": "fb_1589709646213989",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "אלופים",
  "date": "2026-09-24T16:37:43.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/reel/1095485259857881/?comment_id=1589709646213989"
 },
 {
  "id": "fb_2298764720964142",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "מעולה!!!!!",
  "date": "2026-10-02T05:11:25.000Z",
  "likes": 1,
  "replies": 0,
  "url": "https://www.facebook.com/reel/952556117374287/?comment_id=2298764720964142"
 },
 {
  "id": "fb_1109978161409966",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "Netflix מדוע אתם מפרסמים בישראל תוכן של Ms Rachel at Songs for Littles האנטישמית שכבר 3 שנים יוצאת נגד מדינת ישראל היא מלמדת אלימות !!!!  כלפי יהודים שנאה !!! \nתבטלו אותה מייד !",
  "date": "2026-10-01T21:25:22.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/reel/952556117374287/?comment_id=1109978161409966"
 },
 {
  "id": "fb_2613086762445890",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "מקסים...אהבתי את \" תימשול\".. תובנה לחיים",
  "date": "2026-10-04T11:03:40.000Z",
  "likes": 40,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=2613086762445890"
 },
 {
  "id": "fb_1410704124513941",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "It’s east of eden not of mice and men",
  "date": "2026-10-06T03:02:17.000Z",
  "likes": 1,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1410704124513941"
 },
 {
  "id": "fb_977705158709867",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "הרבה זמן לא ראיתי סדרה טובה כמו \"קדמת עדן\" מעולה",
  "date": "2026-10-04T18:58:18.000Z",
  "likes": 27,
  "replies": 1,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=977705158709867"
 },
 {
  "id": "fb_1083955737736445",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "מרתק. הדמות של לי - דמות משנית, מלא חכמה. והתזכורת לעברית מרגשת",
  "date": "2026-10-04T18:37:20.000Z",
  "likes": 29,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1083955737736445"
 },
 {
  "id": "fb_1423760796525015",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "נהדר. יוצא מהכלל. אי אפשר לזוז מהמסך. קראתי את הספר בילדותי. ראיתי את הסרט עם גיימס דין , ואת הסידרה עם פיי דנווי.. גם הפעם העיבוד נהדר..",
  "date": "2026-10-04T23:00:07.000Z",
  "likes": 12,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1423760796525015"
 },
 {
  "id": "fb_1131860502858592",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "נגע לליבי המילה תשלוט\nוכן הבאת סינים לעבודה בארהב בלי נשים....",
  "date": "2026-10-04T07:01:00.000Z",
  "likes": 11,
  "replies": 4,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1131860502858592"
 },
 {
  "id": "fb_2638295089952973",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "קראו את הספר. אחד הספרים הנפלאים קראתי.\nאגב, הספר מסתיים במילה: תמשל \nבדיוק כמו שאלוהים אומר לקין לפני שהוא רוצח את הבל ( ראה בראשית פרק ד׳)\nמקווה שהסדרה לא תאכזב אותי..",
  "date": "2026-10-04T18:26:26.000Z",
  "likes": 8,
  "replies": 4,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=2638295089952973"
 },
 {
  "id": "fb_1821357285874169",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "תחסכו לעצמכם 7 שעות ותוותרו . קודר אפלולי מדכא ועלילה לא ממש מעניינת . חיכיתי שמשהו יקרה עד הסוף ולא ממש קרה. לוותר. בתור סרט של שעה וחצי זה אולי החזיק אבל למרוח את העלילה הזאת על 7 שעות זה חסר פואנטה",
  "date": "2026-10-05T04:39:55.000Z",
  "likes": 20,
  "replies": 5,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1821357285874169"
 },
 {
  "id": "fb_1414407036834155",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "סידרה נפלאה שבניגוד לסרט עם ג׳יימס דין, פשוט מספרת מילה במילה את הספר. מדהים בעיני, ועשוי נפלא. \nמומלץ בחום!",
  "date": "2026-10-04T20:24:43.000Z",
  "likes": 7,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1414407036834155"
 },
 {
  "id": "fb_4520315941620977",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "ראיתי ברצף סדרה מהממת",
  "date": "2026-10-04T19:19:23.000Z",
  "likes": 7,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=4520315941620977"
 },
 {
  "id": "fb_2292229141553729",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "Name of serie ?",
  "date": "2026-10-04T11:06:27.000Z",
  "likes": 1,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid0FnAZ86Z5puJVmTUb4uztsZo2owD4d4f5UKHoxuTqktskuL6gewJTdsDKp64c4rb4l?comment_id=2292229141553729"
 },
 {
  "id": "fb_2246199695950678",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "סוף הסידרה כל כך הזוי ולא הגיוני שלא ממליצה לראות אותה",
  "date": "2026-10-04T15:43:23.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid0FnAZ86Z5puJVmTUb4uztsZo2owD4d4f5UKHoxuTqktskuL6gewJTdsDKp64c4rb4l?comment_id=2246199695950678"
 },
 {
  "id": "fb_1608032150779917",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "בזבוז זמן",
  "date": "2026-10-05T02:23:30.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid0FnAZ86Z5puJVmTUb4uztsZo2owD4d4f5UKHoxuTqktskuL6gewJTdsDKp64c4rb4l?comment_id=1608032150779917"
 },
 {
  "id": "fb_2532266733924817",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "סדרה כל כך איטית ומשעממת.\nבזבוז זמן מוחלט",
  "date": "2026-10-05T06:26:35.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid0FnAZ86Z5puJVmTUb4uztsZo2owD4d4f5UKHoxuTqktskuL6gewJTdsDKp64c4rb4l?comment_id=2532266733924817"
 },
 {
  "id": "fb_1840090844072583",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "הסוף מאכזב מאוד. חבל לבזבז זמן",
  "date": "2026-10-05T01:21:52.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid0FnAZ86Z5puJVmTUb4uztsZo2owD4d4f5UKHoxuTqktskuL6gewJTdsDKp64c4rb4l?comment_id=1840090844072583"
 },
 {
  "id": "fb_1615158577004137",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "וואי אהבתי ברמות! מתי עונה שנייה?",
  "date": "2026-10-04T13:41:26.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid0FnAZ86Z5puJVmTUb4uztsZo2owD4d4f5UKHoxuTqktskuL6gewJTdsDKp64c4rb4l?comment_id=1615158577004137"
 },
 {
  "id": "fb_1414555467532819",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "סדרה יפההה",
  "date": "2026-10-05T13:13:50.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid0FnAZ86Z5puJVmTUb4uztsZo2owD4d4f5UKHoxuTqktskuL6gewJTdsDKp64c4rb4l?comment_id=1414555467532819"
 },
 {
  "id": "fb_1834128191267936",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "What show is this",
  "date": "2026-10-04T17:34:24.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid0FnAZ86Z5puJVmTUb4uztsZo2owD4d4f5UKHoxuTqktskuL6gewJTdsDKp64c4rb4l?comment_id=1834128191267936"
 },
 {
  "id": "fb_2289857705135193",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "מה שם הסידרה",
  "date": "2026-10-05T12:19:39.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid0FnAZ86Z5puJVmTUb4uztsZo2owD4d4f5UKHoxuTqktskuL6gewJTdsDKp64c4rb4l?comment_id=2289857705135193"
 },
 {
  "id": "fb_1098267683136242",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "האם תיהיה עונה שנייה?",
  "date": "2026-10-04T09:36:04.000Z",
  "likes": 0,
  "replies": 1,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid0FnAZ86Z5puJVmTUb4uztsZo2owD4d4f5UKHoxuTqktskuL6gewJTdsDKp64c4rb4l?comment_id=1098267683136242"
 },
 {
  "id": "fb_989180054211137",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "תביאו גם את הסידרה vera  \nאת רציחות במידסומר\nאת eadtenders\nיש מלא סדרות אנגליות טובות...",
  "date": "2026-09-27T09:34:23.000Z",
  "likes": 11,
  "replies": 2,
  "url": "https://www.facebook.com/tv.yes/posts/pfbid02EGo9QjsDhNzfYESib4ayjBFCRParLC9af7aawfLrs2dREGhLHn1yRgdK3BpSvp56l?comment_id=989180054211137"
 },
 {
  "id": "fb_28829077726714580",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "זה נשמע לכם הגיוני שאנחנו משלמים ולא מעט והתחלתם לשים פרסומות???",
  "date": "2026-09-28T12:10:14.000Z",
  "likes": 6,
  "replies": 0,
  "url": "https://www.facebook.com/tv.yes/posts/pfbid02EGo9QjsDhNzfYESib4ayjBFCRParLC9af7aawfLrs2dREGhLHn1yRgdK3BpSvp56l?comment_id=28829077726714580"
 },
 {
  "id": "fb_1448778184013683",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "חחחחח מי מטןמטם לשלם ולקבל פרסומות 😉🤣🤣🤣🤣🤣",
  "date": "2026-09-28T08:14:37.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/tv.yes/posts/pfbid02EGo9QjsDhNzfYESib4ayjBFCRParLC9af7aawfLrs2dREGhLHn1yRgdK3BpSvp56l?comment_id=1448778184013683"
 },
 {
  "id": "fb_2547937402345578",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "דר בסט קצת טיפשייי",
  "date": "2026-09-27T13:56:34.000Z",
  "likes": 3,
  "replies": 1,
  "url": "https://www.facebook.com/tv.yes/posts/pfbid02EGo9QjsDhNzfYESib4ayjBFCRParLC9af7aawfLrs2dREGhLHn1yRgdK3BpSvp56l?comment_id=2547937402345578"
 },
 {
  "id": "fb_2128188974437453",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "מקווה מאוד שגם שגם סטינג טי וי",
  "date": "2026-09-27T16:45:19.000Z",
  "likes": 2,
  "replies": 0,
  "url": "https://www.facebook.com/tv.yes/posts/pfbid02EGo9QjsDhNzfYESib4ayjBFCRParLC9af7aawfLrs2dREGhLHn1yRgdK3BpSvp56l?comment_id=2128188974437453"
 },
 {
  "id": "fb_1024624460636856",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "אמרו שידור מתורגם של ה vma ואין שום תרגום",
  "date": "2026-09-28T19:14:30.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/tv.yes/posts/pfbid02EGo9QjsDhNzfYESib4ayjBFCRParLC9af7aawfLrs2dREGhLHn1yRgdK3BpSvp56l?comment_id=1024624460636856"
 },
 {
  "id": "fb_1415120466621004",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "תעיפו את הפרסומות חצופים!!",
  "date": "2026-09-28T20:01:23.000Z",
  "likes": 1,
  "replies": 0,
  "url": "https://www.facebook.com/tv.yes/posts/pfbid02EGo9QjsDhNzfYESib4ayjBFCRParLC9af7aawfLrs2dREGhLHn1yRgdK3BpSvp56l?comment_id=1415120466621004"
 },
 {
  "id": "fb_2398329767239939",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "תחזירו את  gilded age",
  "date": "2026-09-28T06:26:38.000Z",
  "likes": 1,
  "replies": 1,
  "url": "https://www.facebook.com/tv.yes/posts/pfbid02EGo9QjsDhNzfYESib4ayjBFCRParLC9af7aawfLrs2dREGhLHn1yRgdK3BpSvp56l?comment_id=2398329767239939"
 },
 {
  "id": "fb_2625167277904501",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "אולי תפסיקו עם פרסומות!!",
  "date": "2026-09-28T13:04:48.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/tv.yes/posts/pfbid02EGo9QjsDhNzfYESib4ayjBFCRParLC9af7aawfLrs2dREGhLHn1yRgdK3BpSvp56l?comment_id=2625167277904501"
 },
 {
  "id": "fb_1084183027581891",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "חג שמח",
  "date": "2026-09-28T09:24:21.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/tv.yes/posts/pfbid02EGo9QjsDhNzfYESib4ayjBFCRParLC9af7aawfLrs2dREGhLHn1yRgdK3BpSvp56l?comment_id=1084183027581891"
 },
 {
  "id": "fb_2590711308094194",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "מקסימה וכשרונית.. היא ואסף אבידן גאווה גדולה וקצת אור בימים החשוכים האלו... מבפנים ומבחוץ",
  "date": "2026-09-25T06:53:14.000Z",
  "likes": 8,
  "replies": 0,
  "url": "https://www.facebook.com/tv.yes/posts/pfbid0rg3hFwJUNVVpTsARMqHgRnnCK4B3TFQwmymyvTjEgAqGTyMPTf2Vj4FELuZQFad2l?comment_id=2590711308094194"
 },
 {
  "id": "fb_1130871382620863",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "פחות תכנים שהם אגו טריפ - יותר תכנים מעניינים באמת",
  "date": "2026-09-26T14:57:55.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/tv.yes/posts/pfbid0rg3hFwJUNVVpTsARMqHgRnnCK4B3TFQwmymyvTjEgAqGTyMPTf2Vj4FELuZQFad2l?comment_id=1130871382620863"
 },
 {
  "id": "fb_2280282222770034",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "מי ישמע אריתה פרנקלין או יהודיץ רביץ\n\n🤣🤣🤣😉😉\n\nדור זד ..שכונה פופ באנגלית",
  "date": "2026-09-24T12:14:18.000Z",
  "likes": 4,
  "replies": 1,
  "url": "https://www.facebook.com/tv.yes/posts/pfbid0rg3hFwJUNVVpTsARMqHgRnnCK4B3TFQwmymyvTjEgAqGTyMPTf2Vj4FELuZQFad2l?comment_id=2280282222770034"
 },
 {
  "id": "fb_1112876964548250",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "מענינת...",
  "date": "2026-09-24T15:18:04.000Z",
  "likes": 3,
  "replies": 0,
  "url": "https://www.facebook.com/tv.yes/posts/pfbid0rg3hFwJUNVVpTsARMqHgRnnCK4B3TFQwmymyvTjEgAqGTyMPTf2Vj4FELuZQFad2l?comment_id=1112876964548250"
 },
 {
  "id": "fb_850601314742980",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "Sharona Gabriel",
  "date": "2026-09-24T12:32:35.000Z",
  "likes": 1,
  "replies": 0,
  "url": "https://www.facebook.com/tv.yes/posts/pfbid0rg3hFwJUNVVpTsARMqHgRnnCK4B3TFQwmymyvTjEgAqGTyMPTf2Vj4FELuZQFad2l?comment_id=850601314742980"
 },
 {
  "id": "fb_28709074312038268",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "מקווה שךא תהיה פרסוסת לפני הצפייה😡",
  "date": "2026-09-24T09:08:18.000Z",
  "likes": 4,
  "replies": 1,
  "url": "https://www.facebook.com/tv.yes/posts/pfbid0rg3hFwJUNVVpTsARMqHgRnnCK4B3TFQwmymyvTjEgAqGTyMPTf2Vj4FELuZQFad2l?comment_id=28709074312038268"
 },
 {
  "id": "fb_2139578406963967",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "הכייף של הסרט - הזוגיות שלה עם אורי - \"11 שנים של אושר צרוף\". דברים אחרים היו פחות מרתקים או נעימים. קשה לתפוס מי היא באמת, יש משהו מסתורי באישיות שלה (למרות שהיא אישה יפה, חטובה, אנרגטית).  עצוב שהסיפור הייחודי שלה הוא ההתרחשויות הקשות בישראל, מה שעושה אותה לפנים העכשוויים של ישראל, אולי שלא ברצונה. \"אנחנו עוד נשמע עליה\"",
  "date": "2026-09-25T05:09:33.000Z",
  "likes": 1,
  "replies": 0,
  "url": "https://www.facebook.com/tv.yes/posts/pfbid0rg3hFwJUNVVpTsARMqHgRnnCK4B3TFQwmymyvTjEgAqGTyMPTf2Vj4FELuZQFad2l?comment_id=2139578406963967"
 },
 {
  "id": "fb_940053995416217",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "לאחרונה רוב התכנים שלכם רדודים",
  "date": "2026-10-05T13:02:02.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid0FnAZ86Z5puJVmTUb4uztsZo2owD4d4f5UKHoxuTqktskuL6gewJTdsDKp64c4rb4l?comment_id=940053995416217"
 },
 {
  "id": "fb_4642902449274486",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "סדרה מעולה",
  "date": "2026-10-04T11:01:26.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid0FnAZ86Z5puJVmTUb4uztsZo2owD4d4f5UKHoxuTqktskuL6gewJTdsDKp64c4rb4l?comment_id=4642902449274486"
 },
 {
  "id": "fb_1656137902621909",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "לא בדיוק זרה, נטפליקס",
  "date": "2026-10-04T15:09:26.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid0FnAZ86Z5puJVmTUb4uztsZo2owD4d4f5UKHoxuTqktskuL6gewJTdsDKp64c4rb4l?comment_id=1656137902621909"
 },
 {
  "id": "fb_1512387384030194",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "מה השם שלה",
  "date": "2026-10-04T11:32:15.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid0FnAZ86Z5puJVmTUb4uztsZo2owD4d4f5UKHoxuTqktskuL6gewJTdsDKp64c4rb4l?comment_id=1512387384030194"
 },
 {
  "id": "fb_2346704799493130",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "איקס על האקס",
  "date": "2026-10-05T13:14:28.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid0FnAZ86Z5puJVmTUb4uztsZo2owD4d4f5UKHoxuTqktskuL6gewJTdsDKp64c4rb4l?comment_id=2346704799493130"
 },
 {
  "id": "fb_1544967267433987",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "בזבוז זמן",
  "date": "2026-10-05T09:09:50.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid0FnAZ86Z5puJVmTUb4uztsZo2owD4d4f5UKHoxuTqktskuL6gewJTdsDKp64c4rb4l?comment_id=1544967267433987"
 },
 {
  "id": "fb_2315373769213659",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "שיקגו פייר עונה 15?",
  "date": "2026-09-28T05:18:11.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/tv.yes/posts/pfbid02EGo9QjsDhNzfYESib4ayjBFCRParLC9af7aawfLrs2dREGhLHn1yRgdK3BpSvp56l?comment_id=2315373769213659"
 },
 {
  "id": "fb_28678891705083506",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "מה עם  הסדרה המופלאה All Creatures Great and Small (2020 TV series)",
  "date": "2026-09-27T16:09:51.000Z",
  "likes": 1,
  "replies": 0,
  "url": "https://www.facebook.com/tv.yes/posts/pfbid02EGo9QjsDhNzfYESib4ayjBFCRParLC9af7aawfLrs2dREGhLHn1yRgdK3BpSvp56l?comment_id=28678891705083506"
 },
 {
  "id": "fb_1097116116149738",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "תודה יס על הסדרות סרטים חג שמח",
  "date": "2026-09-28T12:10:50.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/tv.yes/posts/pfbid02EGo9QjsDhNzfYESib4ayjBFCRParLC9af7aawfLrs2dREGhLHn1yRgdK3BpSvp56l?comment_id=1097116116149738"
 },
 {
  "id": "fb_922000373995180",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "שכחתם לציין סדרות חדשות ופרסומות גם כן",
  "date": "2026-09-27T14:24:21.000Z",
  "likes": 1,
  "replies": 0,
  "url": "https://www.facebook.com/tv.yes/posts/pfbid02EGo9QjsDhNzfYESib4ayjBFCRParLC9af7aawfLrs2dREGhLHn1yRgdK3BpSvp56l?comment_id=922000373995180"
 },
 {
  "id": "fb_1768363110879272",
  "brand": "yes",
  "author": "משתמש/ת בפייסבוק",
  "text": "מה מס' הערוץ? ומה מס' ערוץ הדרמות החדש",
  "date": "2026-09-27T13:43:08.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/tv.yes/posts/pfbid02EGo9QjsDhNzfYESib4ayjBFCRParLC9af7aawfLrs2dREGhLHn1yRgdK3BpSvp56l?comment_id=1768363110879272"
 },
 {
  "id": "fb_2268936787233193",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "סדרה מטורפת!! צפיתי בלי לנשום",
  "date": "2026-10-04T19:11:29.000Z",
  "likes": 6,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=2268936787233193"
 },
 {
  "id": "fb_1477072744350969",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "סדרה מעולה כן ירבו.",
  "date": "2026-10-05T13:33:33.000Z",
  "likes": 3,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1477072744350969"
 },
 {
  "id": "fb_1620919879502021",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "מרתק מומלץ",
  "date": "2026-10-05T17:06:34.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1620919879502021"
 },
 {
  "id": "fb_4749323691968470",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "סדרה מטורפתתת",
  "date": "2026-10-04T18:28:34.000Z",
  "likes": 5,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=4749323691968470"
 },
 {
  "id": "fb_1143663678212047",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "פשוט מעולה.",
  "date": "2026-10-06T16:17:20.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1143663678212047"
 },
 {
  "id": "fb_1104911895622083",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "מעולה",
  "date": "2026-10-06T16:18:26.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1104911895622083"
 },
 {
  "id": "fb_1115312560955591",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "סיימתי בכמה שעות סידרה מעולה",
  "date": "2026-10-05T10:06:28.000Z",
  "likes": 3,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1115312560955591"
 },
 {
  "id": "fb_1091008120341132",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "סידרה נהדרת סוחפת ומרתקת",
  "date": "2026-10-05T23:39:11.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1091008120341132"
 },
 {
  "id": "fb_1403616531757334",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "מאוד מומלץ",
  "date": "2026-10-06T06:21:26.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1403616531757334"
 },
 {
  "id": "fb_1524311746170490",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "מושלם אהבתי",
  "date": "2026-10-06T13:54:06.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1524311746170490"
 },
 {
  "id": "fb_1431248055771634",
  "brand": "Cellcom TV",
  "author": "משתמש/ת בפייסבוק",
  "text": "מתנהגים כמו גנבים, להתרחק כמו מאש! חייבים לי מאות שקלים, לא עונים להודעות, מתקשרים ומנתקים תוך שניה ואי אפשר לחזור אליהם. לברוח!!",
  "date": "2026-10-06T13:04:40.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/cellcom.official/posts/pfbid02knsduacNiEX7sNHhyPNPBpW8ac9KTkMBAuDUc52rUamU91AFFMWqWRv62rKsLbkcl?comment_id=1431248055771634"
 },
 {
  "id": "fb_1400722815468815",
  "brand": "Cellcom TV",
  "author": "משתמש/ת בפייסבוק",
  "text": "מתנהגים כמו גנבים, להתרחק כמו מאש! חייבים לי מאות שקלים, לא עונים להודעות, מתקשרים ומנתקים תוך שניה ואי אפשר לחזור אליהם. לברוח!!",
  "date": "2026-10-06T13:05:18.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/cellcom.official/posts/pfbid0Sf59auf71qsFsr1zLoNFm6XLvibeyoYsojsE88qFkrEguEwYZ9m1RpJHbAHEZ8Fsl?comment_id=1400722815468815"
 },
 {
  "id": "fb_2520266211827416",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "Super série",
  "date": "2026-10-04T09:32:58.000Z",
  "likes": 1,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=2520266211827416"
 },
 {
  "id": "fb_1654231483003295",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "ואוו שווה כל רגע ממולץ",
  "date": "2026-10-05T05:19:27.000Z",
  "likes": 3,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1654231483003295"
 },
 {
  "id": "fb_29651551681095959",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "לדעתי ,סידרה אכזרית וקשה לצפיה.",
  "date": "2026-10-06T07:48:12.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=29651551681095959"
 },
 {
  "id": "fb_1413328127571981",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "סדרה שווה ביותר",
  "date": "2026-10-06T18:38:47.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1413328127571981"
 },
 {
  "id": "fb_2340641263436317",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "הסרט שגילה לעולם את ג'ימס דין",
  "date": "2026-10-04T15:15:52.000Z",
  "likes": 3,
  "replies": 1,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=2340641263436317"
 },
 {
  "id": "fb_1092428386822935",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "לא עפתי על הסדרה",
  "date": "2026-10-04T18:36:34.000Z",
  "likes": 3,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1092428386822935"
 },
 {
  "id": "fb_2016335192371809",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "סדרה איכותית נהנתי ממש",
  "date": "2026-10-05T05:55:54.000Z",
  "likes": 3,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=2016335192371809"
 },
 {
  "id": "fb_1123578383537174",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "סדרה מעולה רק חבל שפלורנס שונאת ישראל",
  "date": "2026-10-04T13:31:37.000Z",
  "likes": 3,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1123578383537174"
 },
 {
  "id": "fb_2300896544025590",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "סדרה מטורפת ! ממולץ",
  "date": "2026-10-04T17:50:50.000Z",
  "likes": 3,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=2300896544025590"
 },
 {
  "id": "fb_1615239596978787",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "הספר מעולה.\nהסדרה הספציפית הזו בינונית מינוס לטעמי. \nמשחק פחות מבינוני של אדם ואהרון. היחידה שאפשר לומר ששיחקה מעולה ומשכנע הייתה קייטי.",
  "date": "2026-10-04T18:22:28.000Z",
  "likes": 2,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1615239596978787"
 },
 {
  "id": "fb_1327990422612008",
  "brand": "Cellcom TV",
  "author": "משתמש/ת בפייסבוק",
  "text": "מתנהגים כמו גנבים, להתרחק כמו מאש! חייבים לי מאות שקלים, לא עונים להודעות, מתקשרים ומנתקים תוך שניה ואי אפשר לחזור אליהם. לברוח!",
  "date": "2026-10-06T13:05:34.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/cellcom.official/posts/pfbid02uCVn8VW5t6fne68LiMPJL6SGqdfB4RGfDSExp1AFPVW9YPUN7AXw96sR2MmMQrmdl?comment_id=1327990422612008"
 },
 {
  "id": "fb_1132940922411664",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "מה השם באנגלית(לא גרה בארץ)בבקשה.",
  "date": "2026-10-05T11:58:39.000Z",
  "likes": 1,
  "replies": 1,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1132940922411664"
 },
 {
  "id": "fb_1673147160836127",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "יופי של סידרה.",
  "date": "2026-10-05T06:34:01.000Z",
  "likes": 1,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1673147160836127"
 },
 {
  "id": "fb_1067169459412461",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "תקראו את הספר.",
  "date": "2026-10-04T09:22:17.000Z",
  "likes": 2,
  "replies": 1,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1067169459412461"
 },
 {
  "id": "fb_1102965902241561",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "סדרה מצויינת. עשיתי בינג' בסופש 😀",
  "date": "2026-10-04T19:35:32.000Z",
  "likes": 2,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1102965902241561"
 },
 {
  "id": "fb_1573703664796160",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "אני בפרק השלישי.. מרתק",
  "date": "2026-10-04T15:02:32.000Z",
  "likes": 2,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1573703664796160"
 },
 {
  "id": "fb_2253366175450629",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "מאוד אהבתי,למרות שהיו המון קטעים קשים לצפייה,מומלץ🤗",
  "date": "2026-10-04T14:58:54.000Z",
  "likes": 2,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=2253366175450629"
 },
 {
  "id": "fb_2078795662750264",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "קצת כבד אבל מצויין .",
  "date": "2026-10-04T21:57:47.000Z",
  "likes": 2,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=2078795662750264"
 },
 {
  "id": "fb_1130046332929739",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "אהבתי  ממש! בעיקר אהבתי את המסר ב\"תמשול\" בהחלט חשוב לחיים",
  "date": "2026-10-05T17:50:22.000Z",
  "likes": 1,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1130046332929739"
 },
 {
  "id": "fb_1116481751334056",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "מעולהההה",
  "date": "2026-10-04T17:26:40.000Z",
  "likes": 1,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1116481751334056"
 },
 {
  "id": "fb_1777395306844679",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "סידרה מעולה",
  "date": "2026-10-05T14:03:34.000Z",
  "likes": 1,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1777395306844679"
 },
 {
  "id": "fb_1063140709829719",
  "brand": "HOT",
  "author": "משתמש/ת בפייסבוק",
  "text": "חברה כושלת,תעברו ליס!!!!!!!במיידי",
  "date": "2026-09-14T22:18:45.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/hot.net.il/posts/pfbid02chAJTuVho4eMwYoFy3cNDpgaTnZbTzJXjKS5dB6m4LvRt2jvctCegQAvJNxsK6KJl?comment_id=1063140709829719"
 },
 {
  "id": "fb_1505151638307541",
  "brand": "HOT",
  "author": "משתמש/ת בפייסבוק",
  "text": "0 שירות \nלקוחה מעל 20 שנה \nהשאירו אותי ללא אינטרנט וטלוויזיה בחג, למרות שהתקלה התחילה מיום חמישי ב 17. ביזיון.",
  "date": "2026-09-12T15:50:54.000Z",
  "likes": 0,
  "replies": 0,
  "url": "https://www.facebook.com/hot.net.il/posts/pfbid02chAJTuVho4eMwYoFy3cNDpgaTnZbTzJXjKS5dB6m4LvRt2jvctCegQAvJNxsK6KJl?comment_id=1505151638307541"
 },
 {
  "id": "fb_2530894294064632",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "אחת הסדרות הכי טובות שראיתי",
  "date": "2026-10-04T20:28:29.000Z",
  "likes": 1,
  "replies": 1,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=2530894294064632"
 },
 {
  "id": "fb_2192924807954755",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "סדרה מטורפת ממליצה",
  "date": "2026-10-04T15:37:54.000Z",
  "likes": 2,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=2192924807954755"
 },
 {
  "id": "fb_1811646034295082",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "קשה לצפייה",
  "date": "2026-10-05T05:16:46.000Z",
  "likes": 1,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1811646034295082"
 },
 {
  "id": "fb_2191087818495003",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "אחרי שנים רבות של קריאת הספר\nוצפייה בגרסה הקולנועית עם ג'יימס דין, צפיתי בסדרה והיא מעולה",
  "date": "2026-10-04T18:32:35.000Z",
  "likes": 2,
  "replies": 1,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=2191087818495003"
 },
 {
  "id": "fb_1656541172792562",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "ראיתי סדרות טובות  יותר בנטפליקס... בחלק מהפרקים איבדתי עניין לפרקים.",
  "date": "2026-10-04T16:26:39.000Z",
  "likes": 3,
  "replies": 1,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1656541172792562"
 },
 {
  "id": "fb_1158752357019538",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "מדהים",
  "date": "2026-10-05T04:34:51.000Z",
  "likes": 1,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1158752357019538"
 },
 {
  "id": "fb_1820977252655227",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "סידרה מטורפת 🔥",
  "date": "2026-10-05T14:10:38.000Z",
  "likes": 1,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1820977252655227"
 },
 {
  "id": "fb_1404055647960234",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "הסינים הובאו להניח מסילות ברזל לרשת הרכבות שנבנתה . כח עבודה זול",
  "date": "2026-10-04T14:51:40.000Z",
  "likes": 1,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1404055647960234"
 },
 {
  "id": "fb_1658682005929205",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "ממה כולם מתלהבים? סדרה משעממת מאודדד",
  "date": "2026-10-04T19:44:24.000Z",
  "likes": 3,
  "replies": 2,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1658682005929205"
 },
 {
  "id": "fb_1009859028790723",
  "brand": "Netflix",
  "author": "משתמש/ת בפייסבוק",
  "text": "סדרה מצויינת",
  "date": "2026-10-05T02:22:29.000Z",
  "likes": 1,
  "replies": 0,
  "url": "https://www.facebook.com/netflixisrael/posts/pfbid02BY1Ep4Uur6PvM18duqUFdGSL956UM9nE9Z627utHGotYFrsFGPVYw1oDmXi4MG58l?comment_id=1009859028790723"
 }
]
