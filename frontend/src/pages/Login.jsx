import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { GraduationCap, User, Lock, LogIn } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await axios.post('/api/auth/login', {
        username,
        password
      });
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-primary to-[#224abe]">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl transition-transform duration-300 hover:-translate-y-1">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3 text-primary">
            <GraduationCap size={48} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 relative pb-3 mb-2">
            Welcome Back
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-primary"></span>
          </h2>
          <p className="text-gray-500 text-sm">Sign in to continue to College Connect</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form className="flex flex-col" onSubmit={handleLogin}>
          <div className="mb-5 relative group">
            <label className="block mb-2 font-semibold text-gray-800 text-sm" htmlFor="username">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full py-3 pl-10 pr-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
                required
              />
            </div>
          </div>

          <div className="mb-6 relative group">
            <label className="block mb-2 font-semibold text-gray-800 text-sm" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full py-3 pl-10 pr-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center gap-2 py-3 bg-primary hover:bg-primary-dark active:translate-y-0 hover:-translate-y-0.5 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:hover:-translate-y-0"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                <LogIn size={20} />
                <span>Login</span>
              </>
            )}
          </button>

          <p className="text-center mt-6 text-gray-500 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-semibold hover:text-primary-dark hover:underline transition-colors">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
