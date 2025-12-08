// Добавьте эту строку в список импортов в App.jsx:
import UsersList from './components/UsersList';

// И добавьте компонент в JSX (в дашборде):
{view === 'dashboard' && (
  <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
    <UsersList />
  </div>
)}
