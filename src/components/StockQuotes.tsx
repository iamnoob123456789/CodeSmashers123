import React, { useState } from 'react';
import { Search, TrendingUp, TrendingDown, BarChart3, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

type MarketType = 'us-stocks' | 'eu-stocks' | 'crypto' | 'forex';

export function StockQuotes() {
  const [symbol, setSymbol] = useState('');
  const [marketType, setMarketType] = useState<MarketType>('us-stocks');
  const [stockData, setStockData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSentiment, setShowSentiment] = useState(false);

  const marketExamples = {
    'us-stocks': ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'AMZN'],
    'eu-stocks': ['VOD.L', 'BP.L', 'SAP', 'SIE.DE', 'AIR.PA'],
    'crypto': ['BTC', 'ETH', 'SOL', 'ADA', 'DOT'],
    'forex': ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD'],
  };

  const generateMockData = (symbol: string, type: MarketType) => {
    const basePrice = Math.random() * 1000 + 50;
    const change = (Math.random() - 0.5) * 10;
    const changePercent = (change / basePrice) * 100;

    const historicalData = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      price: basePrice + (Math.random() - 0.5) * 50,
    }));

    let aiAdvice = '';
    let recommendation = '';
    let sentimentScore = 0;

    if (changePercent > 2) {
      recommendation = 'STRONG BUY';
      sentimentScore = 75 + Math.random() * 20;
      aiAdvice = `${symbol} shows strong upward momentum with a ${changePercent.toFixed(2)}% gain. Technical indicators suggest continued growth potential. Consider accumulating positions on minor dips.`;
    } else if (changePercent > 0) {
      recommendation = 'BUY';
      sentimentScore = 55 + Math.random() * 20;
      aiAdvice = `${symbol} displays positive momentum. The current trend suggests good entry opportunities for long-term positions. Monitor support levels.`;
    } else if (changePercent > -2) {
      recommendation = 'HOLD';
      sentimentScore = 40 + Math.random() * 20;
      aiAdvice = `${symbol} is trading relatively flat. Current market conditions suggest maintaining existing positions while watching for clear directional signals.`;
    } else {
      recommendation = 'SELL';
      sentimentScore = 15 + Math.random() * 25;
      aiAdvice = `${symbol} shows bearish tendencies with a ${Math.abs(changePercent).toFixed(2)}% decline. Consider reducing exposure or implementing stop-loss strategies.`;
    }

    // Generate sentiment data
    const sentiment = {
      overall: sentimentScore.toFixed(0),
      bullish: Math.min(95, Math.max(5, sentimentScore + (Math.random() - 0.5) * 20)).toFixed(0),
      bearish: Math.min(95, Math.max(5, 100 - sentimentScore + (Math.random() - 0.5) * 20)).toFixed(0),
      neutral: Math.min(50, Math.max(5, 50 + (Math.random() - 0.5) * 30)).toFixed(0),
      sources: {
        socialMedia: Math.min(95, Math.max(5, sentimentScore + (Math.random() - 0.5) * 30)).toFixed(0),
        news: Math.min(95, Math.max(5, sentimentScore + (Math.random() - 0.5) * 25)).toFixed(0),
        analysts: Math.min(95, Math.max(5, sentimentScore + (Math.random() - 0.5) * 20)).toFixed(0),
      },
      mentions: Math.floor(Math.random() * 50000) + 1000,
      trending: Math.random() > 0.5,
    };

    return {
      symbol,
      name: `${symbol} ${type === 'crypto' ? 'Cryptocurrency' : type === 'forex' ? 'Currency Pair' : 'Stock'}`,
      price: basePrice.toFixed(2),
      change: change.toFixed(2),
      changePercent: changePercent.toFixed(2),
      marketType: type,
      historicalData,
      aiAdvice,
      recommendation,
      volume: (Math.random() * 10000000).toFixed(0),
      marketCap: type === 'crypto' ? `$${(Math.random() * 1000).toFixed(2)}B` : `$${(Math.random() * 500).toFixed(2)}B`,
      sentiment,
    };
  };

  const handleSearch = async () => {
    if (!symbol.trim()) {
      toast.error('Please enter a symbol');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      const data = generateMockData(symbol.toUpperCase(), marketType);
      setStockData(data);
      toast.success('Stock data loaded');
    } catch (error) {
      toast.error('Failed to fetch stock data');
    } finally {
      setIsLoading(false);
    }
  };

  const getRecommendationColor = (rec: string) => {
    if (rec.includes('BUY')) return 'bg-green-600 text-white';
    if (rec === 'HOLD') return 'bg-yellow-600 text-white';
    return 'bg-red-600 text-white';
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <Card className="p-6">
        <h2 className="mb-4">Stock & Asset Search</h2>
        
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Enter symbol (e.g., AAPL, BTC, EUR/USD)"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Select value={marketType} onValueChange={(v) => setMarketType(v as MarketType)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us-stocks">US Stocks (NYSE/NASDAQ)</SelectItem>
              <SelectItem value="eu-stocks">European Stocks (FTSE/DAX)</SelectItem>
              <SelectItem value="crypto">Cryptocurrency</SelectItem>
              <SelectItem value="forex">Forex (Currency Pairs)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 mb-4 flex-wrap">
          <span className="text-sm text-muted-foreground">Quick search:</span>
          {marketExamples[marketType].map((example) => (
            <Button
              key={example}
              variant="outline"
              size="sm"
              onClick={() => {
                setSymbol(example);
                setTimeout(() => handleSearch(), 100);
              }}
            >
              {example}
            </Button>
          ))}
        </div>

        <Button
          onClick={handleSearch}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
        >
          <Search className="w-4 h-4 mr-2" />
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </Card>

      {stockData && (
        <>
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="mb-1">{stockData.symbol}</h2>
                <p className="text-muted-foreground">{stockData.name}</p>
              </div>
              <Badge className={getRecommendationColor(stockData.recommendation)}>
                {stockData.recommendation}
              </Badge>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="text-2xl">${stockData.price}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Change</p>
                <p className={`text-2xl flex items-center gap-2 ${
                  parseFloat(stockData.change) >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {parseFloat(stockData.change) >= 0 ? (
                    <TrendingUp className="w-5 h-5" />
                  ) : (
                    <TrendingDown className="w-5 h-5" />
                  )}
                  {stockData.changePercent}%
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Volume</p>
                <p className="text-xl">{stockData.volume}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Market Cap</p>
                <p className="text-xl">{stockData.marketCap}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-4">30-Day Price Chart</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stockData.historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-6 rounded-lg">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="mb-2">AI Investment Advice</h3>
                  <p className="text-muted-foreground">{stockData.aiAdvice}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                * This is simulated AI advice for demonstration purposes. Always conduct your own research and consult with financial advisors before making investment decisions.
              </p>
            </div>

            <Button
              onClick={() => setShowSentiment(true)}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              View Sentiment Analysis
            </Button>
          </Card>

          {/* Sentiment Analysis Modal */}
          {showSentiment && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowSentiment(false)}>
              <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2>Sentiment Analysis</h2>
                        <p className="text-sm text-muted-foreground">{stockData.symbol}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowSentiment(false)}
                      className="p-2 hover:bg-accent rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Overall Sentiment */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-6 rounded-lg">
                      <h3 className="mb-3">Overall Sentiment Score</h3>
                      <div className="flex items-end gap-4">
                        <div className="text-5xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                          {stockData.sentiment.overall}%
                        </div>
                        <div className="flex-1">
                          <div className="w-full h-4 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 transition-all duration-500"
                              style={{ width: `${stockData.sentiment.overall}%` }}
                            />
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            {stockData.sentiment.trending && '🔥 Trending now • '}
                            {stockData.sentiment.mentions.toLocaleString()} mentions across platforms
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Sentiment Breakdown */}
                    <div>
                      <h3 className="mb-4">Sentiment Breakdown</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 border border-border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Bullish</span>
                            <span className="text-green-600">{stockData.sentiment.bullish}%</span>
                          </div>
                          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-600 transition-all duration-500"
                              style={{ width: `${stockData.sentiment.bullish}%` }}
                            />
                          </div>
                        </div>
                        <div className="p-4 border border-border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Bearish</span>
                            <span className="text-red-600">{stockData.sentiment.bearish}%</span>
                          </div>
                          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-red-600 transition-all duration-500"
                              style={{ width: `${stockData.sentiment.bearish}%` }}
                            />
                          </div>
                        </div>
                        <div className="p-4 border border-border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Neutral</span>
                            <span className="text-yellow-600">{stockData.sentiment.neutral}%</span>
                          </div>
                          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-600 transition-all duration-500"
                              style={{ width: `${stockData.sentiment.neutral}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sentiment by Source */}
                    <div>
                      <h3 className="mb-4">Sentiment by Source</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm">Social Media</span>
                            <span className="text-sm bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                              {stockData.sentiment.sources.socialMedia}%
                            </span>
                          </div>
                          <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 transition-all duration-500"
                              style={{ width: `${stockData.sentiment.sources.socialMedia}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm">News Articles</span>
                            <span className="text-sm bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                              {stockData.sentiment.sources.news}%
                            </span>
                          </div>
                          <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 transition-all duration-500"
                              style={{ width: `${stockData.sentiment.sources.news}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm">Analyst Reports</span>
                            <span className="text-sm bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                              {stockData.sentiment.sources.analysts}%
                            </span>
                          </div>
                          <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 transition-all duration-500"
                              style={{ width: `${stockData.sentiment.sources.analysts}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground">
                        * Sentiment analysis is based on simulated data aggregated from social media, news sources, and analyst reports.
                        This is for demonstration purposes only and should not be used as the sole basis for investment decisions.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
}
