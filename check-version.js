// Откройте эту ссылку в браузере чтобы проверить версию
const versionCheck = () => {
    console.log('🔍 Проверка версии фронтенда...');
    
    // Проверяем наличие метода getProfiles
    if (typeof window.apiService !== 'undefined') {
        console.log('✅ apiService доступен глобально');
        if (window.apiService.getProfiles) {
            console.log('✅ Метод getProfiles() существует');
        } else {
            console.log('❌ Метод getProfiles() НЕ существует');
        }
    } else {
        console.log('⚠️  apiService не доступен глобально');
    }
    
    // Проверяем дату сборки
    const scripts = document.getElementsByTagName('script');
    for (let script of scripts) {
        if (script.src && script.src.includes('UserDashboard')) {
            console.log('📅 UserDashboard загружен из:', script.src);
            console.log('   Последнее изменение:', script.getAttribute('data-timestamp') || 'неизвестно');
        }
    }
    
    // Проверяем console.log из API
    console.log('📊 Ищите в консоли:');
    console.log('   - "🌐 Запрос к бэкенду:"');
    console.log('   - "✅ Ответ от бэкенда (/api/profiles/all):"');
    console.log('   - "📊 Реальные данные из БД:"');
};

// Добавляем глобально для тестирования
window.checkVersion = versionCheck;

console.log('🔄 Для проверки версии выполните: checkVersion()');
