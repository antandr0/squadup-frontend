// Минимальный тест исправления
console.log('🧪 Тестируем исправление API...');

// Создаем мок localStorage
const mockLocalStorage = {
  getItem: (key) => {
    if (key === 'token') return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJlbWFpbCI6IjF0ZXN0QHlhLnJ1IiwiaWF0IjoxNzY1MjI0MzUxLCJleHAiOjE3NjUzMTA3NTF9.960t904oM8G4yxoK1hisrrieE2p4uA9_HWBhQvUFwF0';
    return null;
  }
};

// Имитируем глобальный объект
global.localStorage = mockLocalStorage;
global.fetch = async () => ({
  ok: true,
  json: async () => ({
    success: true,
    users: [
      { id: 1, nickname: 'TestUser1', online: true },
      { id: 2, nickname: 'TestUser2', online: false }
    ],
    total: 2,
    online_count: 1
  })
});

// Проверяем что метод существует
const apiCode = require('fs').readFileSync('./src/services/api.jsx', 'utf8');
if (apiCode.includes('async getProfiles(')) {
  console.log('✅ Метод getProfiles() добавлен в api.jsx');
  
  // Проверяем что UserDashboard.jsx ожидает массив
  const dashboardCode = require('fs').readFileSync('./src/components/UserDashboard.jsx', 'utf8');
  const lines = dashboardCode.split('\n');
  const getProfilesLine = lines.findIndex(line => line.includes('apiService.getProfiles()'));
  
  if (getProfilesLine >= 0) {
    console.log(`✅ UserDashboard.jsx использует getProfiles() на строке ${getProfilesLine + 1}`);
    
    // Проверяем следующую строку
    const nextLine = lines[getProfilesLine + 1];
    if (nextLine && nextLine.includes('Array.isArray')) {
      console.log('✅ UserDashboard.jsx проверяет что результат - массив');
    }
  }
} else {
  console.log('❌ Метод getProfiles() НЕ найден в api.jsx');
}
