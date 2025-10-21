import React from "react";

export default function App() {
  return React.createElement("div", {
    style: {
      background: "#0f0f23",
      color: "white",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "sans-serif"
    }
  }, 
    React.createElement("div", {
      style: { textAlign: "center" }
    },
      React.createElement("h1", {
        style: { 
          fontSize: "3rem", 
          marginBottom: "20px",
          color: "#4e54c8"
        }
      }, "🚀 SQUADUP"),
      React.createElement("p", {
        style: { 
          fontSize: "1.2rem", 
          marginBottom: "10px",
          color: "#00ff88"
        }
      }, "Премиум дизайн активен!"),
      React.createElement("button", {
        style: {
          background: "#4e54c8",
          color: "white",
          border: "none",
          padding: "12px 24px",
          borderRadius: "8px",
          fontSize: "1rem",
          cursor: "pointer"
        }
      }, "🎮 Начать играть")
    )
  );
}
