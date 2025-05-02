import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import kConvert from "k-convert";
import moment from "moment";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";
import axios from "axios";
import toast from "react-hot-toast";
const ApplyJob = () => {
  const { id } = useParams();

  const [jobData, setJobData] = useState(null);

  const { jobs,backendUrl } = useContext(AppContext);

  const fetchJob = async () => {

    try {
      const {data} = await axios.get(backendUrl + `/api/jobs/${id}`);

    if (data.success) {
      setJobData(data.job);
    }
    else{
      toast.error(data.message)
    }
    } catch (error) {
      toast.error(error.message)
    }
    


  };

  useEffect(() => {
    fetchJob();
  }, [id, jobs]);

  return jobData ? (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col py-10 px-4 sm:px-6 lg:px-10 xl:px-20 mx-auto animate-fade-in">
        <div className="bg-white text-black rounded-lg w-full shadow-lg transition-all duration-500">
          <div className="flex justify-between flex-col md:flex-row flex-wrap gap-8 px-6 sm:px-10 py-10 mb-6 bg-sky-50 border border-sky-300 rounded-xl">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <img
                className="h-24 w-24 object-contain bg-white rounded-lg p-4 shadow-lg border"
                src={jobData.companyId.image}
                alt={jobData.companyId.name}
              />
              <div className="text-center md:text-left text-neutral-700">
                <h1 className="text-gray-800 text-2xl sm:text-3xl font-semibold">
                  {jobData.title}
                </h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-gray-600 text-sm sm:text-base">
                  <span className="flex items-center gap-1">
                    <img
                      className="w-4 h-4"
                      src={assets.suitcase_icon}
                      alt="Company"
                    />
                    {jobData.companyId.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <img
                      className="w-4 h-4"
                      src={assets.location_icon}
                      alt="Location"
                    />
                    {jobData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <img
                      className="w-4 h-4"
                      src={assets.person_icon}
                      alt="Level"
                    />
                    {jobData.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <img
                      className="w-4 h-4"
                      src={assets.money_icon}
                      alt="Salary"
                    />
                    CTC: {kConvert.convertTo(jobData.salary)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center text-end max-md:mx-auto max-md:text-center">
              <button className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 px-5 py-2.5 text-white font-medium rounded-lg cursor-pointer shadow-md">
                Apply Now
              </button>
              <p className="mt-2 text-gray-500 text-sm">
                Posted {moment(jobData.date).fromNow()}
              </p>
            </div>
          </div>

          {/* Job Description Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16 px-6 sm:px-10 mb-6">
            {/* Job Description */}
            <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="font-bold text-2xl mb-4 text-gray-800">
                Job Description
              </h2>
              <div
                className="job-description space-y-6 text-sm sm:text-base text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: jobData.description }}
              ></div>
              <button className="mt-10 bg-blue-600 hover:bg-blue-700 transition-colors duration-200 px-5 py-2.5 text-white font-medium rounded-lg cursor-pointer shadow-md">
                Apply Now
              </button>
            </div>

            {/* More Jobs Section */}
            <div className="w-full lg:w-1/3">
              <h2 className="font-bold text-2xl mb-4 text-gray-800">
                More Jobs from {jobData.companyId.name}
              </h2>
              <div className="space-y-6">
                {jobs
                  .filter(
                    (job) =>
                      job._id !== jobData._id &&
                      job.companyId._id === jobData.companyId._id
                  )
                  .slice(0, 3)
                  .map((job, index) => (
                    <JobCard key={index} job={job} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default ApplyJob;
