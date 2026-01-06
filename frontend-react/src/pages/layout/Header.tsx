import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 shadow-lg z-50">
      <div className="mx-auto max-w-7xl py-4 px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/Picture2.jpg" 
              alt="Logo" 
              className="h-12 w-auto mr-4 object-contain"
            />
            <h1 className="text-2xl font-bold text-white">
              Work Breakdown System
            </h1>
          </div>

          <div>
            <Link to="/login">
              <button className="px-6 py-2.5 bg-white text-green-600 font-semibold rounded-lg shadow-md hover:bg-green-50 hover:shadow-lg transition duration-200">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;