import React, { useState } from 'react';
import { MessageSquare, Target, LineChart, Newspaper, FileText, Menu, X, Home, Info, LucideIcon } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const menuItems: MenuItem[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'chat', label: 'Chatbot', icon: MessageSquare },
    { id: 'risk-quiz', label: 'Risk Quiz', icon: Target },
    { id: 'stocks', label: 'Stock Quotes', icon: LineChart },
    { id: 'news', label: 'Market News', icon: Newspaper },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'about', label: 'About', icon: Info },
  ];

  const handleNavigate = (page: string): void => {
    onNavigate(page);
    setIsOpen(false);
  };

  const handleToggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  const handleCloseMenu = (): void => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="fixed left-4 top-20 z-40 lg:hidden bg-background shadow-md p-2 rounded-lg border border-border hover:bg-accent"
        onClick={handleToggleMenu}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={handleCloseMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 w-64 bg-card border-r border-border z-40 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 space-y-2">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-700 dark:to-cyan-700 text-white shadow-md'
                    : 'hover:bg-accent text-foreground'
                }`}
                onClick={() => handleNavigate(item.id)}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
}