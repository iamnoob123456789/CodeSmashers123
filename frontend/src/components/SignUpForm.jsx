import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function SignupForm({ onClose }) {
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();   // ✅ hook for navigation

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(form);
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup error:", err);
      setError("Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card" style={{ width: "85%" }}>
      <div className="card-body">
        <h5 className="card-title" style={{ marginTop: 0 }}>Create account</h5>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: 12 }}>
            <label htmlFor="signupName">Name</label>
            <input
              id="signupName"
              className="form-control"
              placeholder="Your name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: 12 }}>
            <label htmlFor="signupEmail">Email address</label>
            <input
              id="signupEmail"
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: 16 }}>
            <label htmlFor="signupPassword">Password</label>
            <input
              id="signupPassword"
              type="password"
              className="form-control"
              placeholder="Create a password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Creating account..." : "Sign Up"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => (onClose ? onClose() : navigate(-1))}>Back</button>
          </div>
        </form>
      </div>
    </div>
  );
}
