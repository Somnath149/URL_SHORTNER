import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { signin } from '../api/authApi';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth);
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    Email: '',
    Password: '',
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (userData) {
      navigate('/');
    }
  }, [userData, navigate]);

  const validateForm = () => {
    const errors = {};
    if (!formData.Email.trim()) {
      errors.Email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)) {
      errors.Email = 'Invalid email format';
    }

    if (!formData.Password) {
      errors.Password = 'Password is required';
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await signin(formData);
      dispatch(setUserData(response));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to sign in. Please try again.');
      console.error('Signin error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-2xl shadow-blue-100 border border-gray-100">
        
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-500">Enter your credentials to access your dashboard</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl animate-shake">
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      
          <div className="relative">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
            <input
              name="Email"
              type="email"
              value={formData.Email}
              onChange={handleChange}
              className={`block w-full px-4 py-3 mt-1 bg-gray-50 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none ${
                validationErrors.Email ? 'border-red-400' : 'border-gray-100 focus:border-blue-500'
              }`}
              placeholder="name@example.com"
            />
            {validationErrors.Email && (
              <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{validationErrors.Email}</p>
            )}
          </div>

          <div className="relative">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Password</label>
              <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-500">Forgot?</a>
            </div>
            <input
              name="Password"
              type="password"
              value={formData.Password}
              onChange={handleChange}
              className={`block w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none ${
                validationErrors.Password ? 'border-red-400' : 'border-gray-100 focus:border-blue-500'
              }`}
              placeholder="••••••••"
            />
            {validationErrors.Password && (
              <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{validationErrors.Password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all transform active:scale-[0.98] disabled:bg-gray-400 disabled:transform-none"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </div>
            ) : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          New to URLSnap?{' '}
          <Link to="/signup" className="font-bold text-blue-600 hover:text-blue-500 transition-colors">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;