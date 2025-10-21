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
    
    // Фоновые градиенты
    React.createElement("div", {
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(78, 84, 200, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(138, 43, 226, 0.15) 0%, transparent 50%)
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
          padding: "80px 20px",
          textAlign: "center"
        }
      },
      
      // Заголовок с анимированным градиентом
      React.createElement(
        "h1",
        {
          style: {
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: "800",
            marginBottom: "20px",
            background: "linear-gradient(45deg, #4e54c8, #8a2be2, #00ff88, #ff6b6b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "400% 400%",
            animation: "gradientShift 8s ease infinite"
          }
        },
        "🚀 SQUADUP PREMIUM v3.0"
      ),
      
      // Подзаголовок
      React.createElement(
        "p",
        {
          style: {
            fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
            color: "#b0b0d0",
            marginBottom: "10px",
            lineHeight: "1.6"
          }
        },
        "Найди свою идеальную игровую команду"
      ),
      
      // ЯРКИЙ индикатор версии
      React.createElement(
        "div",
        {
          style: {
            background: "linear-gradient(45deg, #00ff88, #4e54c8)",
            color: "white",
            padding: "15px 30px",
            borderRadius: "50px",
            display: "inline-block",
            margin: "30px 0 40px 0",
            fontWeight: "bold",
            fontSize: "1.2rem",
            boxShadow: "0 6px 20px rgba(0, 255, 136, 0.4)",
            animation: "pulse 2s infinite"
          }
        },
        "✨ ПРЕМИУМ ДИЗАЙН АКТИВИРОВАН!"
      ),
      
      // Статус бэкенда
      React.createElement(
        "div",
        {
          style: {
            background: "rgba(255, 255, 255, 0.1)",
            padding: "15px 25px",
            borderRadius: "15px",
            display: "inline-block",
            marginBottom: "50px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)"
          }
        },
        "Backend Status: ",
        React.createElement(
          "strong",
          { 
            style: { 
              color: backendStatus.includes("✅") ? "#00ff88" : 
                     backendStatus.includes("checking") ? "#ffc107" : "#ff6b6b" 
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
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "80px"
          }
        },
        React.createElement(
          "button",
          {
            style: {
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              padding: "18px 35px",
              borderRadius: "50px",
              fontSize: "1.2rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)"
            },
            onMouseEnter: (e) => {
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = "0 10px 30px rgba(102, 126, 234, 0.6)";
            },
            onMouseLeave: (e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.4)";
            }
          },
          "🎮 Начать играть бесплатно"
        ),
        React.createElement(
          "button",
          {
            style: {
              background: "transparent",
              color: "#4e54c8",
              border: "2px solid #4e54c8",
              padding: "16px 32px",
              borderRadius: "50px",
              fontSize: "1.2rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)"
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
          "👥 Войти в систему"
        )
      )
    )
  );
}

export default App;
