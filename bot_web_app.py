"""
Telegram Bot для открытия Web App
Минимальный код - просто открывает приложение с GitHub Pages
"""

import os
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, ContextTypes

# Токен бота
BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN', 'YOUR_BOT_TOKEN_HERE')

# URL вашего Web App на GitHub Pages
# Пример: https://your-username.github.io/green-card-bot/
WEB_APP_URL = os.getenv('WEB_APP_URL', 'https://YOUR_USERNAME.github.io/green-card-bot/index.html')

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Команда /start"""
    
    # Кнопка для открытия Web App
    keyboard = [
        [InlineKeyboardButton("📸 Открыть валидатор", web_app={"url": WEB_APP_URL})],
        [InlineKeyboardButton("ℹ️ Требования", callback_data='requirements')],
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(
        "👋 Добро пожаловать!\n\n"
        "Нажмите кнопку ниже, чтобы открыть валидатор фото для Green Card\n\n"
        "✨ Проверяет по 11 критериям как ASTAR Photo Validator",
        reply_markup=reply_markup
    )

async def requirements(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Требования"""
    query = update.callback_query
    await query.answer()
    await query.edit_message_text(
        "📋 **ТРЕБОВАНИЯ DV LOTTERY:**\n\n"
        "✓ Размер: 600×750 пикселей\n"
        "✓ Голова: 50-69% от фото\n"
        "✓ Лицо: прямо, в центре\n"
        "✓ Глаза: открыты, видны\n"
        "✓ Фон: белый/светлый\n"
        "✓ Выражение: нейтральное\n"
        "✓ Резкость: высокая\n\n"
        "Нажмите 📸 выше, чтобы проверить фото!",
        parse_mode='Markdown'
    )

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Справка"""
    await update.message.reply_text(
        "📖 **СПРАВКА:**\n\n"
        "/start - главное меню\n"
        "/help - эта справка\n\n"
        "Используйте кнопку 📸 для проверки фото!"
    )

def main():
    """Запуск бота"""
    
    if BOT_TOKEN == 'YOUR_BOT_TOKEN_HERE':
        print("❌ Установите TELEGRAM_BOT_TOKEN!")
        return
    
    print("🚀 Запуск бота...")
    
    # Создаём приложение
    application = Application.builder().token(BOT_TOKEN).build()
    
    # Команды
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    
    # Запускаем
    application.run_polling()

if __name__ == '__main__':
    main()
