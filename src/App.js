import React from 'react'
import './index.css'

function App() {
  React.useEffect(() => {
    document.getElementById('root').innerHTML = `
      <div class="App">
        <h1>SquadUp - Gaming Teammate Finder</h1>
        <p>Приложение загружается...</p>
        <p>Backend: <a href="https://squadup-backend.onrender.com/api/health" target="_blank">Health Check</a></p>
      </div>
    `
  }, [])

  return React.createElement('div')
}

export default App
