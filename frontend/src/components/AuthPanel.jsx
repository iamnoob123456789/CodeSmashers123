import React from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignUpForm";

export default function AuthPanel({ mode = "login", onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: "400px",
          background: "#fff",
          borderRadius: "8px",
          padding: "20px",
          position: "relative",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "transparent",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          {mode === "login" ? "Login to FinAssist" : "Create your Account"}
        </h2>

        {mode === "login" ? <LoginForm onClose={onClose} /> : <SignupForm onClose={onClose} />}
      </div>
    </div>
  );
}
