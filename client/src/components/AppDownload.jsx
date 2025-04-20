import React from 'react';
import { assets } from '../assets/assets';

const AppDownload = () => {
  return (
    <section className="container mx-auto my-20 px-6 sm:px-12 lg:px-20">
      <div className="relative bg-gradient-to-r from-indigo-500 to-cyan-500 p-12 sm:p-16 lg:p-24 rounded-xl shadow-xl flex flex-col lg:flex-row items-center lg:items-start gap-8">
        <div className="relative z-10 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 mb-6 leading-tight">
            Download Our Mobile App for a Better Experience
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
            Enjoy a seamless experience with our app. Download now and get started!
          </p>
          <div className="flex justify-center lg:justify-start gap-6 sm:gap-8 lg:gap-12">
            <a
              href="#"
              className="flex items-center justify-center w-32 sm:w-40 lg:w-48 p-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <img
                src={assets.play_store}
                alt="Download on Google Play"
                className="w-full h-auto object-contain"
              />
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-32 sm:w-40 lg:w-48 p-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <img
                src={assets.app_store}
                alt="Download on the App Store"
                className="w-full h-auto object-contain"
              />
            </a>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end w-full lg:w-auto">
          <img
            src={assets.app_main_img}
            alt="App preview"
            className="w-full sm:w-3/4 lg:w-2/3 xl:w-1/2 rounded-xl shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
