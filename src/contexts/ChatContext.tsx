import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  name: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

interface ChatContextType {
  sessions: ChatSession[];
  currentSession: ChatSession | null;
  createSession: () => void;
  loadSession: (sessionId: string) => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  uploadedDocument: File | null;
  setUploadedDocument: (file: File | null) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [uploadedDocument, setUploadedDocument] = useState<File | null>(null);

  useEffect(() => {
    const savedSessions = localStorage.getItem('chatSessions');
    if (savedSessions) {
      const parsed = JSON.parse(savedSessions);
      setSessions(parsed.map((s: any) => ({
        ...s,
        createdAt: new Date(s.createdAt),
        updatedAt: new Date(s.updatedAt),
        messages: s.messages.map((m: any) => ({
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
    const newSession: ChatSession = {
      id: `session-${Date.now()}`,
      name: `Chat ${sessions.length + 1}`,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setSessions(prev => [...prev, newSession]);
    setCurrentSession(newSession);
  };

  const loadSession = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSession(session);
    }
  };

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    if (!currentSession) return;

    const newMessage: Message = {
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