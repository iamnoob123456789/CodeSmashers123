import React, { useState, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { Upload, FileText, MessageSquare, Send, History, Plus, Trash2, FolderOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { Badge } from './ui/badge';
import { useDocument } from '../contexts/DocumentContext';

interface DocumentMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

interface DocumentAnalysis {
  summary: string;
  keyPoints: string[];
  fileName?: string;
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
  addDocumentMessage: (message: DocumentMessage) => void;
  clearCurrentSession: () => void;
}

interface UploadedFile {
  name: string;
  size?: number;
}

export function Documents(): JSX.Element {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>('');
  const [isAsking, setIsAsking] = useState<boolean>(false);
  const [showSessions, setShowSessions] = useState<boolean>(false);

  const {
    documentSessions,
    currentDocumentSession,
    createDocumentSession,
    loadDocumentSession,
    deleteDocumentSession,
    addDocumentMessage,
    clearCurrentSession,
  } = useDocument() as DocumentContextType;

  const onDrop = async (acceptedFiles: File[]): Promise<void> => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.type === 'application/pdf') {
        setUploadedFile(file);
        await analyzeDocument(file);
      } else {
        toast.error('Please upload a PDF file');
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
  });

  const analyzeDocument = async (file: File): Promise<void> => {
    setIsAnalyzing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockAnalysis: DocumentAnalysis = {
        fileName: file.name,
        summary: `This document appears to be a financial report containing detailed analysis of market trends, investment opportunities, and risk assessments. It includes comprehensive data on various asset classes including stocks, bonds, and alternative investments. The document emphasizes diversification strategies and long-term growth potential across different market sectors.`,
        keyPoints: [
          'Diversified portfolio allocation recommended across multiple asset classes',
          'Strong emphasis on risk management and hedging strategies',
          'Analysis of current market trends and future projections',
          'Detailed breakdown of investment performance metrics',
          'Recommendations for both conservative and aggressive investors',
        ],
      };

      createDocumentSession(file, mockAnalysis);
      toast.success('Document analyzed successfully');
    } catch (error) {
      toast.error('Failed to analyze document');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAskQuestion = async (): Promise<void> => {
    if (!question.trim() || !currentDocumentSession) return;

    const userQuestion = question.trim();
    setQuestion('');
    
    const userMessage: DocumentMessage = { role: 'user', content: userQuestion };
    addDocumentMessage(userMessage);
    
    setIsAsking(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockResponse = `Based on the document "${currentDocumentSession.fileName}", here's what I found regarding your question: "${userQuestion}"\n\nThe document suggests that ${userQuestion.toLowerCase().includes('risk') ? 'a balanced approach to risk management is crucial, with emphasis on diversification and regular portfolio rebalancing' : userQuestion.toLowerCase().includes('return') ? 'expected returns vary by asset class, with historical data showing 7-10% annual returns for diversified portfolios' : 'this information can be found in the detailed analysis section, which recommends consulting with a financial advisor for personalized guidance'}.`;

      const assistantMessage: DocumentMessage = { role: 'assistant', content: mockResponse };
      addDocumentMessage(assistantMessage);
    } catch (error) {
      toast.error('Failed to process question');
    } finally {
      setIsAsking(false);
    }
  };

  const handleNewDocument = (): void => {
    setUploadedFile(null);
    clearCurrentSession();
  };

  const handleLoadSession = (sessionId: string): void => {
    loadDocumentSession(sessionId);
    const session = documentSessions.find(s => s.id === sessionId);
    if (session) {
      setUploadedFile({ name: session.fileName });
    }
    setShowSessions(false);
  };

  const handleQuestionChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setQuestion(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAskQuestion();
    }
  };

  const handleDeleteSession = (e: React.MouseEvent<HTMLButtonElement>, sessionId: string, fileName: string): void => {
    e.stopPropagation();
    if (confirm(`Delete "${fileName}"?`)) {
      deleteDocumentSession(sessionId);
      toast.success('Document session deleted');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {!currentDocumentSession ? (
        <Card className="p-12">
          <div className="flex items-center justify-between mb-6">
            <h2>Document Analysis</h2>
            {documentSessions.length > 0 && (
              <div className="relative">
                <button
                  className="px-3 py-2 border border-border rounded-lg hover:bg-accent flex items-center gap-2 text-sm"
                  onClick={() => setShowSessions(!showSessions)}
                >
                  <History className="w-4 h-4" />
                  Saved Documents ({documentSessions.length})
                </button>
                {showSessions && (
                  <>
                    <div 
                      className="fixed inset-0 z-10"
                      onClick={() => setShowSessions(false)}
                    />
                    <div className="absolute right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-lg z-20 max-h-96 overflow-y-auto">
                      {documentSessions.map(session => (
                        <div
                          key={session.id}
                          className="px-4 py-3 hover:bg-accent border-b border-border last:border-0"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <button
                              className="flex-1 text-left"
                              onClick={() => handleLoadSession(session.id)}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <FileText className="w-4 h-4 text-blue-600" />
                                <span className="text-sm truncate">{session.fileName}</span>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {session.messages.length} questions • {new Date(session.updatedAt).toLocaleDateString()}
                              </div>
                            </button>
                            <button
                              className="p-1 hover:bg-destructive/10 text-destructive rounded"
                              onClick={(e) => handleDeleteSession(e, session.id, session.fileName)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/20'
                : 'border-border hover:border-blue-400'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="mb-2">Upload Financial Document</h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop your PDF here, or click to browse
            </p>
            <Button
              variant="outline"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0"
            >
              Select PDF File
            </Button>
          </div>
          
          <div className="mt-8">
            <h3 className="mb-4">What you can do:</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: 'Upload Documents', desc: 'Upload financial reports, statements, or research papers' },
                { title: 'Get AI Summary', desc: 'Receive instant AI-generated summaries and key insights' },
                { title: 'Ask Questions', desc: 'Chat with AI about your document content' },
              ].map((item, i) => (
                <Card key={i} className="p-4">
                  <h4 className="mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </Card>
      ) : (
        <>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3>{currentDocumentSession.fileName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {(currentDocumentSession.fileSize / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {documentSessions.length > 1 && (
                  <div className="relative">
                    <button
                      className="px-3 py-2 border border-border rounded-lg hover:bg-accent flex items-center gap-2 text-sm"
                      onClick={() => setShowSessions(!showSessions)}
                    >
                      <FolderOpen className="w-4 h-4" />
                      Other Docs
                    </button>
                    {showSessions && (
                      <>
                        <div 
                          className="fixed inset-0 z-10"
                          onClick={() => setShowSessions(false)}
                        />
                        <div className="absolute right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-lg z-20 max-h-96 overflow-y-auto">
                          {documentSessions.filter(s => s.id !== currentDocumentSession.id).map(session => (
                            <div
                              key={session.id}
                              className="px-4 py-3 hover:bg-accent border-b border-border last:border-0"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <button
                                  className="flex-1 text-left"
                                  onClick={() => handleLoadSession(session.id)}
                                >
                                  <div className="flex items-center gap-2 mb-1">
                                    <FileText className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm truncate">{session.fileName}</span>
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {session.messages.length} questions • {new Date(session.updatedAt).toLocaleDateString()}
                                  </div>
                                </button>
                                <button
                                  className="p-1 hover:bg-destructive/10 text-destructive rounded"
                                  onClick={(e) => handleDeleteSession(e, session.id, session.fileName)}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
                <Button
                  variant="outline"
                  onClick={handleNewDocument}
                >
                  Upload New
                </Button>
              </div>
            </div>

            {isAnalyzing ? (
              <div className="py-8 text-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Analyzing document...</p>
              </div>
            ) : currentDocumentSession.analysis ? (
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2">Document Summary</h4>
                  <p className="text-muted-foreground">{currentDocumentSession.analysis.summary}</p>
                </div>

                <div>
                  <h4 className="mb-3">Key Points</h4>
                  <div className="space-y-2">
                    {currentDocumentSession.analysis.keyPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-accent rounded-lg">
                        <Badge className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
                          {index + 1}
                        </Badge>
                        <p className="flex-1">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </Card>

          {currentDocumentSession.analysis && (
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <h3>Ask Questions About This Document</h3>
              </div>

              <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                {currentDocumentSession.messages.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      Ask any questions about the document content
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuestion('What are the main investment recommendations?')}
                      >
                        Investment Recommendations
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuestion('What are the key risk factors mentioned?')}
                      >
                        Risk Factors
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuestion('What is the expected return?')}
                      >
                        Expected Returns
                      </Button>
                    </div>
                  </div>
                ) : (
                  currentDocumentSession.messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-br from-blue-600 to-cyan-600'
                          : 'bg-muted'
                      }`}>
                        {msg.role === 'user' ? (
                          <MessageSquare className="w-4 h-4 text-white" />
                        ) : (
                          <FileText className="w-4 h-4" />
                        )}
                      </div>
                      <Card className={`p-4 flex-1 ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white'
                          : ''
                      }`}>
                        <p className={msg.role === 'user' ? 'text-white' : ''}>
                          {msg.content}
                        </p>
                      </Card>
                    </div>
                  ))
                )}
              </div>

              <div className="flex gap-2">
                <Textarea
                  value={question}
                  onChange={handleQuestionChange}
                  placeholder="Ask a question about the document..."
                  className="resize-none"
                  rows={2}
                  disabled={isAsking}
                  onKeyPress={handleKeyPress}
                />
                <Button
                  onClick={handleAskQuestion}
                  disabled={!question.trim() || isAsking}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}