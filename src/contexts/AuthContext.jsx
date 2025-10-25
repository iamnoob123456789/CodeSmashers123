import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }

      const user = {
        email,
        name: email.split('@')[0],
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', 'mock-token-' + Date.now());
      setUser(user);
      toast.success('Login successful!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email, password, confirmPassword) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (!email || !password || !confirmPassword) {
        throw new Error('Please fill in all fields');
      }
      
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      const user = {
        email,
        name: email.split('@')[0],
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', 'mock-token-' + Date.now());
      setUser(user);
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Signup failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
