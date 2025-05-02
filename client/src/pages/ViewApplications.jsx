import React, { useContext, useEffect, useState } from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";
const ViewApplications = () => {
  const { backendUrl, companyToken } = useContext(AppContext);

  const [applicants, setApplicants] = useState(false);

  // function to fetch applicants data from the backend

  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/applicants", {
        headers: { token: companyToken },
      });
      if (data.success) {
        setApplicants(data.applicants.reverse());
        toast.success(data.message || "Applicants fetched successfully!");
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error(data.message || "Something went wrong!");
    }
  };

  // function to update job application status
  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-status",
        { id, status },
        { headers: { token: companyToken } }
      );
      if (data.success) {
        toast.success(
          data.message || "Job application status updated successfully!"
        );
        fetchCompanyJobApplications();
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error(data.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications();
    }
  }, [companyToken]);
  return applicants ? (
    applicants.length === 0 ? (
      <div></div>
    ) : (
      <div className="p-4 max-w-7xl sm:p-6 lg:p-8 mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          View Applications
        </h2>
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
              {applicants
                .filter((item) => item.jobId && item.userId)
                .map((applicant, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-4 py-3 font-medium">{index + 1}</td>
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img
                        className="w-10 h-10 rounded-full object-cover border"
                        src={applicant.userId.image}
                        alt=""
                      />
                      <span className="font-medium">
                        {applicant.userId.name}
                      </span>
                    </td>
                    <td className="py-3 px-4">{applicant.jobId.jobTitle}</td>
                    <td className="py-3 px-4">{applicant.jobId.location}</td>
                    <td className="py-3 px-4">
                      <a
                        href={applicant.userId.resume || "#"}
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
                      {applicant.status === "Pending" ? (
                        <div className="flex flex-wrap gap-2">
                          <button
                            className="bg-green-500 text-white px-4 py-1.5 rounded-md hover:bg-green-600 text-xs transition"
                            onClick={() =>
                              changeJobApplicationStatus(
                                applicant._id,
                                "Accepted"
                              )
                            }
                          >
                            Accept
                          </button>
                          <button
                            className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 text-xs transition"
                            onClick={() =>
                              changeJobApplicationStatus(
                                applicant._id,
                                "Rejected"
                              )
                            }
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <div>{applicant.status}</div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  ) : (
    <Loading></Loading>
  );
};

export default ViewApplications;
