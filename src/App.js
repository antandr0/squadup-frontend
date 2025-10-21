import React, { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [backendStatus, setBackendStatus] = useState("checking...");

  useEffect(() => {
    fetch("https://squadup-backend-03vr.onrender.com/api/health")
      .then(response => response.json())
      .then(data => {
        setBackendStatus("✅ Online");
      })
      .catch(error => {
        setBackendStatus("❌ Offline");
      });
  }, []);

  return React.createElement(
    "div",
    { 
      className: "App",
      style: {
        background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
        color: "white",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', Tahoma, sans-serif",
        position: "relative",
        overflow: "hidden"
      }
    },
    
    // Анимированный фон
    React.createElement("div", {
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(78, 84, 200, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(138, 43, 226, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)
        `,
        zIndex: 1
      }
    }),
    
    // Основной контент
    React.createElement(
      "div",
      {
        style: {
          position: "relative",
          zIndex: 2,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "100px 20px",
          textAlign: "center"
        }
      },
      
      // Главный заголовок
      React.createElement(
        "h1",
        {
          style: {
            fontSize: "clamp(3rem, 7vw, 5rem)",
            fontWeight: "900",
            marginBottom: "30px",
            background: "linear-gradient(45deg, #4e54c8, #8a2be2, #00ff88, #ff6b6b, #ffd93d)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "400% 400%",
            animation: "gradientShift 6s ease infinite",
            textShadow: "0 0 30px rgba(78, 84, 200, 0.5)"
          }
        },
        "🎮 SQUADUP PREMIUM"
      ),
      
      // Подзаголовок
      React.createElement(
        "p",
        {
          style: {
            fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
            color: "#b0b0d0",
            marginBottom: "20px",
            lineHeight: "1.6",
            fontWeight: "300"
          }
        },
        "Твоя идеальная игровая команда ждет тебя"
      ),
      
      // ЯРКИЙ индикатор - невозможно пропустить
      React.createElement(
        "div",
        {
          style: {
            background: "linear-gradient(45deg, #ff6b6b, #4e54c8, #00ff88)",
            color: "white",
            padding: "20px 40px",
            borderRadius: "50px",
            display: "inline-block",
            margin: "40px 0 50px 0",
            fontWeight: "bold",
            fontSize: "1.4rem",
            boxShadow: "0 8px 30px rgba(255, 107, 107, 0.4)",
            animation: "pulse 1.5s infinite, gradientShift 4s ease infinite",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)"
          }
        },
        "🔥 ПРЕМИУМ ДИЗАЙН v4.0 АКТИВИРОВАН!"
      ),
      
      // Статус бэкенда
      React.createElement(
        "div",
        {
          style: {
            background: "rgba(255, 255, 255, 0.15)",
            padding: "20px 30px",
            borderRadius: "20px",
            display: "inline-block",
            marginBottom: "60px",
            backdropFilter: "blur(15px)",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
          }
        },
        "🌐 Backend Status: ",
        React.createElement(
          "strong",
          { 
            style: { 
              color: backendStatus.includes("✅") ? "#00ff88" : 
                     backendStatus.includes("checking") ? "#ffc107" : "#ff6b6b",
              fontSize: "1.3rem",
              textShadow: backendStatus.includes("✅") ? "0 0 10px #00ff88" : "none"
            }
          },
          backendStatus
        )
      ),
      
      // Кнопки CTA
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            gap: "25px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "100px"
          }
        },
        React.createElement(
          "button",
          {
            style: {
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              padding: "20px 40px",
              borderRadius: "50px",
              fontSize: "1.3rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.4s ease",
              boxShadow: "0 8px 25px rgba(102, 126, 234, 0.5)",
              position: "relative",
              overflow: "hidden"
            },
            onMouseEnter: (e) => {
              e.target.style.transform = "translateY(-5px) scale(1.05)";
              e.target.style.boxShadow = "0 15px 40px rgba(102, 126, 234, 0.7)";
            },
            onMouseLeave: (e) => {
              e.target.style.transform = "translateY(0) scale(1)";
              e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.5)";
            }
          },
          "🚀 Начать играть бесплатно"
        ),
        React.createElement(
          "button",
          {
            style: {
              background: "transparent",
              color: "#4e54c8",
              border: "3px solid #4e54c8",
              padding: "18px 38px",
              borderRadius: "50px",
              fontSize: "1.3rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.4s ease",
              backdropFilter: "blur(10px)",
              position: "relative",
              overflow: "hidden"
            },
            onMouseEnter: (e) => {
              e.target.style.background = "#4e54c8";
              e.target.style.color = "white";
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = "0 10px 30px rgba(78, 84, 200, 0.4)";
            },
            onMouseLeave: (e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#4e54c8";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }
          },
          "👥 Войти в систему"
        )
      ),
      
      // Информация о версии
      React.createElement(
        "div",
        {
          style: {
            background: "rgba(255, 255, 255, 0.1)",
            padding: "30px",
            borderRadius: "20px",
            maxWidth: "600px",
            margin: "0 auto",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)"
          }
        },
        React.createElement(
          "h3",
          {
            style: {
              color: "#4e54c8",
              marginBottom: "15px",
              fontSize: "1.5rem"
            }
          },
          "✨ Что нового в v4.0:"
        ),
        React.createElement(
          "ul",
          {
            style: {
              color: "#b0b0d0",
              textAlign: "left",
              lineHeight: "1.8",
              fontSize: "1.1rem"
            }
          },
          React.createElement("li", null, "🎨 Полностью переработанный дизайн"),
          React.createElement("li", null, "🌈 Анимированные градиенты"),
          React.createElement("li", null, "⚡ Glass morphism эффекты"),
          React.createElement("li", null, "🚀 Интерактивные элементы"),
          React.createElement("li", null, "📱 Полная адаптивность")
        )
      ),
      
      // Футер с временем обновления
      React.createElement(
        "div",
        {
          style: {
            marginTop: "80px",
            paddingTop: "40px",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            color: "#b0b0d0",
            fontSize: "14px"
          }
        },
        "SquadUp Premium v4.0 • ",
        React.createElement(
          "strong",
          { style: { color: "#4e54c8" } },
          "Обновлено: " + new Date().toLocaleString('ru-RU')
        )
      )
    )
  );
}

export default App;
