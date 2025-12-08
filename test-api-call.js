import('axios').then(axios => {
  axios.get('https://squadup-backend-03vr.onrender.com/api/profiles/all')
    .then(response => {
      console.log('✅ API работает!');
      console.log('👥 Пользователей:', response.data.total);
      if (response.data.users && response.data.users.length > 0) {
        console.log('📋 Примеры:');
        response.data.users.slice(0, 3).forEach(user => {
          console.log(`   - ${user.nickname || user.email}`);
        });
      }
    })
    .catch(error => {
      console.error('❌ Ошибка API:', error.message);
    });
}).catch(err => {
  console.error('❌ Не удалось загрузить axios:', err);
});
