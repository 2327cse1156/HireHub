import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { setShowRecruiterLogin } = useContext(AppContext);

  const handleNavClick = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md py-4" role="navigation" aria-label="Main Navigation">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8 2xl:px-20">
        {/* Logo */}
        <img
          onClick={() => handleNavClick("/")}
          src={assets.logo}
          alt="HireHub Logo"
          className="h-10 sm:h-12 w-auto cursor-pointer"
        />

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            className="text-gray-700 focus:outline-none"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`flex-col md:flex-row md:flex md:items-center gap-4 md:gap-6 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent px-4 md:px-0 shadow-md md:shadow-none transition-all duration-300 ease-in-out ${
            menuOpen ? 'flex' : 'hidden'
          }`}
        >
          {user ? (
            <>
              <Link to="/applications" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600 text-sm md:text-base transition-colors">
                Applied Jobs
              </Link>
              <span className="hidden md:inline text-gray-300">|</span>
              <p
                className="font-medium text-sm md:text-base truncate max-w-[150px] md:max-w-none text-gray-700"
                title={`${user.firstName} ${user.lastName}`}
              >
                Hi, {user.firstName + " " + user.lastName}
              </p>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setShowRecruiterLogin(true);
                  setMenuOpen(false);
                }}
                className="text-gray-700 hover:text-blue-600 text-sm md:text-base transition-colors"
              >
                Recruiter Login
              </button>
              <button
                onClick={() => {
                  openSignIn();
                  setMenuOpen(false);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm md:text-base transition-all duration-200"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
