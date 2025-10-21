import React from 'react';
import './index.css';

function App() {
  return React.createElement(
    "div",
    { 
      className: "App",
      style: {
        background: "#0f0f23",
        color: "white",
        minHeight: "100vh",
        padding: "40px 20px",
        textAlign: "center",
        fontFamily: "'Segoe UI', sans-serif"
      }
    },
    React.createElement(
      "h1",
      { 
        style: { 
          fontSize: "3.5rem",
          marginBottom: "20px",
          background: "linear-gradient(45deg, #4e54c8, #8a2be2, #00ff88)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundSize: "400% 400%",
          animation: "gradientShift 6s ease infinite"
        }
      },
      "SquadUp 🚀 PREMIUM"
    ),
    React.createElement(
      "p",
      { 
        style: { 
          fontSize: "1.3rem", 
          marginBottom: "15px", 
          color: "#00ff88",
          fontWeight: "bold"
        }
      },
      "🎨 Премиальный интерфейс загружен!"
    ),
    React.createElement(
      "p",
      { 
        style: { 
          fontSize: "1.1rem", 
          marginBottom: "30px", 
          color: "#b0b0d0" 
        }
      },
      "Backend Status: ✅ Online"
    ),
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          gap: "15px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "40px"
        }
      },
      React.createElement(
        "button",
        {
          style: {
            background: "linear-gradient(45deg, #4e54c8, #8a2be2)",
            color: "white",
            border: "none",
            padding: "15px 30px",
            borderRadius: "50px",
            fontSize: "1.1rem",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 4px 15px rgba(78, 84, 200, 0.4)",
            transition: "all 0.3s ease"
          },
          onMouseEnter: (e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 20px rgba(78, 84, 200, 0.6)";
          },
          onMouseLeave: (e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 15px rgba(78, 84, 200, 0.4)";
          }
        },
        "🎮 Найти команду"
      ),
      React.createElement(
        "button",
        {
          style: {
            background: "transparent",
            color: "#4e54c8",
            border: "2px solid #4e54c8",
            padding: "13px 28px",
            borderRadius: "50px",
            fontSize: "1.1rem",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "all 0.3s ease"
          },
          onMouseEnter: (e) => {
            e.target.style.background = "#4e54c8";
            e.target.style.color = "white";
            e.target.style.transform = "translateY(-2px)";
          },
          onMouseLeave: (e) => {
            e.target.style.background = "transparent";
            e.target.style.color = "#4e54c8";
            e.target.style.transform = "translateY(0)";
          }
        },
        "👥 Войти"
      )
    ),
    React.createElement(
      "div",
      {
        style: {
          background: "rgba(255, 255, 255, 0.05)",
          padding: "20px",
          borderRadius: "15px",
          maxWidth: "500px",
          margin: "0 auto",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }
      },
      React.createElement(
        "h3",
        {
          style: {
            color: "#b0b0d0",
            marginBottom: "15px"
          }
        },
        "✨ Новые функции:"
      ),
      React.createElement(
        "ul",
        {
          style: {
            color: "#b0b0d0",
            textAlign: "left",
            lineHeight: "1.6"
          }
        },
        React.createElement("li", null, "🎨 Glass morphism дизайн"),
        React.createElement("li", null, "🌈 Анимированные градиенты"),
        React.createElement("li", null, "⚡ Плавные анимации"),
        React.createElement("li", null, "📱 Полная адаптивность")
      )
    )
  );
}

export default App;
