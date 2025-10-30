import React from 'react';
import './FriendsPage.css';

const FriendsPage = () => {
  return (
    <div className="friends-page">
      <div className="friends-header">
        <h1>👥 Друзья</h1>
        <p>Управляйте списком друзей и приглашайте их в команду</p>
      </div>

      <div className="friends-content">
        <div className="friends-actions">
          <button className="btn-primary">
            📧 Пригласить друга
          </button>
          <input 
            type="text" 
            placeholder="Поиск друзей..."
            className="search-input"
          />
        </div>

        <div className="friends-list">
          <div className="section-title">Мои друзья</div>
          
          <div className="friend-card">
            <div className="friend-avatar">P</div>
            <div className="friend-info">
              <div className="friend-name">ProPlayer</div>
              <div className="friend-status online">В сети • Рейтинг: 4.8</div>
              <div className="friend-games">Dota 2, CS:GO</div>
            </div>
            <div className="friend-actions">
              <button className="btn-secondary">Написать</button>
              <button className="btn-primary">Пригласить</button>
            </div>
          </div>

          <div className="friend-card">
            <div className="friend-avatar">C</div>
            <div className="friend-info">
              <div className="friend-name">CasualGamer</div>
              <div className="friend-status online">В сети • Рейтинг: 4.2</div>
              <div className="friend-games">Valorant, Overwatch 2</div>
            </div>
            <div className="friend-actions">
              <button className="btn-secondary">Написать</button>
              <button className="btn-primary">Пригласить</button>
            </div>
          </div>

          <div className="friend-card">
            <div className="friend-avatar">S</div>
            <div className="friend-info">
              <div className="friend-name">StrategicMind</div>
              <div className="friend-status offline">Был(а) 2 часа назад</div>
              <div className="friend-games">League of Legends</div>
            </div>
            <div className="friend-actions">
              <button className="btn-secondary">Написать</button>
              <button className="btn-primary">Пригласить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
