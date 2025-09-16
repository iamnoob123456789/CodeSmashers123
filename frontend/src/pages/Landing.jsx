import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthPanel from "../components/AuthPanel";
import "../styles/main.css";

export default function Landing() {
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
  const [mode, setMode] = useState("login");

  function goToDashboardTab(tab) {
    try {
      localStorage.setItem("activeTab", tab);
    } catch (e) {
      console.error("localStorage error:", e);
    }
    navigate("/dashboard");
  }

  const navItems = [
    { label: "Home", tab: "/" },
    { label: "Chatbot", tab: "chatbot" },
    { label: "Risk Quiz", tab: "quiz" },
    { label: "Goal Planner", tab: "goal" },
    { label: "Budget Tracker", tab: "budget" },
  ];

  return (
    <div className="hero-bg page">
      {/* Header */}
      <header className="header-bar">
        <h2 style={{ margin: 0 }}>FinAssist</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <nav className="nav-tabs-blue tabs" style={{ marginRight: 8 }}>
            {navItems.map((item) => (
              <button
                key={item.tab}
                style={{ background: "#2463EB", color: "white" }}
                onClick={() => goToDashboardTab(item.tab)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container content">
        {/* Hero Section */}
        <div className="row align-items-center" style={{ marginTop: "1rem" }}>
          <div className="col-md-6">
            <h1 style={{ marginTop: 0 }}>Smart, Friendly Finance Advice</h1>
            <p className="lead">
              Plan goals, start SIPs, learn investing — all explained clearly with trusted guidance.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => { setMode("signup"); setShowAuth(true); }}>
                Get Started
              </button>
              <button
                style={{ background: "#eef2ff", color: "#0b3ea8" }}
                onClick={() => { setMode("login"); setShowAuth(true); }}
              >
                Sign In
              </button>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card" style={{ background: "linear-gradient(135deg,#d6e4ff,#ffffff)" }}>
              <div className="card-body">
                <h5 className="card-title">Why FinAssist?</h5>
                <ul>
                  <li>Personalized recommendations based on your profile</li>
                  <li>Explainable AI — see reasoning and sources</li>
                  <li>Goal-based planning and SIP calculators</li>
                  <li>Budget tracking and insights</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="row" style={{ marginTop: "1.5rem" }}>
          {[
            {
              title: "AI Chatbot (RAG + XAI)",
              text: "Ask anything on investing and money. We retrieve from curated finance docs and explain the reasoning.",
              color: "#2463eb",
            },
            {
              title: "Risk Profiling",
              text: "Take a quick 5-question quiz to identify your risk tolerance: Low, Moderate, or High.",
              color: "#0ea5e9",
            },
            {
              title: "Goal Planner",
              text: "Set goals like buying a car or studying abroad. We compute monthly SIPs to reach them on time.",
              color: "#22c55e",
            },
            {
              title: "Budget Tracker",
              text: "Track expenses and savings rate. Get tips to save 20%+ consistently.",
              color: "#f59e0b",
            },
          ].map((feature, idx) => (
            <div className="col-md-3" key={idx}>
              <div className="card h-100" style={{ borderTop: `4px solid ${feature.color}` }}>
                <div className="card-body">
                  <h5 className="card-title">{feature.title}</h5>
                  <p className="card-text">{feature.text}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Extra Info Section */}
        <section className="row" style={{ marginTop: "1.5rem" }}>
          <div className="col-md-6">
            <div className="card h-100" style={{ borderLeft: "4px solid #6366f1" }}>
              <div className="card-body">
                <h5 className="card-title">Explainable Recommendations</h5>
                <p className="card-text">
                  Every suggestion comes with logic like “Because you are moderate risk…” and references to sources.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card h-100" style={{ borderLeft: "4px solid #14b8a6" }}>
              <div className="card-body">
                <h5 className="card-title">Privacy-first</h5>
                <p className="card-text">
                  Your data stays secure. We only store what’s needed and you can opt for local-only mode for the prototype.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Auth Modal */}
      {showAuth && (
        <AuthPanel mode={mode} onClose={() => setShowAuth(false)} />
      )}
    </div>
  );
}
