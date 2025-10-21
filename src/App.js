import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import Dashboard from "./components/Dashboard";
import "./styles/index.css";

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return React.createElement(
      "div",
      {
        style: {
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--primary-dark)",
          color: "white"
        }
      },
      React.createElement(
        "div",
        { style: { textAlign: "center" } },
        React.createElement(
          "div",
          { 
            style: { 
              fontSize: "48px", 
              marginBottom: "20px" 
            } 
          },
          "•"
        ),
        React.createElement("div", null, "Загрузка SquadUp...")
      )
    );
  }

  return React.createElement(
    "div",
    { className: "App" },
    React.createElement(Navigation),
    user 
      ? React.createElement(Dashboard) 
      : React.createElement(HomePage)
  );
};

function App() {
  return React.createElement(
    AuthProvider,
    null,
    React.createElement(AppContent)
  );
}

export default App;
