import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Plus, History, Trash2, Edit2, Check, X } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import { toast } from 'sonner';

export function ChatInterface() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSessions, setShowSessions] = useState(false);
  const [editingSessionId, setEditingSessionId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const messagesEndRef = useRef(null);
  const {
    currentSession,
    sessions,
    addMessage,
    createSession,
    loadSession,
    deleteSession,
    renameSession,
  } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages]);

  const handleSend = async () => {
    if (!input.trim() || !currentSession) return;

    const userMessage = input.trim();
    setInput('');
    addMessage({ role: 'user', content: userMessage });
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      let response = '';
      const lowerInput = userMessage.toLowerCase();

      if (lowerInput.includes('stock') || lowerInput.includes('invest')) {
        response = "I can help you with stock information! Try asking about specific stocks like 'What's the price of AAPL?' or visit the Stock Quotes page for detailed analysis.";
      } else if (lowerInput.includes('risk')) {
        response = "To assess your investment risk profile, I recommend taking our Risk Quiz. It will help determine the best investment strategy for you based on your tolerance and goals.";
      } else {
        response = `I understand you're asking about "${userMessage}". As an AI financial assistant, I can help with stock analysis, market trends, portfolio advice, and document analysis. How can I assist you further?`;
      }

      addMessage({ role: 'assistant', content: response });
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header with session controls */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-blue-600" />
          <h3>AI Financial Assistant</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              className="px-3 py-2 border border-border rounded-lg hover:bg-accent flex items-center gap-2 text-sm"
              onClick={() => setShowSessions(!showSessions)}
            >
              <History className="w-4 h-4" />
              Sessions
            </button>
            {showSessions && (
              <>
                <div 
                  className="fixed inset-0 z-10"
                  onClick={() => setShowSessions(false)}
                />
                <div className="absolute right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-lg z-20 max-h-96 overflow-y-auto">
                  <button
                    className="w-full px-4 py-3 hover:bg-accent flex items-center gap-2 border-b border-border"
                    onClick={() => {
                      createSession();
                      setShowSessions(false);
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    New Chat
                  </button>
                  {sessions.map(session => (
                    <div
                      key={session.id}
                      className={`px-4 py-3 hover:bg-accent ${
                        currentSession?.id === session.id ? 'bg-accent' : ''
                      }`}
                    >
                      {editingSessionId === session.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            className="flex-1 px-2 py-1 text-sm bg-input border border-border rounded"
                            autoFocus
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                renameSession(session.id, editingName);
                                setEditingSessionId(null);
                              }
                            }}
                          />
                          <button
                            className="p-1 hover:bg-muted rounded"
                            onClick={() => {
                              renameSession(session.id, editingName);
                              setEditingSessionId(null);
                            }}
                          >
                            <Check className="w-3 h-3" />
                          </button>
                          <button
                            className="p-1 hover:bg-muted rounded"
                            onClick={() => setEditingSessionId(null)}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-2">
                          <button
                            className="flex-1 text-left"
                            onClick={() => {
                              loadSession(session.id);
                              setShowSessions(false);
                            }}
                          >
                            <div className="flex flex-col items-start">
                              <span className="text-sm">{session.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {session.messages.length} messages • {new Date(session.updatedAt).toLocaleDateString()}
                              </span>
                            </div>
                          </button>
                          <div className="flex items-center gap-1">
                            <button
                              className="p-1 hover:bg-muted rounded"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingSessionId(session.id);
                                setEditingName(session.name);
                              }}
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              className="p-1 hover:bg-destructive/10 text-destructive rounded"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (confirm(`Delete "${session.name}"?`)) {
                                  deleteSession(session.id);
                                  toast.success('Session deleted');
                                }
                              }}
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!currentSession?.messages.length && (
          <div className="p-8 text-center bg-card border border-border rounded-xl">
            <Bot className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="mb-2">Welcome to FinChat!</h3>
            <p className="text-muted-foreground mb-4">
              Ask me anything about stocks, investments, and financial markets.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <button 
                className="px-3 py-1 border border-border rounded-lg hover:bg-accent text-sm"
                onClick={() => setInput("What's trending in the stock market today?")}
              >
                Market Trends
              </button>
              <button 
                className="px-3 py-1 border border-border rounded-lg hover:bg-accent text-sm"
                onClick={() => setInput("How should I diversify my portfolio?")}
              >
                Portfolio Advice
              </button>
              <button 
                className="px-3 py-1 border border-border rounded-lg hover:bg-accent text-sm"
                onClick={() => setInput("Explain P/E ratio")}
              >
                Learn Concepts
              </button>
            </div>
          </div>
        )}

        {currentSession?.messages.map(message => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.role === 'user'
                ? 'bg-gradient-to-br from-blue-600 to-cyan-600'
                : 'bg-muted'
            }`}>
              {message.role === 'user' ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Bot className="w-4 h-4 text-foreground" />
              )}
            </div>
            <div className={`p-4 max-w-[80%] rounded-xl border border-border ${
              message.role === 'user'
                ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white'
                : 'bg-card'
            }`}>
              <p className={message.role === 'user' ? 'text-white' : ''}>
                {message.content}
              </p>
              <span className={`text-xs mt-2 block ${
                message.role === 'user' ? 'text-white/70' : 'text-muted-foreground'
              }`}>
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 bg-card border border-border rounded-xl">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about finance..."
            className="flex-1 min-h-[60px] px-3 py-2 bg-input-background dark:bg-input border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
            disabled={isLoading}
          />
          
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
