const { sequelize } = require('../config/database');
const User = require('./User');
const Profile = require('./Profile');
const Review = require('./Review');
const VoiceRoom = require('./VoiceRoom');        // Добавляем
const VoiceSession = require('./VoiceSession');  // Добавляем

const models = {
  User,
  Profile,
  Review,
  VoiceRoom,        // Добавляем
  VoiceSession      // Добавляем
};

// Существующие связи...
User.hasOne(Profile, {
  foreignKey: 'user_id',
    as: 'profile'
});

Profile.belongsTo(User, {
  foreignKey: 'user_id',
    as: 'user'
});

// Связи для отзывов
User.hasMany(Review, {
  foreignKey: 'from_user_id',
    as: 'reviewsGiven'
});

User.hasMany(Review, {
  foreignKey: 'to_user_id',
    as: 'reviewsReceived'
});

Review.belongsTo(User, {
  foreignKey: 'from_user_id',
    as: 'fromUser'
});

Review.belongsTo(User, {
  foreignKey: 'to_user_id',
    as: 'toUser'
});

// Связи для голосовых комнат
User.hasMany(VoiceRoom, {
  foreignKey: 'created_by',
    as: 'createdRooms'
});

VoiceRoom.belongsTo(User, {
  foreignKey: 'created_by',
    as: 'creator'
});

VoiceRoom.hasMany(VoiceSession, {
  foreignKey: 'room_id',
    as: 'sessions'
});

VoiceSession.belongsTo(VoiceRoom, {
  foreignKey: 'room_id',
    as: 'room'
});

VoiceSession.belongsTo(User, {
  foreignKey: 'user_id',
    as: 'user'
});

models.sequelize = sequelize;
models.Sequelize = require('sequelize');

module.exports = models;
