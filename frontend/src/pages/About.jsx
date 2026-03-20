import React from 'react';
import { Link } from 'react-router-dom';
import { Megaphone, Search, Star, Globe, Users, Rocket, UserPlus, Settings } from 'lucide-react';

const About = () => {
  return (
    <div className="font-[Nunito] bg-[#f8f9fc] text-[#5a5c69] min-h-screen py-10 px-4">
      <section className="bg-gradient-to-br from-white to-[#f8f9fc] p-8 md:p-20 rounded-[15px] shadow-[0_0.15rem_1.75rem_0_rgba(58,59,69,0.15)] max-w-5xl mx-auto relative overflow-hidden">
        {/* Top Gradient Bar */}
        <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#4e73df] to-[#e74a3b]"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-[2.5rem] mb-5 text-[#333] text-center font-bold">
            Welcome to <span className="text-[#4e73df] font-bold relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[3px] after:bg-[#4e73df] after:rounded-[3px]">College Connect</span>
          </h2>
          <p className="text-[1.1rem] leading-[1.8] mb-6 text-[#555]">
            <b>College Connect</b> is your comprehensive platform designed to enhance campus life by bridging the communication gap between students, class representatives, and college administration. Our mission is to create a seamless, organized, and engaging college experience for everyone.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-8">
            <div className="bg-white p-6 rounded-[10px] shadow-[0_0.15rem_1.75rem_0_rgba(58,59,69,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0.5rem_2rem_0_rgba(58,59,69,0.2)]">
              <Megaphone className="text-[#4e73df] w-8 h-8 mb-4" />
              <div className="text-[1.2rem] font-semibold mb-2 text-[#333]">Stay Updated</div>
              <p>Access all official and unofficial notices instantly in one place.</p>
            </div>
            
            <div className="bg-white p-6 rounded-[10px] shadow-[0_0.15rem_1.75rem_0_rgba(58,59,69,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0.5rem_2rem_0_rgba(58,59,69,0.2)]">
              <Settings className="text-[#4e73df] w-8 h-8 mb-4" />
              <div className="text-[1.2rem] font-semibold mb-2 text-[#333]">Easy Management</div>
              <p>Class Representatives can post updates and manage information effortlessly.</p>
            </div>
            
            <div className="bg-white p-6 rounded-[10px] shadow-[0_0.15rem_1.75rem_0_rgba(58,59,69,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0.5rem_2rem_0_rgba(58,59,69,0.2)]">
              <Search className="text-[#4e73df] w-8 h-8 mb-4" />
              <div className="text-[1.2rem] font-semibold mb-2 text-[#333]">Lost & Found</div>
              <p>Report or find lost items quickly through our dedicated system.</p>
            </div>
          </div>

          <div className="h-[2px] bg-gradient-to-r from-transparent via-[#4e73df]/30 to-transparent my-10"></div>

          <h3 className="mt-8 mb-4 text-[#333] text-2xl font-semibold flex items-center gap-2">
            <Star className="text-[#4e73df] w-6 h-6" /> Why Choose College Connect?
          </h3>
          <ul className="mb-6 space-y-3">
            {[
              "Instant access to important campus announcements and updates",
              "Streamlined communication between students and administration",
              "Efficient lost and found reporting system",
              "Role-based access for secure and relevant information sharing",
              "Modern, intuitive interface designed for the best user experience"
            ].map((item, idx) => (
              <li key={idx} className="text-[1.05rem] pl-8 relative transition-all duration-300 hover:text-[#4e73df] hover:translate-x-1 before:content-['✓'] before:absolute before:left-0 before:text-[#1cc88a] before:font-bold">
                {item}
              </li>
            ))}
          </ul>

          <h3 className="mt-8 mb-4 text-[#333] text-2xl font-semibold flex items-center gap-2">
            <Globe className="text-[#4e73df] w-6 h-6" /> Our Mission
          </h3>
          <p className="text-[1.1rem] leading-[1.8] mb-6 text-[#555]">
            We believe in fostering a connected and informed student community. Our goal is to eliminate 
            communication gaps and provide a platform that enhances productivity and collaboration. Through College Connect, 
            we aim to make campus life more organized, efficient, and enjoyable for everyone involved.
          </p>

          <h3 className="mt-8 mb-4 text-[#333] text-2xl font-semibold flex items-center gap-2">
            <Users className="text-[#4e73df] w-6 h-6" /> Who Can Use College Connect?
          </h3>
          <ul className="mb-6 space-y-3">
            <li className="text-[1.05rem] pl-8 relative transition-all duration-300 hover:text-[#4e73df] hover:translate-x-1 before:content-['✓'] before:absolute before:left-0 before:text-[#1cc88a] before:font-bold">
              <span className="bg-[#4e73df]/20 px-1.5 py-0.5 rounded font-semibold text-[#4e73df]">Students</span> - Access notices & report lost items
            </li>
            <li className="text-[1.05rem] pl-8 relative transition-all duration-300 hover:text-[#4e73df] hover:translate-x-1 before:content-['✓'] before:absolute before:left-0 before:text-[#1cc88a] before:font-bold">
              <span className="bg-[#4e73df]/20 px-1.5 py-0.5 rounded font-semibold text-[#4e73df]">Class Representatives (CRs)</span> - Post unofficial notices and manage lost & found items
            </li>
            <li className="text-[1.05rem] pl-8 relative transition-all duration-300 hover:text-[#4e73df] hover:translate-x-1 before:content-['✓'] before:absolute before:left-0 before:text-[#1cc88a] before:font-bold">
              <span className="bg-[#4e73df]/20 px-1.5 py-0.5 rounded font-semibold text-[#4e73df]">Administrators</span> - Oversee all activities and manage official notices
            </li>
          </ul>

          <div className="h-[2px] bg-gradient-to-r from-transparent via-[#4e73df]/30 to-transparent my-10"></div>

          <h3 className="mt-8 mb-4 text-[#333] text-2xl font-semibold flex items-center gap-2">
            <Rocket className="text-[#4e73df] w-6 h-6" /> Get Started Today!
          </h3>
          <p className="text-[1.1rem] leading-[1.8] mb-6 text-[#555]">
            Join <b>College Connect</b> now and experience seamless campus communication like never before! Let's make college life more connected, organized, and enjoyable for everyone.
          </p>

          {/* Call-to-Action Button */}
          <div className="mt-10 text-center">
            <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-[#4e73df] to-[#224abe] text-white text-[1.1rem] font-semibold rounded-full transition-all duration-300 shadow-[0_4px_15px_rgba(78,115,223,0.4)] hover:-translate-y-1 hover:shadow-[0_7px_20px_rgba(78,115,223,0.5)] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-0 h-full bg-gradient-to-br from-[#224abe] to-[#4e73df] transition-all duration-500 group-hover:w-full z-0"></div>
              <span className="relative z-10 flex items-center gap-2"><UserPlus size={20} /> Join College Connect Today!</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
