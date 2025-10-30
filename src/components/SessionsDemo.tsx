import React from 'react';
import { History, Check, FileText, MessageSquare } from 'lucide-react';
import { Card } from './ui/card';

export function SessionsDemo(): JSX.Element {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full mb-4">
          <History className="w-8 h-8 text-white" />
        </div>
        <h2 className="mb-2">Session Management</h2>
        <p className="text-muted-foreground">
          All your conversations and documents are automatically saved
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Chatbot Sessions */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3>Chatbot Sessions</h3>
              <p className="text-sm text-muted-foreground">Saved chat conversations</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm">Automatic saving of all conversations</p>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm">Rename sessions for easy organization</p>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm">Switch between multiple chat sessions</p>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm">Delete old sessions when no longer needed</p>
            </div>
          </div>

          <div className="mt-6 p-3 bg-accent rounded-lg">
            <p className="text-xs text-muted-foreground">
              💡 <span>Click the "Sessions" button in the Chatbot to access all your saved conversations</span>
            </p>
          </div>
        </Card>

        {/* Document Sessions */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3>Document Sessions</h3>
              <p className="text-sm text-muted-foreground">Analyzed documents</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm">Save document analysis and summaries</p>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm">Keep Q&A history for each document</p>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm">Quick access to previously analyzed files</p>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm">Manage and delete document sessions</p>
            </div>
          </div>

          <div className="mt-6 p-3 bg-accent rounded-lg">
            <p className="text-xs text-muted-foreground">
              💡 <span>View "Saved Documents" button in the Documents tab to access previous analyses</span>
            </p>
          </div>
        </Card>
      </div>

      {/* How to Access */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
        <h3 className="mb-4">How to Access Your Sessions</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">
              1
            </div>
            <div>
              <p className="text-sm">Go to the <span className="font-medium">Chatbot</span> or <span className="font-medium">Documents</span> page</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">
              2
            </div>
            <div>
              <p className="text-sm">Look for the "Sessions" or "Saved Documents" button at the top</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">
              3
            </div>
            <div>
              <p className="text-sm">Click to view all your saved sessions and select one to load</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}