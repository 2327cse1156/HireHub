import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";
import Footer from "../components/Footer";
const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);

  const [resume, setResume] = useState(null);
  return (
    <div>
      <>
        <Navbar />
        <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <div className="mb-6">  <h2 className="text-xl font-semibold">Your Resume</h2>
          <div className=" flex gap-2 mb-6 mt-3">
            {isEdit ? (
              <>
                <label className="flex items-center" htmlFor="resumeUpload">
                  <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2 cursor-pointer">
                    Select Resume
                  </p>
                  <input
                    id="resumeUpload"
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setResume(e.target.files[0])}
                    hidden
                  />
                  <img className="w-5 h-5" src={assets.profile_upload_icon} alt="" />
                </label>
                <button
                  onClick={(e) => setIsEdit(false)}
                  className="bg-green-100 border border-green-400 rounded-lg px-4 py-2"
                >
                  Save
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <a
                  href=""
                  className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
                >
                  Resume
                </a>
                <button
                  className="text-gray-500 border border-gray-300 rounded-lg px-4 py-2"
                  onClick={() => setIsEdit(true)}
                >
                  Edit
                </button>
              </div>
            )}</div>
          </div>
          <h2 className="text-xl font-semibold mb-4">Jobs Applied</h2>
          <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b text-left">Company</th>
                <th className="py-3 px-4 border-b text-left">Job Title</th>
                <th className="py-3 px-4 border-b text-left max-sm:hidden sm:table-cell">Location</th>
                <th className="py-3 px-4 border-b text-left max-sm:hidden sm:table-cell">Date</th>
                <th className="py-3 px-4 border-b text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {jobsApplied.map((job, index) =>
                true ? (
                  <tr key={index} className="hover:bg-gray-100 transition-all duration-200">
                    <td className="py-3 px-4 flex items-center gap-2 border-b">
                      <img className="w-8 h-8 rounded-full" src={job.logo} alt="" />
                      {job.company}
                    </td>
                    <td className="py-2 px-4  border-b">{job.title}</td>
                    <td className="py-2 px-4  gap-2 border-b max-sm:hidden sm:table-cell">{job.location}</td>
                    <td className="py-2 px-4 gap-2 border-b max-sm:hidden sm:table-cell">{moment(job.date).format("ll")}</td>
                    <td className="py-2 px-4  gap-2 border-b">
                      <span className={`${job.status === "Accepted" ? "bg-green-100 text-green-600" : job.status === "Rejected" ? "bg-red-100 text-red-600" :"bg-blue-100 text-blue-600"} px-4 py-1.5 rounded`}>{job.status}</span></td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
          </div>
        </div>
        <Footer/>
      </>
    </div>
  );
};

export default Applications;
