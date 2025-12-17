// 🔔 ЭТО ШАБЛОН! СКОПИРУЙ КАК config.js И ЗАПОЛНИ СВОИ ЗНАЧЕНИЯ

module.exports = {
  // Telegram Bot Token
  BOT_TOKEN: process.env.BOT_TOKEN || "YOUR_BOT_TOKEN_HERE",
  
  // Admin IDs (твои ID в Telegram, разделены запятой)
  ADMIN_IDS: (process.env.ADMIN_IDS || "").split(",").map(Number),
  
  // Промокоды и их значения
  PROMO_CODES: {
    "PROMO_1": 5,          // +5 попыток
    "PROMO_2": 2,         // +2 попытки
  },
  
  // Telegram Payment Token для Stars
  TELEGRAM_PAYMENT_TOKEN: process.env.TELEGRAM_PAYMENT_TOKEN || "",
  
  // URL твоего приложения
  APP_URL: process.env.APP_URL || "http://localhost:3000"
};

