import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Search, TrendingUp, TrendingDown, BarChart3, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

export function StockQuotes() {
  const [symbol, setSymbol] = useState('');
  const [marketType, setMarketType] = useState('us-stocks');
  const [stockData, setStockData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSentiment, setShowSentiment] = useState(false);

  const marketExamples = {
    'us-stocks': ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'AMZN'],
    'eu-stocks': ['VOD.L', 'BP.L', 'SAP', 'SIE.DE', 'AIR.PA'],
    'crypto': ['BTC', 'ETH', 'SOL', 'ADA', 'DOT'],
    'forex': ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD'],
  };

  const generateMockData = (symbol, type) => {
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
      setShowSentiment(false);
    } catch (error) {
      console.error('Error fetching stock data:', error);
      toast.error('Failed to fetch stock data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarketTypeChange = (value) => {
    setMarketType(value);
    setSymbol('');
    setStockData(null);
  };

  const handleExampleClick = (exampleSymbol) => {
    setSymbol(exampleSymbol);
  };

  const getChangeColor = (change) => {
    const num = parseFloat(change);
    if (num > 0) return 'text-green-500';
    if (num < 0) return 'text-red-500';
    return 'text-gray-500';
  };

  const getChangeIcon = (change) => {
    const num = parseFloat(change);
    if (num > 0) return <TrendingUp className="h-4 w-4" />;
    if (num < 0) return <TrendingDown className="h-4 w-4" />;
    return null;
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="flex-1 space-y-2">
            <div className="flex items-center space-x-2">
              <Select value={marketType} onValueChange={handleMarketTypeChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Market Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us-stocks">US Stocks</SelectItem>
                  <SelectItem value="eu-stocks">EU Stocks</SelectItem>
                  <SelectItem value="crypto">Cryptocurrency</SelectItem>
                  <SelectItem value="forex">Forex</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={
                    marketType === 'us-stocks' ? 'e.g., AAPL, MSFT' :
                    marketType === 'eu-stocks' ? 'e.g., VOD.L, BP.L' :
                    marketType === 'crypto' ? 'e.g., BTC, ETH' :
                    'e.g., EUR/USD, GBP/USD'
                  }
                  className="pl-8"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                {symbol && (
                  <X
                    className="absolute right-2.5 top-2.5 h-4 w-4 cursor-pointer text-muted-foreground"
                    onClick={() => setSymbol('')}
                  />
                )}
              </div>
              <Button onClick={handleSearch} disabled={isLoading || !symbol.trim()}>
                {isLoading ? 'Searching...' : 'Search'}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span>Examples:</span>
              {marketExamples[marketType]?.map((example) => (
                <span
                  key={example}
                  className="cursor-pointer text-blue-500 hover:underline"
                  onClick={() => handleExampleClick(example)}
                >
                  {example}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {stockData && (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-2xl font-bold">{stockData.symbol}</h2>
                  <span className="text-muted-foreground">{stockData.name}</span>
                </div>
                <div className="mt-1 flex items-center space-x-2">
                  <span className="text-3xl font-bold">${stockData.price}</span>
                  <div className={`flex items-center ${getChangeColor(stockData.change)}`}>
                    {getChangeIcon(stockData.change)}
                    <span className="ml-1">
                      {stockData.change} ({stockData.changePercent}%)
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Badge
                  variant={stockData.recommendation === 'SELL' ? 'destructive' : 
                          stockData.recommendation === 'BUY' ? 'default' : 'secondary'}
                  className="text-sm"
                >
                  {stockData.recommendation}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSentiment(!showSentiment)}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  {showSentiment ? 'Hide' : 'Show'} Sentiment
                </Button>
              </div>
            </div>

            <div className="mt-6 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stockData.historicalData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getMonth() + 1}/${date.getDate()}`;
                    }}
                  />
                  <YAxis 
                    domain={['auto', 'auto']} 
                    width={50}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Price']}
                    labelFormatter={(value) => `Date: ${value}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {showSentiment && (
            <Card className="p-6">
              <h3 className="mb-4 text-lg font-semibold">Market Sentiment</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border p-4">
                  <div className="text-sm text-muted-foreground">Overall</div>
                  <div className="text-2xl font-bold">{stockData.sentiment.overall}/100</div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="text-sm text-muted-foreground">Bullish</div>
                  <div className="text-2xl font-bold text-green-500">{stockData.sentiment.bullish}%</div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="text-sm text-muted-foreground">Bearish</div>
                  <div className="text-2xl font-bold text-red-500">{stockData.sentiment.bearish}%</div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="text-sm text-muted-foreground">Mentions (24h)</div>
                  <div className="text-2xl font-bold">{stockData.sentiment.mentions.toLocaleString()}</div>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="mb-2 font-medium">Sentiment by Source</h4>
                <div className="grid gap-4 md:grid-cols-3">
                  {Object.entries(stockData.sentiment.sources).map(([source, score]) => (
                    <div key={source} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize">{source.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="font-medium">{score}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                        <div 
                          className="h-full bg-blue-500" 
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <h4 className="mb-2 font-medium">AI Analysis</h4>
                <div className="rounded-lg bg-muted/50 p-4 text-sm">
                  {stockData.aiAdvice}
                </div>
              </div>
            </Card>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <h3 className="mb-4 text-lg font-semibold">Key Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Market Cap</span>
                  <span className="font-medium">{stockData.marketCap}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Volume (24h)</span>
                  <span className="font-medium">{parseInt(stockData.volume).toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">52-Week High</span>
                  <span className="font-medium">${(parseFloat(stockData.price) * 1.2).toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">52-Week Low</span>
                  <span className="font-medium">${(parseFloat(stockData.price) * 0.8).toFixed(2)}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4 text-lg font-semibold">About {stockData.symbol}</h3>
              <p className="text-muted-foreground">
                {stockData.name} is a leading company in the {stockData.marketType === 'crypto' ? 'cryptocurrency' : stockData.marketType === 'forex' ? 'foreign exchange' : stockData.marketType} market. 
                {stockData.recommendation === 'BUY' || stockData.recommendation === 'STRONG BUY' 
                  ? 'Analysts are generally positive about its growth prospects and market position.'
                  : stockData.recommendation === 'SELL'
                  ? 'Investors should exercise caution and review their positions carefully.'
                  : 'The stock is currently trading within its expected range with neutral sentiment.'}
              </p>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="mr-2">
                  Company Website
                </Button>
                <Button variant="outline" size="sm" className="mr-2">
                  SEC Filings
                </Button>
                <Button variant="outline" size="sm">
                  Analyst Coverage
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

StockQuotes.propTypes = {
  // Add any prop types if needed
};
