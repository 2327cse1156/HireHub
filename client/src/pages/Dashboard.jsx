import React, {  useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
const Dashboard = () => {
  const navigate = useNavigate();
  const  {companyData,setCompanyData,setCompanyToken}=useContext(AppContext);

  // function to logout for company
  const logout = () =>{
    setCompanyToken(null)
    localStorage.removeItem("companyToken")
    setCompanyData(null)
    navigate("/")
  }

  useEffect(() =>{
    if(companyData){
      navigate("/dashboard/manage-jobs")
    }
  },[companyData])

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-2 w-full px-4 py-3 sm:px-6 hover:bg-gray-100 transition-colors duration-200
     ${isActive ? "bg-blue-100 border-r-4 border-blue-500 font-medium" : ""}`;
     
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="shadow py-4 bg-white z-20">
        <div className="px-5 flex justify-between items-center">
          <img
            onClick={() => navigate("/")}
            className="w-36 cursor-pointer"
            src={assets.logo}
            alt="HireHub Logo"
          />
           {companyData && (
            <div className="flex items-center gap-4">
           
            <p className="hidden sm:block text-gray-700">Welcome, {companyData.name}</p>
            <div className="relative group">
              <img
                className="w-9 h-9 object-cover border rounded-full"
                src={companyData.image}
                alt="Profile Icon"
              />
              <div className="absolute hidden group-hover:block top-12 w-32 bg-white border shadow-lg right-0 z-30 rounded">
                <ul className="text-sm text-gray-800">
                  <li onClick={logout} className="py-2 px-4 cursor-pointer hover:bg-gray-100">
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
           )}
          
        </div>
      </div>

      {/* Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="min-h-screen border-r w-60 bg-white">
          <ul className="flex flex-col pt-6 text-gray-800">
            <NavLink className={navLinkClasses} to="/dashboard/add-job">
              <img className="w-5 h-5" src={assets.add_icon} alt="Add Job" />
              <p className="sm:inline hidden">Add Job</p>
            </NavLink>

            <NavLink className={navLinkClasses} to="/dashboard/manage-job">
              <img className="w-5 h-5" src={assets.home_icon} alt="Manage Jobs" />
              <p className="sm:inline hidden">Manage Jobs</p>
            </NavLink>

            <NavLink className={navLinkClasses} to="/dashboard/view-applications">
              <img className="w-5 h-5" src={assets.person_tick_icon} alt="View Applications" />
              <p className="sm:inline hidden">View Applications</p>
            </NavLink>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
