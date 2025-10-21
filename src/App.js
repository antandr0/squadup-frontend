import React from "react";
import "./index.css";

function App() {
  const [backendStatus, setBackendStatus] = React.useState("checking...");

  React.useEffect(() => {
    // Проверяем статус бэкенда
    fetch("https://squadup-backend.onrender.com/api/health")
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
        background: "#0f0f23",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "20px",
        textAlign: "center"
      }
    },
    React.createElement(
      "h1",
      { 
        style: { 
          fontSize: "2.5rem",
          marginBottom: "20px",
          background: "linear-gradient(45deg, #4e54c8, #8a2be2)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }
      },
      "SquadUp"
    ),
    React.createElement(
      "p",
      { style: { fontSize: "1.2rem", marginBottom: "10px" } },
      "Find Your Gaming Team"
    ),
    React.createElement(
      "p",
      { style: { fontSize: "1rem", marginBottom: "10px" } },
      "Backend Status: " + backendStatus
    ),
    React.createElement(
      "a",
      { 
        href: "https://squadup-backend.onrender.com/api/health",
        target: "_blank",
        style: { 
          color: "#4e54c8",
          textDecoration: "none",
          fontSize: "0.9rem"
        }
      },
      "Test Backend API"
    )
  );
}

export default App;
