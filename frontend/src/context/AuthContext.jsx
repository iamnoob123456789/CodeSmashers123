import { createContext, useContext, useMemo, useState } from "react";
import usersSeed from "../data/users.json";

const AuthContext = createContext();
export function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }) {
  // Static, in-memory auth for demo purposes
  const [users, setUsers] = useState(usersSeed || []);
  const [user, setUser] = useState(null);

  async function login(email, password) {
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      setUser({ id: found.id, name: found.name, email: found.email, role: found.role });
      return;
    }
    setUser({ id: "guest", name: "Guest", email, role: "student" });
  }

  async function signup(form) {
    const exists = users.some(u => u.email === form.email);
    if (!exists) {
      const newUser = {
        id: String(Date.now()),
        name: form.name || "New User",
        email: form.email,
        password: form.password || "",
        role: form.role || "student",
      };
      setUsers(prev => [...prev, newUser]);
      setUser({ id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role });
      return;
    }
    const existing = users.find(u => u.email === form.email) || null;
    if (existing) {
      setUser({ id: existing.id, name: existing.name, email: existing.email, role: existing.role });
    }
  }

  function logout() { setUser(null); }

  const value = useMemo(() => ({ user, login, signup, logout }), [user, users]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
