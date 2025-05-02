import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-200 to-cyan-500 text-white py-6">
      <div className="container mx-auto px-6 sm:px-12 lg:px-20 flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4">
        {/* Logo */}
        <img
          src={assets.logo}
          alt="HireHub logo"
          className="w-32 sm:w-40"
        />

        {/* Copyright */}
        <p className="text-sm sm:text-base text-center sm:text-left">
          &copy; {new Date().getFullYear()} HireHub | All Rights Reserved.
        </p>

        {/* Social Links */}
        <nav className="flex gap-4" aria-label="Social media links">
          <a href="#" aria-label="Twitter">
            <img src={assets.twitter_icon} alt="Twitter icon" className="w-6 h-6 sm:w-8 sm:h-8" />
          </a>
          <a href="#" aria-label="Instagram">
            <img src={assets.instagram_icon} alt="Instagram icon" className="w-6 h-6 sm:w-8 sm:h-8" />
          </a>
          <a href="#" aria-label="Facebook">
            <img src={assets.facebook_icon} alt="Facebook icon" className="w-6 h-6 sm:w-8 sm:h-8" />
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
