import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the types
interface DocumentMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface DocumentAnalysis {
  summary?: string;
  keyPoints?: string[];
  questions?: string[];
  [key: string]: any;
}

interface DocumentSession {
  id: string;
  fileName: string;
  fileSize: number;
  analysis: DocumentAnalysis;
  messages: DocumentMessage[];
  createdAt: Date;
  updatedAt: Date;
}

interface DocumentContextType {
  documentSessions: DocumentSession[];
  currentDocumentSession: DocumentSession | null;
  createDocumentSession: (file: File, analysis: DocumentAnalysis) => DocumentSession;
  loadDocumentSession: (sessionId: string) => void;
  deleteDocumentSession: (sessionId: string) => void;
  addDocumentMessage: (message: Omit<DocumentMessage, 'timestamp'>) => void;
  clearCurrentSession: () => void;
}

interface DocumentProviderProps {
  children: ReactNode;
}

// Create context with undefined as initial value but proper typing
const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export function DocumentProvider({ children }: DocumentProviderProps) {
  const [documentSessions, setDocumentSessions] = useState<DocumentSession[]>([]);
  const [currentDocumentSession, setCurrentDocumentSession] = useState<DocumentSession | null>(null);

  useEffect(() => {
    const savedSessions = localStorage.getItem('documentSessions');
    if (savedSessions) {
      try {
        const parsed = JSON.parse(savedSessions);
        setDocumentSessions(parsed.map((s: any) => ({
          ...s,
          createdAt: new Date(s.createdAt),
          updatedAt: new Date(s.updatedAt),
          messages: s.messages ? s.messages.map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp)
          })) : []
        })));
      } catch (error) {
        console.error('Error parsing saved sessions:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (documentSessions.length > 0) {
      localStorage.setItem('documentSessions', JSON.stringify(documentSessions));
    }
  }, [documentSessions]);

  const createDocumentSession = (file: File, analysis: DocumentAnalysis): DocumentSession => {
    const newSession: DocumentSession = {
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

  const loadDocumentSession = (sessionId: string): void => {
    const session = documentSessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentDocumentSession(session);
    }
  };

  const deleteDocumentSession = (sessionId: string): void => {
    setDocumentSessions(prev => {
      const filtered = prev.filter(s => s.id !== sessionId);
      if (currentDocumentSession?.id === sessionId) {
        setCurrentDocumentSession(filtered.length > 0 ? filtered[0] : null);
      }
      return filtered;
    });
  };

  const addDocumentMessage = (message: Omit<DocumentMessage, 'timestamp'>): void => {
    if (!currentDocumentSession) return;

    const messageWithTimestamp: DocumentMessage = {
      ...message,
      timestamp: new Date(),
    };

    const updatedSession: DocumentSession = {
      ...currentDocumentSession,
      messages: [...currentDocumentSession.messages, messageWithTimestamp],
      updatedAt: new Date(),
    };

    setCurrentDocumentSession(updatedSession);
    setDocumentSessions(prev =>
      prev.map(s => (s.id === currentDocumentSession.id ? updatedSession : s))
    );
  };

  const clearCurrentSession = (): void => {
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

export function useDocument(): DocumentContextType {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocument must be used within DocumentProvider');
  }
  return context;
}