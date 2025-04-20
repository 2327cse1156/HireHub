import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import kConvert from "k-convert";
import moment from "moment";
const ApplyJob = () => {
  const { id } = useParams();

  const [jobData, setJobData] = useState(null);

  const { jobs } = useContext(AppContext);
  const fetchJob = async () => {
    const data = jobs.filter((job) => job._id === id);
    if (data.length !== 0) {
      setJobData(data[0]);
      console.log(data[0]);
    }
  };

  useEffect(() => {
    if (jobs.length > 0) {
      fetchJob();
    }
  }, [id, jobs]);
  return jobData ? (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col py-10 container px-4 sm:px-6 xl:px-20 mx-auto animate-fade-in">
        <div className="bg-white text-black rounded-lg w-full shadow-md transition-all duration-500">
          <div className="flex justify-between flex-col md:flex-row flex-wrap gap-8 px-6 sm:px-10 py-10 mb-6 bg-sky-50 border border-sky-300 rounded-xl">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <img className="h-24 w-24 object-contain bg-white rounded-lg p-4 shadow border" src={jobData.companyId.image} alt="" />
              <div className="text-center md:text-left text-neutral-700">
                <h1 className="text-gray-800 text-2xl sm:text-3xl font-semibold">{jobData.title}</h1>
                <div className="flex items-center gap-1">
                  <span className="flex items-center gap-1">
                    <img className="w-4 h-4" src={assets.suitcase_icon} alt="" />
                    {jobData.companyId.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <img className="w-4 h-4" src={assets.location_icon} alt="" />
                    {jobData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <img className="w-4 h-4" src={assets.person_icon} alt="" />
                    {jobData.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <img className="w-4 h-4" src={assets.money_icon} alt="" />
                    CTC: {kConvert.convertTo(jobData.salary)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center text-end max-md:mx-auto max-md:text-center">
              <button className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 px-5 py-2.5 text-white font-medium rounded cursor-pointer shadow">Apply Now</button>
              <p className="mt-2 text-gray-500 text-sm ">Posted {moment(jobData.date).fromNow()}</p>
            </div>
          </div>

          {/* new */}
          <div className="flex flex-col lg:flex-row justify-between items-start">
            <div className="w-full lg:w-2/3">
              <h2 className="font-bold text-2xl mb-4">Job Description</h2>
              <div className="rich-text" dangerouslySetInnerHTML={{__html:jobData.description}}>
              </div>
              <button className=" mt-10 bg-blue-600 hover:bg-blue-700 transition-colors duration-200 px-5 py-2.5 text-white font-medium rounded cursor-pointer shadow">Apply Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ApplyJob;
