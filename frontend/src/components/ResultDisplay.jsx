import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCurrentUrl } from '../redux/urlSlice';

export default function ResultDisplay() {
  const { sU } = useSelector((state) => state.url);
  const dispatch = useDispatch();
  const [copied, setCopied] = useState(false);

  if (!sU) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(sU);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    dispatch(clearCurrentUrl());
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-3xl p-6 md:p-8 shadow-xl shadow-emerald-900/5">
        
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-emerald-200/30 rounded-full blur-2xl"></div>
        
        <div className="relative">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500 rounded-full p-1.5">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-emerald-900 tracking-tight">Success! Your link is ready.</h3>
            </div>
            
            <button
              onClick={handleClose}
              className="p-1 rounded-lg hover:bg-emerald-200/50 text-emerald-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div className="group relative">
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-2 ml-1">Shortened URL</p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    readOnly
                    value={sU}
                    className="w-full px-5 py-4 bg-white/80 backdrop-blur-sm border-2 border-emerald-100 rounded-2xl text-emerald-900 font-medium text-lg focus:outline-none focus:border-emerald-400 transition-all shadow-inner"
                  />
                  <div className="absolute inset-0 rounded-2xl pointer-events-none group-hover:ring-4 ring-emerald-400/10 transition-all"></div>
                </div>

                <button
                  onClick={handleCopy}
                  className={`relative overflow-hidden px-8 py-4 rounded-2xl font-bold text-white transition-all duration-300 transform active:scale-95 shadow-lg ${
                    copied 
                    ? 'bg-emerald-500 shadow-emerald-200' 
                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {copied ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-3 8h3m-3 4h3" />
                        </svg>
                        Copy Link
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-emerald-700/70 text-sm italic ml-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Tip: You can now share this link anywhere on social media.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}