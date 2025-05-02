import React, { useContext, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page")) || 1);

  const jobsPerPage = 6;

  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [currentPage, setSearchParams]);

  const toggleFilter = (value, setState) => {
    setState(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
    setCurrentPage(1);
  };

  const filteredJobs = useMemo(() => {
    return jobs
      .slice()
      .reverse()
      .filter(job => {
        const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(job.category);
        const matchLocation = selectedLocations.length === 0 || selectedLocations.includes(job.location);
        const matchTitle = !searchFilter.title || job.title.toLowerCase().includes(searchFilter.title.toLowerCase());
        const matchSearchLocation = !searchFilter.location || job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

        return matchCategory && matchLocation && matchTitle && matchSearchLocation;
      });
  }, [jobs, selectedCategories, selectedLocations, searchFilter]);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfLastJob - jobsPerPage, indexOfLastJob);

  return (
    <div className="container mx-auto px-4 sm:px-6 2xl:px-20 py-10 flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-1/4 bg-white p-5 rounded-xl shadow-sm border border-gray-200">
        {isSearched && (searchFilter.title || searchFilter.location) && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Current Search</h3>
            <div className="flex flex-wrap gap-3 text-sm">
              {searchFilter.title && (
                <span className="flex items-center gap-2 bg-blue-100 text-blue-700 border border-blue-300 px-3 py-1.5 rounded-full hover:bg-blue-200 transition">
                  <span>{searchFilter.title}</span>
                  <img
                    src={assets.cross_icon}
                    alt="remove title"
                    onClick={() => setSearchFilter(prev => ({ ...prev, title: "" }))}
                    className="h-4 w-4 cursor-pointer"
                  />
                </span>
              )}
              {searchFilter.location && (
                <span className="flex items-center gap-2 bg-red-100 text-red-700 border border-red-300 px-3 py-1.5 rounded-full hover:bg-red-200 transition">
                  <span>{searchFilter.location}</span>
                  <img
                    src={assets.cross_icon}
                    alt="remove location"
                    onClick={() => setSearchFilter(prev => ({ ...prev, location: "" }))}
                    className="h-4 w-4 cursor-pointer"
                  />
                </span>
              )}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <h4 className="font-semibold text-lg mb-4">Search By Categories</h4>
        <ul className="space-y-4 text-gray-700 text-sm">
          {JobCategories.map((category, i) => (
            <li key={category} className="flex items-center gap-3">
              <input
                id={`cat-${i}`}
                type="checkbox"
                className="scale-110 accent-blue-600"
                onChange={() => toggleFilter(category, setSelectedCategories)}
                checked={selectedCategories.includes(category)}
              />
              <label htmlFor={`cat-${i}`}>{category}</label>
            </li>
          ))}
        </ul>

        {/* Location Filter */}
        <h4 className="font-semibold text-lg mt-10 mb-4">Search By Location</h4>
        <ul className="space-y-4 text-gray-700 text-sm">
          {JobLocations.map((location, i) => (
            <li key={location} className="flex items-center gap-3">
              <input
                id={`loc-${i}`}
                type="checkbox"
                className="scale-110 accent-blue-600"
                onChange={() => toggleFilter(location, setSelectedLocations)}
                checked={selectedLocations.includes(location)}
              />
              <label htmlFor={`loc-${i}`}>{location}</label>
            </li>
          ))}
        </ul>
      </aside>

      {/* Job List */}
      <main className="w-full lg:w-3/4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-1">Latest Jobs</h2>
        <p className="mb-4 text-gray-500">
          Showing {filteredJobs.length === 0 ? 0 : indexOfLastJob - jobsPerPage + 1} - {Math.min(indexOfLastJob, filteredJobs.length)} of {filteredJobs.length} jobs
        </p>

        {currentJobs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentJobs.map((job, idx) => (
                <JobCard key={idx} job={job} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-3 mt-10 text-sm flex-wrap">
              <button
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="px-4 py-2 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  aria-label={`Go to page ${i + 1}`}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 border rounded ${
                    currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                aria-label="Next page"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="px-4 py-2 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-sm mt-6">No jobs match your filters.</p>
        )}
      </main>
    </div>
  );
};

export default JobListing;
