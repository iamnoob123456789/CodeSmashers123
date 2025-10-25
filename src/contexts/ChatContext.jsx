import React, { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext(undefined);

export function ChatProvider({ children }) {
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [uploadedDocument, setUploadedDocument] = useState(null);

  useEffect(() => {
    const savedSessions = localStorage.getItem('chatSessions');
    if (savedSessions) {
      const parsed = JSON.parse(savedSessions);
      setSessions(parsed.map((s) => ({
        ...s,
        createdAt: new Date(s.createdAt),
        updatedAt: new Date(s.updatedAt),
        messages: s.messages.map((m) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        })),
      })));
    } else {
      createSession();
    }
  }, []);

  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('chatSessions', JSON.stringify(sessions));
    }
  }, [sessions]);

  const createSession = () => {
    const newSession = {
      id: `session-${Date.now()}`,
      name: `Chat ${sessions.length + 1}`,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setSessions(prev => [...prev, newSession]);
    setCurrentSession(newSession);
  };

  const loadSession = (sessionId) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSession(session);
    }
  };

  const deleteSession = (sessionId) => {
    setSessions(prev => {
      const filtered = prev.filter(s => s.id !== sessionId);
      if (currentSession?.id === sessionId) {
        setCurrentSession(filtered.length > 0 ? filtered[0] : null);
        if (filtered.length === 0) {
          createSession();
        }
      }
      return filtered;
    });
  };

  const renameSession = (sessionId, newName) => {
    setSessions(prev =>
      prev.map(s => (s.id === sessionId ? { ...s, name: newName } : s))
    );
    if (currentSession?.id === sessionId) {
      setCurrentSession(prev => ({ ...prev, name: newName }));
    }
  };

  const addMessage = (message) => {
    if (!currentSession) return;

    const newMessage = {
      ...message,
      id: `msg-${Date.now()}`,
      timestamp: new Date(),
    };

    const updatedSession = {
      ...currentSession,
      messages: [...currentSession.messages, newMessage],
      updatedAt: new Date(),
    };

    setCurrentSession(updatedSession);
    setSessions(prev =>
      prev.map(s => (s.id === currentSession.id ? updatedSession : s))
    );
  };

  return (
    <ChatContext.Provider
      value={{
        sessions,
        currentSession,
        createSession,
        loadSession,
        deleteSession,
        renameSession,
        addMessage,
        uploadedDocument,
        setUploadedDocument,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
}
