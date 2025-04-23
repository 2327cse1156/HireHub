import React from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";

const ViewApplications = () => {
  return (
    <div className="p-4 max-w-7xl sm:p-6 lg:p-8 mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">View Applications</h2>
      <div className="overflow-x-auto bg-white shadow-lg border border-gray-200 rounded-xl">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">User name</th>
              <th className="px-4 py-3 text-left">Job Title</th>
              <th className="px-4 py-3 text-left">Location</th>
              <th className="px-4 py-3 text-left">Resume</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {viewApplicationsPageData.map((applicant, index) => (
              <tr key={index} className="border-t hover:bg-gray-50 transition-colors duration-200">
                <td className="px-4 py-3 font-medium">{index + 1}</td>
                <td className="py-3 px-4 flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover border"
                    src={applicant.imgSrc}
                    alt=""
                  />
                  <span className="font-medium">{applicant.name}</span>
                </td>
                <td className="py-3 px-4">{applicant.jobTitle}</td>
                <td className="py-3 px-4">{applicant.location}</td>
                <td className="py-3 px-4">
                  <a
                    href={applicant.resumeLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:underline font-medium"
                  >
                    Resume{" "}
                    <img
                      className="w-4 h-4"
                      src={assets.resume_download_icon}
                      alt=""
                    />
                  </a>
                </td>

                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-2">
                    <button className="bg-green-500 text-white px-4 py-1.5 rounded-md hover:bg-green-600 text-xs transition" onClick={()=>alert("Accepted")}>Accept</button>
                    <button className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 text-xs transition" onClick={()=>alert("Rejected")}>Reject</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
