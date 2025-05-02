import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";
import AddJob from "./pages/AddJob";
import ManageJobs from "./pages/ManageJobs";
import ViewApplications from "./pages/ViewApplications";
import Dashboard from "./pages/Dashboard";

import RecruiterLogin from "./components/RecruiterLogin";
import { AppContext } from "./context/AppContext";

import { Toaster } from "react-hot-toast";
import "quill/dist/quill.snow.css";

const RequireCompanyAuth = ({ children }) => {
  const { companyToken } = useContext(AppContext);
  return companyToken ? children : <Navigate to="/" />;
};

const App = () => {
  const { showRecruiterLogin } = useContext(AppContext);

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />

      {showRecruiterLogin && <RecruiterLogin />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/applications" element={<Applications />} />

        <Route
          path="/dashboard"
          element={
            <RequireCompanyAuth>
              <Dashboard />
            </RequireCompanyAuth>
          }
        />
        <Route
          path="/dashboard/add-job"
          element={
            <RequireCompanyAuth>
              <AddJob />
            </RequireCompanyAuth>
          }
        />
        <Route
          path="/dashboard/manage-jobs"
          element={
            <RequireCompanyAuth>
              <ManageJobs />
            </RequireCompanyAuth>
          }
        />
        <Route
          path="/dashboard/view-applications"
          element={
            <RequireCompanyAuth>
              <ViewApplications />
            </RequireCompanyAuth>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
