import React from 'react';
import { useSelector } from 'react-redux';

export default function UrlHistory() {
  const { shortUrls } = useSelector((state) => state.url);

  if (!shortUrls || shortUrls.length === 0) {
    return null;
  }

  const handleCopy = (shortCode) => {
    const fullUrl = `http://localhost:3000/api/url/${shortCode}`;
    navigator.clipboard.writeText(fullUrl);
   
  };

  const getUrl = (shorturl) => {
    window.open(`http://localhost:3000/api/url/${shorturl}`, '_blank');
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 px-4 pb-20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Your Recent Links
        </h3>
        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {shortUrls.length} Total
        </span>
      </div>

      <div className="grid gap-4">
        {shortUrls.map((item, index) => (
          <div 
            key={index} 
            className="group relative bg-white border border-gray-100 rounded-2xl p-5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Link</p>
              </div>
              
              <div className="flex items-center gap-2">
                <h4 
                  onClick={() => getUrl(item.short_url)}
                  className="text-lg font-bold text-blue-600 hover:text-blue-800 cursor-pointer break-all transition-colors"
                >
                  {item.short_url}
                  <span className="text-gray-300 font-light mx-2">|</span>
                  <span className="text-sm font-medium text-gray-500 hover:underline">
                    {item.original_url?.substring(0, 40) || 'Original Link'}...
                  </span>
                </h4>
              </div>
              
              <p className="text-xs text-gray-400 mt-1 italic">
                Created: {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => getUrl(item.short_url)}
                className="p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                title="Visit Link"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>

              <button
                onClick={() => handleCopy(item.short_url)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 hover:bg-blue-600 hover:text-white text-gray-700 rounded-xl font-bold text-sm transition-all duration-300 group-hover:scale-105"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Copy
              </button>
            </div>

            <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/10 rounded-2xl pointer-events-none"></div>
          </div>
        ))}
      </div>
    </div>
  );
}