// Тестируем импорт apiService
import { apiService } from './src/services/api.jsx';

console.log('🧪 Тестирование импорта apiService...');
console.log('apiService:', typeof apiService);
console.log('getProfiles:', typeof apiService.getProfiles);

if (typeof apiService.getProfiles === 'function') {
    console.log('✅ Метод getProfiles существует и является функцией');
    
    // Тестируем вызов
    console.log('🔄 Тестируем вызов getProfiles...');
    apiService.getProfiles().then(result => {
        console.log('📊 Результат getProfiles:', Array.isArray(result) ? `массив из ${result.length} элементов` : 'не массив');
    }).catch(error => {
        console.error('❌ Ошибка при вызове getProfiles:', error);
    });
} else {
    console.error('❌ getProfiles не является функцией:', apiService.getProfiles);
}
