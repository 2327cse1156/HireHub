import React, { useRef, useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const companyLogos = [
  { src: assets.accenture_logo, alt: 'Accenture Logo' },
  { src: assets.amazon_logo, alt: 'Amazon Logo' },
  { src: assets.adobe_logo, alt: 'Adobe Logo' },
  { src: assets.samsung_logo, alt: 'Samsung Logo' },
  { src: assets.microsoft_logo, alt: 'Microsoft Logo' },
  { src: assets.walmart_logo, alt: 'Walmart Logo' },
];

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);
  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = (e) => {
    e.preventDefault();
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 2xl:px-20 my-10">
      <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white py-12 sm:py-16 px-4 text-center rounded-xl shadow-lg">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 leading-snug">
          Over 10,000+ jobs to apply
        </h2>
        <p className="text-sm sm:text-base font-light max-w-2xl mx-auto mb-8 px-2">
          Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!
        </p>

        {/* Search Box */}
        <form
          onSubmit={onSearch}
          className="flex flex-col sm:flex-row items-center justify-between bg-white text-gray-600 max-w-3xl mx-auto px-4 py-4 rounded-lg shadow-md gap-4"
          role="search"
        >
          <div className="flex items-center w-full sm:w-auto gap-2">
            <img className="h-4 sm:h-5" src={assets.search_icon} alt="Search icon" />
            <input
              type="text"
              placeholder="Search for jobs"
              ref={titleRef}
              aria-label="Job Title"
              className="text-sm sm:text-base w-full border border-gray-200 p-2 rounded outline-none"
            />
          </div>

          <div className="flex items-center w-full sm:w-auto gap-2">
            <img className="h-4 sm:h-5" src={assets.location_icon} alt="Location icon" />
            <input
              type="text"
              placeholder="Location"
              ref={locationRef}
              aria-label="Job Location"
              className="text-sm sm:text-base w-full border border-gray-200 p-2 rounded outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition duration-200"
            aria-label="Search Jobs"
          >
            Search
          </button>
        </form>
      </div>

      {/* Company Logos */}
      <div className="mt-8 px-4 py-5 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="flex justify-center items-center flex-wrap gap-4 sm:gap-6 lg:gap-10">
          <p className="text-sm sm:text-base font-medium text-gray-700 whitespace-nowrap">
            Trusted by
          </p>
          {companyLogos.map((logo, idx) => (
            <img
              key={idx}
              src={logo.src}
              alt={logo.alt}
              className="h-5 sm:h-6 grayscale hover:grayscale-0 transition-all"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
