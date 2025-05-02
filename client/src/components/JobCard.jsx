import React from "react";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/apply-job/${job._id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <article
      className="border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition duration-200 bg-white flex flex-col justify-between h-full"
      role="listitem"
    >
      <header>
        <div className="flex justify-between items-center mb-3">
          <img
            src={job.companyId.image}
            className="h-8 w-8 object-contain"
            alt={`${job.companyId.name} Logo`}
          />
        </div>
        <h3 className="font-semibold text-lg sm:text-xl mb-2 text-gray-800">
          {job.title}
        </h3>
      </header>

      <div className="flex flex-wrap gap-2 text-xs sm:text-sm mb-4">
        <span className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-blue-700">
          {job.location}
        </span>
        <span className="bg-red-50 border border-red-200 px-3 py-1 rounded-full text-red-700">
          {job.level}
        </span>
      </div>

      <p
        className="text-gray-500 text-sm mb-4 line-clamp-4"
        dangerouslySetInnerHTML={{
          __html: job.description?.slice(0, 150) || "No description available.",
        }}
      />

      <footer className="mt-auto flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleNavigate}
          aria-label={`Apply to ${job.title}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition w-full sm:w-auto"
        >
          Apply Now
        </button>
        <button
          onClick={handleNavigate}
          aria-label={`Learn more about ${job.title}`}
          className="text-blue-600 border border-blue-600 px-4 py-2 rounded-md text-sm hover:bg-blue-50 transition w-full sm:w-auto"
        >
          Learn More
        </button>
      </footer>
    </article>
  );
};

export default JobCard;
