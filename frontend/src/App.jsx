import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Header from './components/Header'
import UrlInput from './components/UrlInput'
import ResultDisplay from './components/ResultDisplay'
import UrlHistory from './components/UrlHistory'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import { useEffect } from 'react'
import { getCurrentUser, getUrlByUser } from './api/authApi'
import { setUserData } from './redux/authSlice'
import { setShortUrls } from './redux/urlSlice'

function App() {
  const {userData} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          dispatch(setUserData(user));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [dispatch]);

  useEffect(() => {
    const fetchUserUrls = async () => {
      if (!userData) return;
      try {
        const urls = await getUrlByUser();
        if (urls) {
          dispatch(setShortUrls(urls));
        }
      } catch (error) {
        console.error("Error fetching URLs:", error);
      }
    };

    fetchUserUrls();
  }, [userData, dispatch]);

  return (
    <Router>
      <div className='min-h-screen bg-gray-50'>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/"
            element={
              userData ? (
                <>
                  <Header />
                  <main className='max-w-4xl mx-auto px-4 pb-12'>
                    <div className='flex justify-center'>
                      <div className='w-full max-w-md'>
                        <UrlInput />
                        <ResultDisplay />
                      </div>
                    </div>
                    <UrlHistory />
                  </main>
                </>
              ) : (
                <Navigate to="/signup" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
