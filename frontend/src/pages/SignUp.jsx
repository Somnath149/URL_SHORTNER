import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../api/authApi';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userData } = useSelector((state) => state.auth);
    
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        Username: '',
        Email: '',
        Password: '',
        confirmPassword: '',
    });
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        if (userData) navigate('/');
    }, [userData, navigate]);

    const validateForm = () => {
        const errors = {};
        if (!formData.Username.trim()) errors.Username = 'Username is required';
        else if (formData.Username.length < 3) errors.Username = 'At least 3 characters';

        if (!formData.Email.trim()) errors.Email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)) errors.Email = 'Invalid email';

        if (!formData.Password) errors.Password = 'Password is required';
        else if (formData.Password.length < 6) errors.Password = 'At least 6 characters';

        if (formData.Password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
        
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (validationErrors[name]) setValidationErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) return setValidationErrors(errors);

        setLoading(true);
        try {
            const response = await signup({
                Username: formData.Username,
                Email: formData.Email,
                Password: formData.Password,
            });
            dispatch(setUserData(response));
            navigate('/');
        } catch (err) {
            console.error('Signup error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-2xl shadow-blue-100 border border-gray-100">
                
                <div className="text-center">
                    <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Create Account</h2>
                    <p className="mt-2 text-sm text-gray-500">Join us to start shortening your links</p>
                </div>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                
                    <div className="relative">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Username</label>
                        <input
                            name="Username"
                            type="text"
                            value={formData.Username}
                            onChange={handleChange}
                            className={`block w-full px-4 py-3 mt-1 bg-gray-50 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none ${
                                validationErrors.Username ? 'border-red-400' : 'border-gray-100 focus:border-blue-500'
                            }`}
                            placeholder="JohnDoe"
                        />
                        {validationErrors.Username && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{validationErrors.Username}</p>}
                    </div>

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
                            placeholder="name@company.com"
                        />
                        {validationErrors.Email && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{validationErrors.Email}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Password</label>
                            <input
                                name="Password"
                                type="password"
                                value={formData.Password}
                                onChange={handleChange}
                                className={`block w-full px-4 py-3 mt-1 bg-gray-50 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none ${
                                    validationErrors.Password ? 'border-red-400' : 'border-gray-100 focus:border-blue-500'
                                }`}
                                placeholder="••••••••"
                            />
                            {validationErrors.Password && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{validationErrors.Password}</p>}
                        </div>

                        <div className="relative">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Confirm</label>
                            <input
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`block w-full px-4 py-3 mt-1 bg-gray-50 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none ${
                                    validationErrors.confirmPassword ? 'border-red-400' : 'border-gray-100 focus:border-blue-500'
                                }`}
                                placeholder="••••••••"
                            />
                            {validationErrors.confirmPassword && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{validationErrors.confirmPassword}</p>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all transform active:scale-[0.98] disabled:bg-gray-400 disabled:transform-none"
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                Creating Account...
                            </div>
                        ) : 'Sign Up'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/signin" className="font-bold text-blue-600 hover:text-blue-500 transition-colors">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;