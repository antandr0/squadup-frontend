import React from "react";
import "./index.css";

function App() {
  return React.createElement(
    "div",
    { 
      className: "App",
      style: {
        background: "#0f0f23",
        color: "white",
        minHeight: "100vh",
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
      }
    },
    React.createElement(
      "nav",
      {
        style: {
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.1)"
        }
      },
      React.createElement(
        "h1",
        {
          style: {
            background: "linear-gradient(45deg, #4e54c8, #8a2be2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: 0,
            fontSize: "1.5rem"
          }
        },
        "SquadUp"
      ),
      React.createElement(
        "div",
        null,
        React.createElement(
          "button",
          {
            style: {
              background: "transparent",
              color: "white",
              border: "1px solid #4e54c8",
              padding: "10px 20px",
              borderRadius: "5px",
              marginRight: "10px",
              cursor: "pointer"
            }
          },
          "Login"
        ),
        React.createElement(
          "button",
          {
            style: {
              background: "linear-gradient(45deg, #4e54c8, #8a2be2)",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer"
            }
          },
          "Sign Up"
        )
      )
    ),
    React.createElement(
      "div",
      {
        style: {
          padding: "60px 20px",
          textAlign: "center",
          maxWidth: "800px",
          margin: "0 auto"
        }
      },
      React.createElement(
        "h2",
        {
          style: {
            fontSize: "3rem",
            marginBottom: "20px",
            lineHeight: "1.2"
          }
        },
        "Find Your Perfect Team"
      ),
      React.createElement(
        "p",
        {
          style: {
            fontSize: "1.2rem",
            marginBottom: "40px",
            opacity: 0.8,
            lineHeight: "1.6"
          }
        },
        "Connect with gamers worldwide. Find teammates, build squads, dominate games."
      ),
      React.createElement(
        "button",
        {
          style: {
            background: "linear-gradient(45deg, #4e54c8, #8a2be2)",
            color: "white",
            border: "none",
            padding: "15px 30px",
            borderRadius: "8px",
            fontSize: "1.1rem",
            cursor: "pointer",
            fontWeight: "bold"
          }
        },
        "Get Started"
      )
    )
  );
}

export default App;
