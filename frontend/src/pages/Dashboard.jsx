import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import ChatBot from "../components/ChatBot";
import Quiz from "../components/Quiz";
import GoalPlanner from "../components/GoalPlanner";
import BudgetTracker from "../components/BudgetTracker";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem("activeTab") || "chatbot");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("theme-dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
  }

  return (
    <div className="hero-bg page">
      <header className="header-bar">
        <h2 style={{ margin: 0 }}>FinAssist</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ marginRight: "10px" }}>Hi, {user?.name || "User"}</span>
          <button style={{ marginRight: "10px", background: "#0ea5e9" }} onClick={toggleTheme}>{theme === "light" ? "Dark" : "Light"} Mode</button>
          <button onClick={() => { logout(); navigate("/"); }}>Logout</button>
        </div>
      </header>

      <div className="container">
      <nav className="nav-tabs-blue tabs">
        <button onClick={() => navigate("/")}>Home</button>
        <button className={activeTab === "chatbot" ? "active" : ""} onClick={() => setActiveTab("chatbot")}>Chatbot</button>
        <button className={activeTab === "quiz" ? "active" : ""} onClick={() => setActiveTab("quiz")}>Risk Quiz</button>
        <button className={activeTab === "goal" ? "active" : ""} onClick={() => setActiveTab("goal")}>Goal Planner</button>
        <button className={activeTab === "budget" ? "active" : ""} onClick={() => setActiveTab("budget")}>Budget Tracker</button>
      </nav>

      <main className="content">
        {activeTab === "chatbot" && <ChatBot />}
        {activeTab === "quiz" && <Quiz />}
        {activeTab === "goal" && <GoalPlanner />}
        {activeTab === "budget" && <BudgetTracker />}
      </main>
      </div>
    </div>
  );
}
