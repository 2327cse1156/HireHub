import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";
const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);

  const { user } = useUser();
  const { getToken } = useAuth();

  const [resume, setResume] = useState(null);

  const { backendUrl, userData, userApplications, fetchUserData,fetchUserApplications } =
    useContext(AppContext);

  const updateResune = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", resume);

      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + "api/users/update-resume",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        await fetchUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setIsEdit(false)
    setResume(null)
  };

  useEffect(() => {
    if (user) {
      fetchUserApplications();
    }
  }, [user]);
  return (
    <div>
      <>
        <Navbar />
        <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
          <div className="mb-6">
            {" "}
            <h2 className="text-xl font-semibold">Your Resume</h2>
            <div className=" flex gap-2 mb-6 mt-3">
              {isEdit|| userData && userData.resume === "" ? (
                <>
                  <label className="flex items-center" htmlFor="resumeUpload">
                    <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2 cursor-pointer">
                     {resume ? resume.name : "Select Resume"}
                    </p>
                    <input
                      id="resumeUpload"
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setResume(e.target.files[0])}
                      hidden
                    />
                    <img
                      className="w-5 h-5"
                      src={assets.profile_upload_icon}
                      alt=""
                    />
                  </label>
                  <button
                    onClick={updateResune}
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
              )}
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-4">Jobs Applied</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg">
              <thead>
                <tr>
                  <th className="py-3 px-4 border-b text-left">Company</th>
                  <th className="py-3 px-4 border-b text-left">Job Title</th>
                  <th className="py-3 px-4 border-b text-left max-sm:hidden sm:table-cell">
                    Location
                  </th>
                  <th className="py-3 px-4 border-b text-left max-sm:hidden sm:table-cell">
                    Date
                  </th>
                  <th className="py-3 px-4 border-b text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {jobsApplied.map((job, index) =>
                  true ? (
                    <tr
                      key={index}
                      className="hover:bg-gray-100 transition-all duration-200"
                    >
                      <td className="py-3 px-4 flex items-center gap-2 border-b">
                        <img
                          className="w-8 h-8 rounded-full"
                          src={job.companyId.image}
                          alt=""
                        />
                        {job.companyId.name}
                      </td>
                      <td className="py-2 px-4  border-b">{job.jobId.title}</td>
                      <td className="py-2 px-4  gap-2 border-b max-sm:hidden sm:table-cell">
                        {job.jobId.location}
                      </td>
                      <td className="py-2 px-4 gap-2 border-b max-sm:hidden sm:table-cell">
                        {moment(job.date).format("ll")}
                      </td>
                      <td className="py-2 px-4  gap-2 border-b">
                        <span
                          className={`${
                            job.status === "Accepted"
                              ? "bg-green-100 text-green-600"
                              : job.status === "Rejected"
                              ? "bg-red-100 text-red-600"
                              : "bg-blue-100 text-blue-600"
                          } px-4 py-1.5 rounded`}
                        >
                          {job.status}
                        </span>
                      </td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </>
    </div>
  );
};

export default Applications;
