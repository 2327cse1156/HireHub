import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // using Lucide icons

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8 2xl:px-20">
        {/* Logo */}
        <img src={assets.logo} alt="logo" className="h-10 sm:h-12 w-auto" />

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Items */}
        <div className={`flex-col md:flex-row md:flex md:items-center gap-4 md:gap-6 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent px-4 md:px-0 shadow-md md:shadow-none transition-all duration-300 ease-in-out ${menuOpen ? 'flex' : 'hidden'}`}>
          {user ? (
            <>
              <Link to="/applications" className="text-gray-700 hover:text-blue-600 text-sm md:text-base transition-colors">
                Applied Jobs
              </Link>
              <p className="hidden md:inline text-gray-300">|</p>
              <p className="font-medium text-sm md:text-base truncate max-w-[150px] md:max-w-none text-gray-700">
                Hi, {user.firstName + " " + user.lastName}
              </p>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <>
              <button className="text-gray-700 hover:text-blue-600 text-sm md:text-base transition-colors">
                Recruiter Login
              </button>
              <button
                onClick={() => openSignIn()}
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
