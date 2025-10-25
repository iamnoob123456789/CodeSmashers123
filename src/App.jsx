import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import { DocumentProvider } from './contexts/DocumentContext';
import { Toaster } from './components/ui/sonner';
import { Landing } from './components/Landing';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Home } from './components/Home';
import { About } from './components/About';
import { ChatInterface } from './components/ChatInterface';
import { RiskQuiz } from './components/RiskQuiz';
import { StockQuotes } from './components/StockQuotes';
import { MarketNews } from './components/MarketNews';
import { Documents } from './components/Documents';

function AppContent() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState('landing');

  useEffect(() => {
    if (user && currentPage === 'landing') {
      setCurrentPage('home');
    } else if (!user && !['landing', 'login', 'signup'].includes(currentPage)) {
      setCurrentPage('landing');
    }
  }, [user, currentPage]);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleAuthSuccess = () => {
    setCurrentPage('home');
  };

  // Public pages (no auth required)
  if (currentPage === 'landing') {
    return <Landing onNavigate={handleNavigate} />;
  }

  if (currentPage === 'login') {
    return <Login onNavigate={handleNavigate} onSuccess={handleAuthSuccess} />;
  }

  if (currentPage === 'signup') {
    return <Signup onNavigate={handleNavigate} onSuccess={handleAuthSuccess} />;
  }

  // Protected pages (auth required)
  if (!user) {
    return <Landing onNavigate={handleNavigate} />;
  }

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex pt-16 overflow-hidden">
        <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
        <main className="flex-1 overflow-y-auto lg:ml-64">
          {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
          {currentPage === 'about' && <About />}
          {currentPage === 'chat' && <ChatInterface />}
          {currentPage === 'risk-quiz' && <RiskQuiz />}
          {currentPage === 'stocks' && <StockQuotes />}
          {currentPage === 'news' && <MarketNews />}
          {currentPage === 'documents' && <Documents />}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ChatProvider>
          <DocumentProvider>
            <AppContent />
            <Toaster />
          </DocumentProvider>
        </ChatProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
