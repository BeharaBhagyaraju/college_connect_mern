import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 shadow-[0_-5px_20px_rgba(0,0,0,0.02)] font-[Nunito] mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <p className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} College Connect. All Rights Reserved.
        </p>
        <p className="text-center text-sm text-gray-400 mt-1 flex items-center gap-1">
          Made with <Heart size={14} className="text-red-500 fill-red-500 mx-1" /> for the College Community
        </p>
      </div>
    </footer>
  );
};

export default Footer;
