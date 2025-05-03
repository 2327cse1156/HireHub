import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

// Create Context
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { user } = useUser();

  // Global States
  const [searchFilter, setSearchFilter] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [companyToken, setCompanyToken] = useState(localStorage.getItem("companyToken") || "");
  const [companyData, setCompanyData] = useState({});
  const [userData, setUserData] = useState({});
  const [userApplications, setUserApplications] = useState([]);

  // Fetch all job listings
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/jobs`);
      setJobs(data.jobs || []);
    } catch (err) {
      console.error("Failed to fetch jobs:", err.message);
    }
  };

  // Fetch logged-in recruiter data
  const fetchCompanyData = async () => {
    if (!companyToken) return;

    try {
      const { data } = await axios.get(`${backendUrl}/api/company/company`, {
        headers: {
          Authorization: `Bearer ${companyToken}`,
        },
      });
      setCompanyData(data.company || {});
    } catch (err) {
      console.error("Failed to fetch company data:", err.message);
    }
  };

  // Fetch user data
  const fetchUserData = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    try {
      const { data } = await axios.post(`${backendUrl}/api/users/userdata`, {
        email: user.primaryEmailAddress.emailAddress,
      });
      setUserData(data.user);
    } catch (err) {
      console.error("Failed to fetch user data:", err.message);
    }
  };



  // Initial data load
  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    fetchCompanyData();
  }, [companyToken]);

  useEffect(() => {
    if (user) {
      fetchUserData();

    }
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        backendUrl,
        searchFilter,
        setSearchFilter,
        isSearched,
        setIsSearched,
        jobs,
        showRecruiterLogin,
        setShowRecruiterLogin,
        companyToken,
        setCompanyToken,
        companyData,
        setCompanyData,
        userData,
        userApplications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
