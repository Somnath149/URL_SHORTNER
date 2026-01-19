import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addShortUrl, clearError, setSU } from '../redux/urlSlice';
import { createShortUrl } from '../api/urlApi';

export default function UrlInput() {
    const [url, setUrl] = useState('');
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.url);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!url.trim()) return;

        const data = await createShortUrl(url);
        dispatch(setSU(data.short_url));  
        dispatch(addShortUrl(data));
        setUrl('');
    };

    const handleInputChange = (e) => {
        setUrl(e.target.value);
        if (error) dispatch(clearError());
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4">
            <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] p-8 md:p-12 border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative group">
                        <label
                            htmlFor="url"
                            className="block text-sm font-bold text-gray-500 mb-3 uppercase tracking-widest ml-1"
                        >
                            Enter your long URL
                        </label>

                        <div className="relative flex items-center">
                         
                            <div className="absolute left-4 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                            </div>

                            <input
                                id="url"
                                type="url"
                                value={url}
                                onChange={handleInputChange}
                                placeholder="https://example.com/very/long/url"
                                className="w-full pl-12 pr-4 py-5 bg-gray-50 border-2 border-gray-100 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-lg"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-center gap-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl animate-shake">
                            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <p className="text-red-700 text-sm font-medium">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full overflow-hidden bg-blue-600 disabled:bg-gray-400 text-white font-bold py-5 rounded-2xl transition-all duration-300 shadow-lg shadow-blue-200 hover:shadow-blue-400 hover:-translate-y-1 active:translate-y-0"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Shorten URL
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </>
                            )}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400 text-xs">
                    By clicking Shorten, you agree to our <span className="underline cursor-pointer hover:text-blue-500 transition-colors">Terms of Service</span>.
                </p>
            </div>
        </div>
    );
}