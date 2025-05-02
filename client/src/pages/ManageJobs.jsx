import React, { useContext, useEffect, useState } from "react";
import { manageJobsData } from "../assets/assets";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";
const ManageJobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);

  // function to fetch company job application data
  const { backerendUrl, companyToken } = useContext(AppContext);
  const fetchCompnayJobs = async () => {
    try {
      const { data } = await axios.get(
        backerendUrl + "/api/company/list-jobs",
        { headers: { token: companyToken } }
      );
      if(data.success) {
        setJobs(data.jobsData.reverse())
        console.log(data.jobsData)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() =>{
    if(companyToken){
      fetchCompnayJobs()
    }
  },[companyToken])

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Jobs</h2>

      <div className="overflow-x-auto bg-white shadow-lg border border-gray-200 rounded-xl">
        <table className="min-w-full text-sm text-left text-gray-800">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Job Title</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Applicants</th>
              <th className="px-4 py-3 text-center">Visible</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition duration-200"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 font-medium">{job.title}</td>
                <td className="px-4 py-3">
                  {moment(job.date).format("MMM D, YYYY")}
                </td>
                <td className="px-4 py-3">{job.location}</td>
                <td className="px-4 py-3">{job.applicants}</td>
                <td className="px-4 py-3 text-center">
                  <input
                    className="scale-125 ml-4"
                    type="checkbox"
                    checked={job.visible}
                    readOnly
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => navigate("/dashboard/add-job")}
          className="text-white bg-black rounded py-2 px-4"
        >
          Add New Job
        </button>
      </div>
    </div>
  );
};

export default ManageJobs;
