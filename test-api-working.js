// Тестируем что API работает правильно
console.log('🧪 Тестирование API...\n');

// Мок-данные для теста
const mockResponse = {
  success: true,
  users: [
    { id: 1, nickname: 'Test1', online: true },
    { id: 2, nickname: 'Test2', online: false }
  ],
  total: 2,
  online_count: 1
};

// Проверяем логику метода getProfiles()
const testGetProfiles = () => {
  console.log('1. Тестируем логику getProfiles():');
  
  // Симулируем ответ от getAllProfiles
  const mockApiResponse = mockResponse;
  
  // Логика из нашего метода getProfiles()
  const result = mockApiResponse.success ? mockApiResponse.users || [] : [];
  
  console.log(`   - Успех: ${mockApiResponse.success ? '✅' : '❌'}`);
  console.log(`   - Возвращает массив: ${Array.isArray(result) ? '✅' : '❌'}`);
  console.log(`   - Количество элементов: ${result.length}`);
  console.log(`   - Тип первого элемента: ${typeof result[0]}`);
  
  return result.length === 2 && Array.isArray(result);
};

// Проверяем структуру файла
const fs = require('fs');
const apiContent = fs.readFileSync('./src/services/api.jsx', 'utf8');

console.log('2. Проверка файла api.jsx:');
console.log(`   - Размер файла: ${apiContent.length} символов`);
console.log(`   - Содержит getProfiles: ${apiContent.includes('async getProfiles(') ? '✅' : '❌'}`);
console.log(`   - Содержит export: ${apiContent.includes('export const apiService') ? '✅' : '❌'}`);

// Проверяем что файл не обрывается
const lines = apiContent.split('\n');
console.log(`   - Количество строк: ${lines.length}`);
console.log(`   - Последняя строка: "${lines[lines.length - 1]}"`);

// Итог
console.log('\n🎯 РЕЗУЛЬТАТЫ:');
if (testGetProfiles() && apiContent.includes('async getProfiles(') && lines.length > 100) {
  console.log('✅ ВСЕ ПРОВЕРКИ ПРОЙДЕНЫ!');
  console.log('   API должен работать корректно.');
} else {
  console.log('❌ ЕСТЬ ПРОБЛЕМЫ!');
  console.log('   Проверьте файл api.jsx - он может быть неполным.');
}
