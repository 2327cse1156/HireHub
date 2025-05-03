import React, { useEffect, useRef, useState, useContext } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import { JobCategories, JobLocations } from "../assets/assets";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [category, setCategory] = useState("DevOps");
  const [level, setLevel] = useState("Intermediate level");
  const [salary, setSalary] = useState(0);
  const [description, setDescription] = useState("");

  const { backendUrl, companyToken } = useContext(AppContext);
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  // Handle job submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!title.trim() || !quillRef.current.root.innerHTML.trim()) {
      toast.error("Job title and description are required");
      return;
    }

    try {
      const jobDescription = quillRef.current.root.innerHTML;

      const { data } = await axios.post(
        `${backendUrl}/api/company/post-job`,
        {
          title,
          description: jobDescription,
          location,
          category,
          level,
          salary,
        },
        {
          headers: {
            Authorization: `Bearer ${companyToken}`, // Correct token format
          },
        }
      );

      if (data.success) {
        toast.success("🎉 Job posted successfully!");
        setTitle("");
        setLocation("Bangalore");
        setCategory("DevOps");
        setLevel("Intermediate level");
        setSalary(0);
        setDescription("");
        quillRef.current.root.innerHTML = ""; // Clear editor
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  // Initialize Quill editor
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write the job description here...",
      });

      quillRef.current.on("text-change", () => {
        setDescription(quillRef.current.root.innerHTML);
      });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold">Post a New Job</h2>

      {/* Job Title */}
      <div className="flex flex-col gap-2">
        <label className="font-medium">Job Title</label>
        <input
          type="text"
          placeholder="Type here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="px-4 py-2 border rounded-md border-gray-300 w-full"
        />
      </div>

      {/* Job Description */}
      <div className="flex flex-col gap-2">
        <label className="font-medium">Job Description</label>
        <div
          ref={editorRef}
          className="min-h-[160px] bg-white border border-gray-300 rounded-md p-2"
        />
      </div>

      {/* Job Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Category */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Job Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border rounded-md border-gray-300"
          >
            {JobCategories.map((cat, index) => (
              <option value={cat} key={index}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Job Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="px-4 py-2 border rounded-md border-gray-300"
          >
            {JobLocations.map((loc, index) => (
              <option value={loc} key={index}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Level */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Job Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="px-4 py-2 border rounded-md border-gray-300"
          >
            <option value="Beginner level">Beginner Level</option>
            <option value="Intermediate level">Intermediate Level</option>
            <option value="Senior level">Senior Level</option>
          </select>
        </div>

        {/* Salary */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Salary (₹)</label>
          <input
            type="number"
            min={0}
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="px-4 py-2 border rounded-md border-gray-300"
            placeholder="e.g. 25000"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="self-start bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
      >
        Add Job
      </button>
    </form>
  );
};

export default AddJob;
