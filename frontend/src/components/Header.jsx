import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/authApi';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      navigate('/signin');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="relative bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 text-white shadow-2xl">
    
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <div className="relative max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
            <div className="bg-white p-2 rounded-xl shadow-lg">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="螺旋 13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              URL<span className="text-cyan-200">Snap</span>
            </h1>
          </div>
          <p className="text-blue-100 text-lg font-light max-w-md">
            Transform bulky links into sleek, powerful short URLs in seconds.
          </p>
        </div>

        {userData ? (
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl">
            <div className="hidden sm:block text-right">
              <p className="text-xs text-blue-200 uppercase tracking-widest font-semibold">Welcome back</p>
              <p className="text-lg font-bold text-white">{userData.Username}</p>
            </div>
            
            <div className="h-12 w-[1px] bg-white/20 hidden sm:block"></div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-rose-600 hover:to-red-700 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-red-900/20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        ) : (
          <button 
            onClick={() => navigate('/signin')}
            className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-cyan-50 transition-colors shadow-lg"
          >
            Sign In
          </button>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 320" className="w-full h-12 fill-gray-50">
          <path d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </header>
  );
}