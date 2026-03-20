import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-[Nunito]">
      <Navbar />
      <main className="flex-1 bg-[#f8f9fc]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
