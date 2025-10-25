import React, { createContext, useContext, useState, useEffect } from 'react';

const DocumentContext = createContext(undefined);

export function DocumentProvider({ children }) {
  const [documentSessions, setDocumentSessions] = useState([]);
  const [currentDocumentSession, setCurrentDocumentSession] = useState(null);

  useEffect(() => {
    const savedSessions = localStorage.getItem('documentSessions');
    if (savedSessions) {
      const parsed = JSON.parse(savedSessions);
      setDocumentSessions(parsed.map((s) => ({
        ...s,
        createdAt: new Date(s.createdAt),
        updatedAt: new Date(s.updatedAt),
      })));
    }
  }, []);

  useEffect(() => {
    if (documentSessions.length > 0) {
      localStorage.setItem('documentSessions', JSON.stringify(documentSessions));
    }
  }, [documentSessions]);

  const createDocumentSession = (file, analysis) => {
    const newSession = {
      id: `doc-session-${Date.now()}`,
      fileName: file.name,
      fileSize: file.size,
      analysis,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setDocumentSessions(prev => [...prev, newSession]);
    setCurrentDocumentSession(newSession);
    return newSession;
  };

  const loadDocumentSession = (sessionId) => {
    const session = documentSessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentDocumentSession(session);
    }
  };

  const deleteDocumentSession = (sessionId) => {
    setDocumentSessions(prev => {
      const filtered = prev.filter(s => s.id !== sessionId);
      if (currentDocumentSession?.id === sessionId) {
        setCurrentDocumentSession(filtered.length > 0 ? filtered[0] : null);
      }
      return filtered;
    });
  };

  const addDocumentMessage = (message) => {
    if (!currentDocumentSession) return;

    const updatedSession = {
      ...currentDocumentSession,
      messages: [...currentDocumentSession.messages, message],
      updatedAt: new Date(),
    };

    setCurrentDocumentSession(updatedSession);
    setDocumentSessions(prev =>
      prev.map(s => (s.id === currentDocumentSession.id ? updatedSession : s))
    );
  };

  const clearCurrentSession = () => {
    setCurrentDocumentSession(null);
  };

  return (
    <DocumentContext.Provider
      value={{
        documentSessions,
        currentDocumentSession,
        createDocumentSession,
        loadDocumentSession,
        deleteDocumentSession,
        addDocumentMessage,
        clearCurrentSession,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocument() {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocument must be used within DocumentProvider');
  }
  return context;
}
