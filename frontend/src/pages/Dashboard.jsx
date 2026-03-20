import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Megaphone, ClipboardList, MessageSquare, Users, Bell, 
  User, Clock, Link as LinkIcon, Calendar, Book, 
  GraduationCap, Settings, Trophy, Music, Medal, 
  Star, Info, Phone, Mail, MapPin 
} from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalNotices: 0,
    officialNotices: 0,
    unofficialNotices: 0,
    totalUsers: 0,
    recentNotices: []
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(userData));

    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/dashboard/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [navigate]);

  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0e3d6c]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  // Format date safely
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-[#0e3d6c] text-[#333] font-[Nunito] relative overflow-hidden pb-12">
      {/* Background overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-10 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
        
        {/* Welcome Message */}
        <div className="bg-gradient-to-br from-[#3498db] to-[#9b59b6] text-white rounded-[15px] p-8 mb-8 shadow-[0_10px_20px_rgba(0,0,0,0.1)] relative overflow-hidden animate-[fadeIn_0.5s_ease-in-out]">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-white/10 rotate-[30deg] pointer-events-none"></div>
          <h2 className="text-[1.8rem] font-bold mb-2 relative z-10">Welcome, {user.username}! 👋</h2>
          <p className="text-[1.1rem] opacity-90 relative z-10">Here's what's happening at Evergreen College today.</p>
        </div>

        {/* Header */}
        <div className="text-center mb-10 pb-5 relative animate-[fadeIn_0.5s_ease-in-out]">
          <h1 className="text-3xl font-semibold text-white tracking-wide">College Dashboard</h1>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100px] h-1 bg-gradient-to-r from-[#3498db] to-[#9b59b6] rounded-full"></div>
        </div>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Card 1 */}
          <div className="bg-gradient-to-br from-[#3498db] to-[#2980b9] text-white rounded-[15px] p-6 shadow-[0_10px_20px_rgba(0,0,0,0.1)] relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 animate-[fadeInUp_0.5s_ease-in-out]">
            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-white/10 rotate-[30deg]"></div>
            <Megaphone className="w-12 h-12 mb-4 opacity-80" />
            <div className="text-[2.5rem] font-bold leading-none mb-1">{stats.totalNotices}</div>
            <p className="text-base opacity-80 m-0">Total Notices</p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-gradient-to-br from-[#9b59b6] to-[#8e44ad] text-white rounded-[15px] p-6 shadow-[0_10px_20px_rgba(0,0,0,0.1)] relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 animate-[fadeInUp_0.5s_ease-in-out_0.1s_both]">
            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-white/10 rotate-[30deg]"></div>
            <ClipboardList className="w-12 h-12 mb-4 opacity-80" />
            <div className="text-[2.5rem] font-bold leading-none mb-1">{stats.officialNotices}</div>
            <p className="text-base opacity-80 m-0">Official Notices</p>
          </div>
          
          {/* Card 3 */}
          <div className="bg-gradient-to-br from-[#e67e22] to-[#d35400] text-white rounded-[15px] p-6 shadow-[0_10px_20px_rgba(0,0,0,0.1)] relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 animate-[fadeInUp_0.5s_ease-in-out_0.2s_both]">
            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-white/10 rotate-[30deg]"></div>
            <MessageSquare className="w-12 h-12 mb-4 opacity-80" />
            <div className="text-[2.5rem] font-bold leading-none mb-1">{stats.unofficialNotices}</div>
            <p className="text-base opacity-80 m-0">Unofficial Notices</p>
          </div>
          
          {/* Card 4 */}
          <div className="bg-gradient-to-br from-[#2ecc71] to-[#27ae60] text-white rounded-[15px] p-6 shadow-[0_10px_20px_rgba(0,0,0,0.1)] relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 animate-[fadeInUp_0.5s_ease-in-out_0.3s_both]">
            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-white/10 rotate-[30deg]"></div>
            <Users className="w-12 h-12 mb-4 opacity-80" />
            <div className="text-[2.5rem] font-bold leading-none mb-1">{stats.totalUsers}</div>
            <p className="text-base opacity-80 m-0">College Members</p>
          </div>
        </div>
        
        {/* Main Content Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* College Information */}
          <div className="bg-white rounded-[15px] p-8 shadow-[0_10px_20px_rgba(0,0,0,0.1)] animate-[fadeIn_0.5s_ease-in-out_0.4s_both]">
            <div className="text-center mb-6">
              <img src="https://via.placeholder.com/120" alt="College Logo" className="w-[120px] h-[120px] object-cover rounded-full mx-auto mb-5 border-4 border-gray-50 shadow-md" />
              <h2 className="text-[1.8rem] font-bold text-[#2c3e50] mb-2 leading-tight">Evergreen College</h2>
              <p className="text-[1.1rem] text-[#7f8c8d] italic">Nurturing Minds, Building Futures</p>
            </div>
            
            <p className="text-[#555] mb-6 leading-[1.7]">
              Evergreen College is a premier educational institution dedicated to academic excellence and holistic development. 
              Founded in 1985, we have a rich history of producing leaders across various fields. Our campus spans 50 acres 
              of lush greenery, providing an ideal environment for learning and growth.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-between gap-3 mb-6">
              {[
                { num: "50+", label: "Courses" },
                { num: "200+", label: "Faculty" },
                { num: "5000+", label: "Students" },
                { num: "35+", label: "Years" }
              ].map((stat, idx) => (
                <div key={idx} className="bg-gray-50 rounded-[10px] p-4 text-center flex-1">
                  <div className="text-[1.8rem] font-bold text-[#3498db] leading-none mb-1">{stat.num}</div>
                  <div className="text-[0.9rem] text-[#7f8c8d]">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-2">
              <Link to="/about" className="inline-block bg-[#007bff] hover:bg-[#0056b3] text-white py-2 px-4 rounded transition-colors duration-200">
                Learn More About Us
              </Link>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="flex flex-col gap-6">
            
            {/* Recent Notices */}
            <div className="bg-white rounded-[15px] shadow-[0_10px_20px_rgba(0,0,0,0.1)] overflow-hidden animate-[fadeIn_0.5s_ease-in-out_0.5s_both]">
              <div className="bg-white p-5 border-b border-gray-100 flex items-center font-semibold text-[1.2rem] text-[#2c3e50]">
                <Bell className="text-[#007bff] mr-2" size={20} /> Recent Notices
              </div>
              <div className="p-0">
                {stats.recentNotices.length > 0 ? (
                  stats.recentNotices.map((notice) => (
                    <div key={notice._id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-300 last:border-0">
                      <div className="font-semibold text-[#2c3e50] mb-1 flex items-center">
                        <Megaphone className="text-[#3498db] mr-2" size={16} /> {notice.title}
                      </div>
                      <div className="text-[0.8rem] text-[#7f8c8d] flex items-center">
                        <span className="flex items-center"><User size={12} className="mr-1" /> {notice.createdBy?.username || 'Unknown'}</span>
                        <span className="flex items-center ml-3"><Clock size={12} className="mr-1" /> {formatDate(notice.createdAt)}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500 flex items-center justify-center">
                    <Info size={16} className="mr-2" /> No notices found.
                  </div>
                )}
              </div>
              <div className="bg-white p-3 text-center border-t border-gray-100">
                <Link to="/notices" className="inline-block border border-[#007bff] text-[#007bff] hover:bg-[#007bff] hover:text-white px-3 py-1 text-sm rounded transition-colors duration-200">
                  View All Notices
                </Link>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="bg-white rounded-[15px] shadow-[0_10px_20px_rgba(0,0,0,0.1)] overflow-hidden animate-[fadeIn_0.5s_ease-in-out_0.6s_both] h-full">
              <div className="bg-white p-5 border-b border-gray-100 flex items-center font-semibold text-[1.2rem] text-[#2c3e50]">
                <LinkIcon className="text-[#007bff] mr-2" size={20} /> Quick Links
              </div>
              <div className="p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: Megaphone, color: "text-[#007bff]", label: "Notices", to: "/notices" },
                    { icon: Calendar, color: "text-[#28a745]", label: "Events", to: "#" },
                    { icon: Book, color: "text-[#dc3545]", label: "Library", to: "#" },
                    { icon: GraduationCap, color: "text-[#ffc107]", label: "Academics", to: "#" },
                    { icon: Users, color: "text-[#17a2b8]", label: "Faculty", to: "#" },
                    { icon: Settings, color: "text-[#6c757d]", label: "Settings", to: "#" }
                  ].map((link, idx) => (
                    <Link key={idx} to={link.to} className="flex items-center p-4 bg-gray-50 rounded-[10px] text-[#2c3e50] hover:bg-[#3498db] hover:text-white hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                      <link.icon className={`${link.color} mr-3 group-hover:text-white transition-colors`} size={24} />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
        </div>
        
        {/* Additional Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Upcoming Events */}
          <div className="bg-white rounded-[15px] shadow-[0_10px_20px_rgba(0,0,0,0.1)] overflow-hidden animate-[fadeInUp_0.5s_ease-in-out_0.7s_both]">
            <div className="bg-white p-4 border-b border-gray-100 flex items-center font-semibold text-[#2c3e50]">
              <Calendar className="text-[#007bff] mr-2" size={18} /> Upcoming Events
            </div>
            <div className="p-0">
              {[
                { icon: Trophy, color: "text-[#ffc107]", title: "Annual Sports Day", date: "May 15, 2024" },
                { icon: Music, color: "text-[#dc3545]", title: "Cultural Festival", date: "June 5, 2024" },
                { icon: GraduationCap, color: "text-[#28a745]", title: "Graduation Ceremony", date: "July 10, 2024" }
              ].map((item, idx) => (
                <div key={idx} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="font-medium text-[#2c3e50] mb-1 flex items-center">
                    <item.icon className={`${item.color} mr-2`} size={16} /> {item.title}
                  </div>
                  <div className="text-[0.8rem] text-[#7f8c8d] flex items-center">
                    <Calendar size={12} className="mr-1" /> {item.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Achievements */}
          <div className="bg-white rounded-[15px] shadow-[0_10px_20px_rgba(0,0,0,0.1)] overflow-hidden animate-[fadeInUp_0.5s_ease-in-out_0.8s_both]">
            <div className="bg-white p-4 border-b border-gray-100 flex items-center font-semibold text-[#2c3e50]">
              <Medal className="text-[#007bff] mr-2" size={18} /> Achievements
            </div>
            <div className="p-0">
              {[
                { icon: Medal, color: "text-[#ffc107]", title: "National Science Competition Winner", dept: "Science Department" },
                { icon: Trophy, color: "text-[#dc3545]", title: "Inter-College Basketball Champions", dept: "Sports Department" },
                { icon: Star, color: "text-[#28a745]", title: "Best College Award 2023", dept: "Education Ministry" }
              ].map((item, idx) => (
                <div key={idx} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="font-medium text-[#2c3e50] mb-1 flex items-center">
                    <item.icon className={`${item.color} mr-2`} size={16} /> {item.title}
                  </div>
                  <div className="text-[0.8rem] text-[#7f8c8d] flex items-center">
                    <User size={12} className="mr-1" /> {item.dept}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Important Information */}
          <div className="bg-white rounded-[15px] shadow-[0_10px_20px_rgba(0,0,0,0.1)] overflow-hidden animate-[fadeInUp_0.5s_ease-in-out_0.9s_both]">
            <div className="bg-white p-4 border-b border-gray-100 flex items-center font-semibold text-[#2c3e50]">
              <Info className="text-[#007bff] mr-2" size={18} /> Important Information
            </div>
            <div className="p-0">
              {[
                { icon: Book, color: "text-[#17a2b8]", text: "Library Hours: 8 AM - 8 PM" },
                { icon: Phone, color: "text-[#28a745]", text: "Helpdesk: +91 9876543219" },
                { icon: Mail, color: "text-[#ffc107]", text: "Contact: mvgr@evergreencollege.edu" },
                { icon: MapPin, color: "text-[#dc3545]", text: "Address: MVGR ,Chinthalavalasa" }
              ].map((item, idx) => (
                <div key={idx} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="font-medium text-[#2c3e50] flex items-center">
                    <item.icon className={`${item.color} mr-2`} size={16} /> {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
