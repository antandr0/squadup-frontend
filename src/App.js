import React from "react";
import "./index.css";

function App() {
  return React.createElement(
    "div",
    { 
      style: {
        background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
        color: "white",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', Tahoma, sans-serif",
        padding: "20px",
        textAlign: "center"
      }
    },
    React.createElement(
      "h1",
      { 
        style: { 
          fontSize: "3rem",
          marginBottom: "20px",
          background: "linear-gradient(45deg, #4e54c8, #8a2be2)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }
      },
      "🚀 SQUADUP PREMIUM"
    ),
    React.createElement(
      "p",
      { style: { fontSize: "1.2rem", marginBottom: "10px", color: "#00ff88" } },
      "✨ ПРЕМИУМ ДИЗАЙН АКТИВИРОВАН!"
    ),
    React.createElement(
      "p",
      { style: { fontSize: "1rem", marginBottom: "20px", color: "#b0b0d0" } },
      "Backend Status: ✅ Online"
    ),
    React.createElement(
      "button",
      {
        style: {
          background: "linear-gradient(45deg, #4e54c8, #8a2be2)",
          color: "white",
          border: "none",
          padding: "15px 30px",
          borderRadius: "10px",
          fontSize: "1.1rem",
          cursor: "pointer",
          fontWeight: "bold"
        }
      },
      "🎮 Начать играть"
    )
  );
}

export default App;
