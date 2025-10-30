import React, { useState, FormEvent, ChangeEvent } from 'react';
import { TrendingUp, Mail, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LoginProps {
  onNavigate: (destination: string) => void;
  onSuccess: () => void;
}

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
}

export function Login({ onNavigate, onSuccess }: LoginProps): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login, isLoading } = useAuth() as AuthContextType;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await login(email, password);
      onSuccess();
    } catch (error) {
      // Error is handled in AuthContext
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleForgotPassword = (): void => {
    // Implement forgot password functionality
    console.log('Forgot password clicked');
  };

  const handleSignUpClick = (): void => {
    onNavigate('signup');
  };

  const handleBackToHome = (): void => {
    onNavigate('landing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:from-gray-900 dark:via-blue-950 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-border">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h2 className="mb-2">Welcome Back</h2>
          <p className="text-muted-foreground">Sign in to access your FinChat account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={handleEmailChange}
                className="w-full pl-10 pr-4 py-2 bg-input-background dark:bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                className="w-full pl-10 pr-4 py-2 bg-input-background dark:bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            Forgot Password?
          </button>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <button
              onClick={handleSignUpClick}
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Sign up
            </button>
          </p>
          <button
            onClick={handleBackToHome}
            className="text-sm text-muted-foreground hover:underline mt-2"
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}