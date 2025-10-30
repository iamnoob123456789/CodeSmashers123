import React from 'react';
import { TrendingUp, MessageSquare, LineChart, Shield, Target, FileText, Newspaper, BarChart3, LucideIcon } from 'lucide-react';

interface HomeProps {
  onNavigate: (destination: string) => void;
}

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  action: string;
  color: string;
}

interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
}

export function Home({ onNavigate }: HomeProps): JSX.Element {
  const features: Feature[] = [
    {
      icon: MessageSquare,
      title: 'AI Chatbot',
      description: 'Get instant answers to your financial questions with context-aware AI',
      action: 'chat',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Target,
      title: 'Risk Assessment',
      description: 'Discover your investor profile with our adaptive quiz',
      action: 'risk-quiz',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: LineChart,
      title: 'Stock Analysis',
      description: 'Track stocks, crypto, and forex with AI-powered insights',
      action: 'stocks',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Newspaper,
      title: 'Market News',
      description: 'Stay updated with the latest financial news and trends',
      action: 'news',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: FileText,
      title: 'Document Analysis',
      description: 'Upload and analyze financial documents with AI',
      action: 'documents',
      color: 'from-cyan-500 to-cyan-600',
    },
  ];

  const stats: Stat[] = [
    { label: 'Markets Covered', value: '4+', icon: BarChart3 },
    { label: 'AI Features', value: '5+', icon: MessageSquare },
    { label: 'Asset Classes', value: '1000+', icon: TrendingUp },
  ];

  const handleFeatureClick = (action: string): void => {
    onNavigate(action);
  };

  const handleStartChatting = (): void => {
    onNavigate('chat');
  };

  const handleLearnMore = (): void => {
    onNavigate('about');
  };

  const handleGetStarted = (): void => {
    onNavigate('chat');
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950">
      {/* Hero Section */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl mb-6 shadow-xl">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Welcome to FinChat
          </h1>
          
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
            Your comprehensive AI-powered financial assistant. Make smarter investment decisions 
            with real-time data, personalized insights, and intelligent analysis.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={handleStartChatting}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              Start Chatting
            </button>
            <button
              onClick={handleLearnMore}
              className="px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-border"
                >
                  <Icon className="w-8 h-8 text-blue-600 mb-3" />
                  <div className="text-3xl mb-1 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-12">Powerful Features at Your Fingertips</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleFeatureClick(feature.action)}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all border border-border text-left group hover:scale-105"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-12 text-center text-white shadow-2xl">
            <h2 className="text-white mb-4">
              Ready to Elevate Your Investment Strategy?
            </h2>
            <p className="text-white/90 mb-6 text-lg">
              Start using FinChat's AI-powered tools to make informed financial decisions.
            </p>
            <button
              onClick={handleGetStarted}
              className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all shadow-lg"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}