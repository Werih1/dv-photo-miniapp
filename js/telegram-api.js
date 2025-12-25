// ============================================
// dv-photo-miniapp/js/telegram-api.js
// ИНТЕГРАЦИЯ TELEGRAM WEB APP API
// ============================================

class TelegramAPI {
  constructor() {
    this.webApp = window.Telegram?.WebApp;
    this.user = null;
    this.backendURL = 'https://dv-lottery-api-ob49.onrender.com'; // Изменить на реальный URL при деплое
    
    if (this.webApp) {
      this.webApp.ready();
      this.user = this.webApp.initDataUnsafe?.user;
      console.log('✅ Telegram Web App initialized');
      console.log('📱 User:', this.user);
    } else {
      console.warn('⚠️ Telegram Web App not available');
    }
  }

  // Получить ID текущего пользователя
  getUserId() {
    return this.user?.id || null;
  }

  // Получить язык пользователя
  getLanguage() {
    return this.user?.language_code === 'ru' ? 'ru' : 'en';
  }

  // Отправить данные обратно в бот
  sendDataToBot(data) {
    if (this.webApp) {
      console.log('📤 Sending to bot:', data);
      this.webApp.sendData(JSON.stringify(data));
    } else {
      console.error('❌ Web App not available');
    }
  }

  // Показать popup с сообщением
  showPopup(params) {
    if (this.webApp) {
      this.webApp.showPopup(params);
    }
  }

  // Закрыть Web App
  close() {
    if (this.webApp) {
      this.webApp.close();
    }
  }

  // Показать loading
  showLoadingScreen(show = true) {
    if (this.webApp) {
      if (show) {
        this.webApp.showLoadingScreen();
      } else {
        this.webApp.hideLoadingScreen();
      }
    }
  }

  // Установить цвет заднего плана
  setBackgroundColor(color) {
    if (this.webApp) {
      this.webApp.setBackgroundColor(color);
    }
  }

  // Установить цвет header
  setHeaderColor(color) {
    if (this.webApp) {
      this.webApp.setHeaderColor(color);
    }
  }

  // Вибрация (haptic feedback)
  hapticFeedback(type = 'light') {
    if (this.webApp) {
      this.webApp.HapticFeedback?.impactOccurred(type);
    }
  }
}

// Создаем глобальный объект
const telegramAPI = new TelegramAPI();

// Экспорт для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
  module.exports = telegramAPI;
}
