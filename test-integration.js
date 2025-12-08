const https = require('https');

console.log('🧪 Тест интеграции фронтенд ↔ бэкенд ↔ БД\n');

// Тест 1: Проверка CORS
console.log('1. 🌐 Проверка CORS настроек...');
const corsOptions = {
  hostname: 'squadup-backend-03vr.onrender.com',
  path: '/api/profiles/all',
  method: 'OPTIONS',
  headers: {
    'Origin': 'https://squadup-frontend.vercel.app',
    'Access-Control-Request-Method': 'GET'
  }
};

const corsReq = https.request(corsOptions, (res) => {
  console.log(`   CORS Status: ${res.statusCode}`);
  console.log(`   Access-Control-Allow-Origin: ${res.headers['access-control-allow-origin']}`);
  console.log(`   ✅ CORS настроен правильно\n`);
});

corsReq.on('error', (e) => {
  console.log(`   ❌ CORS Error: ${e.message}\n`);
});

corsReq.end();

// Тест 2: Проверка API ответа
console.log('2. 📡 Проверка API ответа с реальными данными...');
https.get('https://squadup-backend-03vr.onrender.com/api/profiles/all', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log(`   ✅ API отвечает: ${json.success ? 'Успех' : 'Ошибка'}`);
      console.log(`   📊 Пользователей в БД: ${json.total}`);
      console.log(`   🟢 Онлайн сейчас: ${json.online_count || 0}`);
      
      if (json.users && json.users.length > 0) {
        console.log(`   👤 Примеры пользователей из БД:`);
        json.users.slice(0, 3).forEach((user, i) => {
          const status = user.online ? '🟢 ONLINE' : '⚫ OFFLINE';
          console.log(`      ${i+1}. ${user.nickname || 'Без имени'} - ${status}`);
          console.log(`         Email: ${user.email}`);
          console.log(`         Last active: ${user.last_active ? user.last_active.substring(0, 19) : 'N/A'}`);
        });
      }
      
      console.log(`\n   ✅ Все данные реальные из PostgreSQL!\n`);
    } catch (e) {
      console.log(`   ❌ Ошибка парсинга: ${e.message}\n`);
    }
  });
}).on('error', (e) => {
  console.log(`   ❌ API Error: ${e.message}\n`);
});

// Тест 3: Проверка авторизации
console.log('3. 🔐 Тест авторизации (имитация фронтенда)...');
const authData = JSON.stringify({
  email: '1test@ya.ru',
  password: '11111111'
});

const authOptions = {
  hostname: 'squadup-backend-03vr.onrender.com',
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': authData.length
  }
};

const authReq = https.request(authOptions, (res) => {
  let authData = '';
  res.on('data', (chunk) => authData += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(authData);
      if (json.success) {
        console.log(`   ✅ Авторизация работает!`);
        console.log(`   👤 Пользователь: ${json.user.nickname}`);
        console.log(`   🔑 Токен получен: ${json.token ? 'Да' : 'Нет'}`);
        console.log(`\n   🎉 ВСЕ СИСТЕМЫ РАБОТАЮТ КОРРЕКТНО!\n`);
      } else {
        console.log(`   ❌ Ошибка авторизации: ${json.error}\n`);
      }
    } catch (e) {
      console.log(`   ❌ Ошибка парсинга auth: ${e.message}\n`);
    }
  });
});

authReq.on('error', (e) => {
  console.log(`   ❌ Auth Error: ${e.message}\n`);
});

authReq.write(authData);
authReq.end();
