import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserPlus, User, Lock, Phone } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    contact: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await axios.post('/api/auth/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-primary to-[#224abe]">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl transition-transform duration-300 hover:-translate-y-1">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3 text-primary">
            <UserPlus size={48} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 relative pb-3 mb-2">
            Create Account
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-primary"></span>
          </h2>
          <p className="text-gray-500 text-sm">Join College Connect today</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form className="flex flex-col" onSubmit={handleRegister}>
          <div className="mb-4 relative group">
            <label className="block mb-2 font-semibold text-gray-800 text-sm" htmlFor="username">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                className="w-full py-3 pl-10 pr-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
                required
              />
            </div>
          </div>

          <div className="mb-4 relative group">
            <label className="block mb-2 font-semibold text-gray-800 text-sm" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full py-3 pl-10 pr-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
                required
              />
            </div>
          </div>

          <div className="mb-4 relative group">
            <label className="block mb-2 font-semibold text-gray-800 text-sm" htmlFor="contact">
              Contact Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Phone number"
                className="w-full py-3 pl-10 pr-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
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
              <span>Register</span>
            )}
          </button>

          <p className="text-center mt-6 text-gray-500 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:text-primary-dark hover:underline transition-colors">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
