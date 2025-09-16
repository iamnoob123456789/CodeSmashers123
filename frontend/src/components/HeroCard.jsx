import React from "react";
import "../styles/main.css"; // if using a global css file

export default function HeroCard({ title, subtitle, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        padding: "20px",
        borderRadius: "8px",
        border: selected ? "2px solid #4a6cf7" : "1px solid #ddd",
        background: selected ? "#fff" : "#f9f9f9",
        transition: "0.2s ease-in-out",
      }}
    >
      <h3 style={{ margin: "0 0 10px", fontSize: "18px" }}>{title}</h3>
      <p style={{ margin: 0, color: "#666" }}>{subtitle}</p>
    </div>
  );
}
