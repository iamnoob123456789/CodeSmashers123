import React from 'react';
import { TrendingUp, Target, Zap, Shield, Globe, Users } from 'lucide-react';

export function About() {
  const values = [
    {
      icon: Target,
      title: 'Precision',
      description: 'Accurate market data and AI-driven insights you can trust',
    },
    {
      icon: Zap,
      title: 'Speed',
      description: 'Real-time analysis and instant responses to your queries',
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Your data and privacy are our top priorities',
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Access to US, European, crypto, and forex markets',
    },
  ];

  const features = [
    {
      title: 'Multi-Market Support',
      description: 'Track and analyze assets across US stocks (NYSE/NASDAQ), European stocks (FTSE/DAX), cryptocurrencies, and forex currency pairs all in one platform.',
    },
    {
      title: 'AI-Powered Insights',
      description: 'Our advanced AI analyzes market trends, provides buy/sell/hold recommendations, and answers your financial questions with context-aware responses.',
    },
    {
      title: 'Risk Assessment',
      description: 'Take our adaptive risk quiz to understand your investor profile and receive personalized investment strategy recommendations.',
    },
    {
      title: 'Document Analysis',
      description: 'Upload financial documents and get AI-generated summaries, key insights, and the ability to ask questions about the content.',
    },
    {
      title: 'Market News Integration',
      description: 'Stay informed with curated financial news from trusted sources, with the ability to ask our AI for deeper analysis.',
    },
    {
      title: 'Session Management',
      description: 'Save your chat conversations and return to them anytime, maintaining context across multiple sessions.',
    },
  ];

  return (
    <div className="min-h-full bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950">
      {/* Hero Section */}
      <section className="px-4 py-16 border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl mb-6 shadow-xl">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            About FinChat
          </h1>
          
          <p className="text-muted-foreground text-lg leading-relaxed">
            FinChat is an AI-powered financial assistant designed to help investors make smarter, 
            data-driven decisions. We combine cutting-edge artificial intelligence with comprehensive 
            market coverage to provide personalized insights, real-time analysis, and intelligent 
            financial guidance.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-border">
            <h2 className="mb-4 text-center">Our Mission</h2>
            <p className="text-muted-foreground text-lg leading-relaxed text-center">
              To democratize access to sophisticated financial analysis and make professional-grade 
              investment insights available to everyone. We believe that with the right tools and 
              information, anyone can become a confident, successful investor.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-4 py-16 bg-white/50 dark:bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-12">Our Values</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-border text-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-12">What We Offer</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-border hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white mt-1">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="px-4 py-16 bg-white/50 dark:bg-gray-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-8">Powered by Advanced Technology</h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-border">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="mb-3">AI & Machine Learning</h3>
                <p className="text-muted-foreground">
                  Our AI engine processes vast amounts of financial data to provide intelligent 
                  insights, pattern recognition, and predictive analysis.
                </p>
              </div>
              
              <div>
                <h3 className="mb-3">Real-Time Data</h3>
                <p className="text-muted-foreground">
                  Integration with leading financial data providers ensures you always have 
                  access to the latest market information.
                </p>
              </div>
              
              <div>
                <h3 className="mb-3">Natural Language Processing</h3>
                <p className="text-muted-foreground">
                  Ask questions in plain English and get contextual, accurate responses tailored 
                  to your specific needs.
                </p>
              </div>
              
              <div>
                <h3 className="mb-3">Document Intelligence</h3>
                <p className="text-muted-foreground">
                  Advanced PDF parsing and analysis capabilities extract key information from 
                  complex financial documents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl mb-6">
            <Users className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="mb-4">Built by Financial Experts</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            FinChat is developed by a team of financial analysts, data scientists, and engineers 
            who are passionate about making sophisticated investment tools accessible to everyone. 
            Our diverse expertise ensures that FinChat delivers both technical excellence and 
            practical financial insights.
          </p>
          
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-8 text-white shadow-xl">
            <p className="text-lg">
              Join thousands of investors who are already making smarter decisions with FinChat.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-4 py-8 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Disclaimer:</strong> FinChat provides educational information and AI-generated insights 
            for informational purposes only. This is not financial advice. Always conduct your own research 
            and consult with qualified financial advisors before making investment decisions. Past performance 
            does not guarantee future results.
          </p>
        </div>
      </section>
    </div>
  );
}
