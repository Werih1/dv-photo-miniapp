// ============================================
// dv-photo-miniapp/js/payments.js
// ЛОГИКА ПЛАТЕЖЕЙ И СИНХРОНИЗАЦИЯ С BACKEND
// ============================================

class PaymentsHandler {
  constructor(telegramAPI) {
    this.telegram = telegramAPI;
    this.backendURL = 'https://dv-lottery-api-ob49.onrender.com'; // Изменить на реальный URL
    this.userId = telegramAPI.getUserId();
    this.language = telegramAPI.getLanguage();
    
    this.translations = {
      ru: {
        buy: 'Купить',
        processing: 'Обработка...',
        lite_name: 'ЛАЙТ',
        max_name: 'МАКС',
        ultra_name: 'УЛЬТРА',
        lite_desc: '10 проверок за 1 ⭐',
        max_desc: 'Безлимит на 48ч за 1 ⭐',
        ultra_desc: 'Безлимит на 6 мес за 1 ⭐',
        loading_tariff: 'Загрузка тарифа...',
        no_subscription: 'У вас нет активной подписки',
        active_subscription: 'Активная подписка:',
        checks_left: 'Проверок осталось:',
        unlimited: 'Безлимит',
        expires: 'Истекает:',
        purchased: 'Куплено:',
        error: 'Ошибка',
        success: 'Успешно!',
        payment_initiated: 'Платеж инициирован. Диалог платежа откроется в чате бота.',
      },
      en: {
        buy: 'Buy',
        processing: 'Processing...',
        lite_name: 'LITE',
        max_name: 'MAX',
        ultra_name: 'ULTRA',
        lite_desc: '10 checks for 1 ⭐',
        max_desc: 'Unlimited for 48h for 1 ⭐',
        ultra_desc: 'Unlimited for 6 months for 1 ⭐',
        loading_tariff: 'Loading tariff...',
        no_subscription: 'You have no active subscription',
        active_subscription: 'Active subscription:',
        checks_left: 'Checks left:',
        unlimited: 'Unlimited',
        expires: 'Expires:',
        purchased: 'Purchased:',
        error: 'Error',
        success: 'Success!',
        payment_initiated: 'Payment initiated. Payment dialog will open in bot chat.',
      },
    };

    this.t = this.translations[this.language];
  }

  // Инициировать платеж (нажатие кнопки "Купить")
  async initiatePurchase(tariff) {
    console.log(`🛍️ Initiating purchase: ${tariff}`);
    
    // Отправляем событие в бот
    this.telegram.sendDataToBot({
      action: 'buy_tariff',
      tariff: tariff,
      user_id: this.userId,
      timestamp: new Date().toISOString(),
    });

    // Показываем пользователю уведомление
    this.telegram.showPopup({
      title: this.t.payment_initiated,
      message: this.language === 'ru' 
        ? `Переходим в чат бота для платежа...`
        : `Opening bot chat for payment...`,
      buttons: [
        { id: 'ok', type: 'default', text: 'OK' }
      ]
    });

    // Вибрация
    this.telegram.hapticFeedback('success');
  }

  // Получить информацию о текущей подписке
  async getActiveSubscription() {
    try {
      this.telegram.showLoadingScreen(true);
      
      const response = await fetch(
        `${this.backendURL}/api/payments/subscription/${this.userId}`
      );
      
      const data = await response.json();
      
      this.telegram.showLoadingScreen(false);

      if (data.ok && data.data) {
        return data.data;
      }
      return null;
    } catch (error) {
      console.error('❌ Error fetching subscription:', error);
      this.telegram.showLoadingScreen(false);
      return null;
    }
  }

  // Получить доступные тарифы
  async getTariffs() {
    try {
      const response = await fetch(`${this.backendURL}/api/payments/tariffs`);
      const data = await response.json();
      
      if (data.ok) {
        return data.data;
      }
      return [];
    } catch (error) {
      console.error('❌ Error fetching tariffs:', error);
      return [];
    }
  }

  // Получить историю платежей
  async getPaymentHistory() {
    try {
      const response = await fetch(
        `${this.backendURL}/api/payments/history/${this.userId}`
      );
      const data = await response.json();
      
      if (data.ok) {
        return data.data;
      }
      return [];
    } catch (error) {
      console.error('❌ Error fetching payment history:', error);
      return [];
    }
  }

  // Обновить UI с информацией о подписке
  async updateSubscriptionUI() {
    const subscription = await this.getActiveSubscription();
    
    // Обновляем элементы на странице (если они есть)
    const statusElement = document.getElementById('subscription-status');
    const checksElement = document.getElementById('checks-remaining');
    const expiryElement = document.getElementById('expiry-date');

    if (subscription) {
      if (statusElement) {
        statusElement.innerHTML = `
          <div class="subscription-info">
            <h3>${this.t.active_subscription}</h3>
            <p><strong>${subscription.tariff}</strong></p>
            <p>${this.t.checks_left}: <strong>${
              subscription.checks_remaining === 999 || subscription.checks_remaining === 9999
                ? this.t.unlimited
                : subscription.checks_remaining
            }</strong></p>
            ${subscription.expires_at ? `
              <p>${this.t.expires}: ${new Date(subscription.expires_at).toLocaleString(this.language === 'ru' ? 'ru-RU' : 'en-US')}</p>
            ` : ''}
          </div>
        `;
      }
    } else {
      if (statusElement) {
        statusElement.innerHTML = `<p>${this.t.no_subscription}</p>`;
      }
    }
  }

  // Привязать обработчики к кнопкам (для HTML элементов)
  attachEventListeners() {
    // Кнопки покупки тарифов
    const buyButtons = document.querySelectorAll('[data-tariff]');
    
    buyButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const tariff = button.getAttribute('data-tariff');
        this.initiatePurchase(tariff);
      });
    });

    // Кнопка обновления подписки
    const refreshButton = document.getElementById('refresh-subscription');
    if (refreshButton) {
      refreshButton.addEventListener('click', () => {
        this.updateSubscriptionUI();
      });
    }
  }

  // Форматирование даты
  formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString(
      this.language === 'ru' ? 'ru-RU' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    );
  }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', async () => {
  const payments = new PaymentsHandler(telegramAPI);
  
  // Привязываем обработчики
  payments.attachEventListeners();
  
  // Загружаем информацию о подписке
  await payments.updateSubscriptionUI();
  
  // Делаем объект доступным глобально
  window.payments = payments;
  
  console.log('✅ Payments handler initialized');
});

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PaymentsHandler;
}
