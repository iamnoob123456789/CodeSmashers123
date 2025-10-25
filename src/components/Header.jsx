import React from 'react';
import { Moon, Sun, LogOut, TrendingUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

export function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-900 dark:to-cyan-900 text-white shadow-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-8 h-8" />
          <h1 className="text-white">FinChat</h1>
        </div>
        
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/90 hidden sm:inline">
              Hi, {user.name}
            </span>
            
            <button
              onClick={toggleTheme}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button
              onClick={logout}
              className="px-3 py-2 text-white hover:bg-white/20 rounded-lg transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
