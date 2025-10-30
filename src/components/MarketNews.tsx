import React from 'react';

const MarketNews: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Market News</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder for news articles */}
        <div className="p-4 border rounded-lg shadow">
          <h3 className="font-semibold mb-2">Market Update</h3>
          <p className="text-sm text-gray-600">Latest market trends and analysis.</p>
        </div>
      </div>
    </div>
  );
};

export default MarketNews;
