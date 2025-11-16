// Основной файл приложения
let tg = Telegram.WebApp;
let currentUser = null;

// Инициализация приложения
tg.ready();
tg.expand();

// Получаем информацию о пользователе
if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    currentUser = tg.initDataUnsafe.user;
    updateGreeting();
}

// Функция для обновления приветствия
function updateGreeting() {
    if (currentUser) {
        const greetingElement = document.getElementById('greeting');
        if (greetingElement) {
            greetingElement.textContent = `Привет, ${currentUser.first_name}! 👋`;
        }
    }
}

// Функции для навигации
function openSection(section) {
    switch(section) {
        case 'products':
            window.location.href = 'products.html';
            break;
        case 'communication':
            window.location.href = 'communication.html';
            break;
        case 'support':
            window.location.href = 'support.html';
            break;
    }
}

function openAdminChat() {
    tg.showAlert('💬 Чат с админом будет доступен после оформления заказа');
}

function showAdminChatButton() {
    const adminChatItem = document.getElementById('adminChatItem');
    if (adminChatItem) {
        adminChatItem.classList.remove('hidden');
    }
}

// Система админов
const ADMIN_CODES = {
    'Normiadmin': { rank: 'normilist', name: 'Нормилист' },
    'Admin50': { rank: 'senior', name: 'Старший админ' },
    'Admin4': { rank: 'junior', name: 'Младший админ' }
};

function checkAdminAccess(code) {
    return ADMIN_CODES[code] || null;
}

// Сохраняем данные в localStorage
function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Утилиты для работы с Telegram
function showNotification(message) {
    if (tg.showAlert) {
        tg.showAlert(message);
    } else {
        alert(message);
    }
}

// Обновляем тему Telegram
function updateTheme() {
    const themeParams = tg.themeParams;
    if (themeParams.bg_color) {
        document.body.style.setProperty('--bg-color', `#${themeParams.bg_color}`);
    }
}

tg.onEvent('themeChanged', updateTheme);
updateTheme();