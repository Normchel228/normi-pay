// Инициализация Telegram Web App
let tg = Telegram.WebApp;

// Инициализируем приложение
tg.ready();
tg.expand(); // Раскрываем на весь экран

// Функция для открытия разных разделов
function openSection(section) {
    switch(section) {
        case 'products':
            showAlert('🛍️ Открываем раздел "Товары"');
            // Здесь будет переход к каталогу товаров
            break;
        case 'communication':
            showAlert('💻 Открываем раздел "Коммуникации"');
            // Здесь будет переход к чатам/сообществу
            break;
        case 'support':
            showAlert('❓ Открываем раздел "Поддержка"');
            // Здесь будет переход в поддержку
            break;
    }
}

// Функция для показа уведомлений (временная)
function showAlert(message) {
    if (tg.showAlert) {
        tg.showAlert(message);
    } else {
        alert(message);
    }
}

// Получаем информацию о пользователе
let user = tg.initDataUnsafe.user;
if (user) {
    // Можно персонализировать приветствие
    let greetingElement = document.querySelector('.header h1');
    if (greetingElement) {
        greetingElement.textContent = `Привет, ${user.first_name}! 👋`;
    }
}

// Меняем цветовую схему под тему Telegram
function updateTheme() {
    document.documentElement.style.setProperty('--bg-color', tg.themeParams.bg_color || '#667eea');
    document.documentElement.style.setProperty('--text-color', tg.themeParams.text_color || '#000000');
}

// Слушаем изменения темы
tg.onEvent('themeChanged', updateTheme);
updateTheme();