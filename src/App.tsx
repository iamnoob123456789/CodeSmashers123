import React, { useContext, useState } from 'react';
import { ThemeContext, ThemeProvider } from './contexts/ThemeContext';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
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
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Create a custom hook to use the auth context
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Create a custom hook to use the theme context
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

function AppContent() {
  const { currentUser } = useAuth();
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState('home');
  const navigate = useNavigate();

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    navigate(`/${page}`);
  };

  const handleSuccess = () => {
    // Handle success actions like showing a success message
    console.log('Operation successful');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Header onNavigate={handleNavigate} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <Routes>
              <Route path="/" element={currentUser ? 
                <Home onNavigate={handleNavigate} /> : 
                <Navigate to="/landing" />} />
              <Route path="/landing" element={!currentUser ? 
                <Landing onNavigate={handleNavigate} onSuccess={handleSuccess} /> : 
                <Navigate to="/" />} />
              <Route path="/login" element={!currentUser ? 
                <Login onNavigate={handleNavigate} onSuccess={handleSuccess} /> : 
                <Navigate to="/" />} />
              <Route path="/signup" element={!currentUser ? 
                <Signup onNavigate={handleNavigate} onSuccess={handleSuccess} /> : 
                <Navigate to="/" />} />
              <Route path="/chat" element={currentUser ? 
                <ChatInterface /> : 
                <Navigate to="/login" />} />
              <Route path="/stocks" element={currentUser ? 
                <StockQuotes /> : 
                <Navigate to="/login" />} />
              <Route path="/news" element={currentUser ? 
                <MarketNews /> : 
                <Navigate to="/login" />} />
              <Route path="/documents" element={currentUser ? 
                <Documents /> : 
                <Navigate to="/login" />} />
              <Route path="/risk-assessment" element={currentUser ? 
                <RiskQuiz /> : 
                <Navigate to="/login" />} />
              <Route path="/about" element={
                <About onNavigate={handleNavigate} />} />
            </Routes>
          </main>
        </div>
        <Toaster position="top-right" />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <ChatProvider>
            <DocumentProvider>
              <AppContent />
            </DocumentProvider>
          </ChatProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
