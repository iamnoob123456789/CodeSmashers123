import React from 'react';
import { TrendingUp, MessageSquare, LineChart, Shield, ArrowRight } from 'lucide-react';

export function Landing({ onNavigate }) {
  const features = [
    {
      icon: MessageSquare,
      title: 'AI-Powered Chat',
      description: 'Get instant answers to your financial questions with our intelligent chatbot.',
    },
    {
      icon: LineChart,
      title: 'Multi-Market Coverage',
      description: 'Track US stocks, European markets, cryptocurrencies, and forex in one place.',
    },
    {
      icon: Shield,
      title: 'Risk Assessment',
      description: 'Discover your investor profile with our adaptive risk quiz.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:from-gray-900 dark:via-blue-950 dark:to-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-7 h-7 text-blue-600" />
            <span className="text-blue-600 dark:text-blue-400">FinChat</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="px-4 py-2 rounded-lg hover:bg-accent transition-colors"
              onClick={() => onNavigate('login')}
            >
              Login
            </button>
            <button
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all"
              onClick={() => onNavigate('signup')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl mb-6 shadow-lg">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-blue-900 dark:text-white mb-4">
            Your AI Financial Assistant
          </h1>
          
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Make smarter investment decisions with AI-powered insights, real-time market data, 
            and personalized financial guidance across global markets.
          </p>
          
          <button
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
            onClick={() => onNavigate('signup')}
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-center text-foreground mb-12">
            Everything You Need for Smart Investing
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow border border-border">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="p-12 text-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl shadow-xl">
            <h2 className="text-white mb-4">
              Ready to Transform Your Investment Strategy?
            </h2>
            <p className="text-white/90 mb-6">
              Join thousands of investors making smarter decisions with FinChat.
            </p>
            <button
              className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all shadow-lg"
              onClick={() => onNavigate('signup')}
            >
              Create Free Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
