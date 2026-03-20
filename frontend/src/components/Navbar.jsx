import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, Info, LogIn, UserPlus, LayoutDashboard, Bell, Archive, Shield, LogOut, Menu, X, User } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check auth on mount and when location changes
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (userData && token) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
    
    // Close mobile menu on route change
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const NavLink = ({ to, icon: Icon, children }) => (
    <Link 
      to={to} 
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        location.pathname === to 
          ? 'bg-[#4e73df]/10 text-[#4e73df]' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <Icon size={18} />
      {children}
    </Link>
  );

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 font-[Nunito]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={user ? "/dashboard" : "/"} className="flex-shrink-0 flex items-center gap-2 text-xl font-bold text-[#4e73df]">
              <div className="w-8 h-8 bg-gradient-to-br from-[#4e73df] to-[#224abe] rounded-lg flex items-center justify-center text-white">
                <span className="font-extrabold text-lg">C</span>
              </div>
              <span className="hidden sm:block">College Connect</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {!user ? (
              <>
                <NavLink to="/" icon={Home}>Home</NavLink>
                <NavLink to="/about" icon={Info}>About Us</NavLink>
                <div className="h-6 w-px bg-gray-300 mx-2"></div>
                <Link to="/login" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#4e73df] transition-colors">
                  <LogIn size={18} /> Login
                </Link>
                <Link to="/register" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#4e73df] hover:bg-[#2e59d9] rounded-full transition-all shadow-md hover:-translate-y-0.5">
                  <UserPlus size={18} /> Register
                </Link>
              </>
            ) : (
              <>
                <NavLink to="/dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
                <NavLink to="/notices" icon={Bell}>Notices</NavLink>
                <NavLink to="/lost-and-found" icon={Archive}>Lost & Found</NavLink>
                {user.role === 'admin' && (
                  <NavLink to="/admin" icon={Shield}>Admin Panel</NavLink>
                )}
                
                <div className="h-6 w-px bg-gray-300 mx-2"></div>
                
                <div className="flex items-center gap-4 ml-2">
                  <div className="flex items-center gap-2 bg-[#4e73df]/10 px-3 py-1.5 rounded-full border border-[#4e73df]/20">
                    <div className="w-6 h-6 bg-[#4e73df] rounded-full flex items-center justify-center text-white">
                      <User size={14} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-800 leading-none">{user.username}</div>
                      <div className="text-[10px] uppercase font-bold text-[#4e73df] mt-0.5 tracking-wider leading-none">
                        {user.role.replace('_', ' ')}
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {!user ? (
              <>
                <NavLink to="/" icon={Home}>Home</NavLink>
                <NavLink to="/about" icon={Info}>About Us</NavLink>
                <NavLink to="/login" icon={LogIn}>Login</NavLink>
                <NavLink to="/register" icon={UserPlus}>Register</NavLink>
              </>
            ) : (
              <>
                <div className="px-3 py-3 mb-2 flex items-center gap-3 border-b border-gray-100">
                  <div className="w-10 h-10 bg-[#4e73df] rounded-full flex items-center justify-center text-white">
                    <User size={20} />
                  </div>
                  <div>
                    <div className="text-base font-bold text-gray-800">{user.username}</div>
                    <div className="text-xs uppercase font-bold text-[#4e73df] tracking-wider">
                      {user.role.replace('_', ' ')}
                    </div>
                  </div>
                </div>
                <NavLink to="/dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
                <NavLink to="/notices" icon={Bell}>Notices</NavLink>
                <NavLink to="/lost-and-found" icon={Archive}>Lost & Found</NavLink>
                {user.role === 'admin' && (
                  <NavLink to="/admin" icon={Shield}>Admin Panel</NavLink>
                )}
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
