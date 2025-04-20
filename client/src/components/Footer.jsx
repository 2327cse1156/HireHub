import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-200 to-cyan-500 text-white py-6">
      <div className="container px-6 sm:px-12 lg:px-20 mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <img src={assets.logo} className="w-32 sm:w-40"></img>
        <p className="text-sm sm:text-base text-center sm:justify-start">
        &copy; {new Date().getFullYear()} HireHub | All Rights Reserved.

        </p>
        <div className="flex gap-4 justify-center sm:justify-start ">
        <a href="#" aria-label="Twitter">
            <img src={assets.twitter_icon} alt="Twitter" className="w-8 h-8" />
          </a>
          <a href="#" aria-label="Instagram">
            <img src={assets.instagram_icon} alt="Instagram" className="w-8 h-8" />
          </a>
          <a href="#" aria-label="Facebook">
            <img src={assets.facebook_icon} alt="Facebook" className="w-8 h-8" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
