import React, { useContext, useEffect, useState, useCallback } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RecruiterLogin = () => {
  const [authMode, setAuthMode] = useState("Login"); // "Login" or "Sign Up"
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logo, setLogo] = useState(null);
  const [showImageUploadStep, setShowImageUploadStep] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } = useContext(AppContext);

  const getButtonText = () => {
    if (authMode === "Login") return "Login";
    return showImageUploadStep ? "Create Account" : "Next";
  };

  const onSubmitHandler = useCallback(async (e) => {
    e.preventDefault();

    if (authMode === "Sign Up" && !showImageUploadStep) {
      return setShowImageUploadStep(true);
    }

    setLoading(true);

    try {
      if (authMode === "Login") {
        const { data } = await axios.post(`${backendUrl}/api/company/login`, {
          email,
          password,
        });

        if (data.success) {
          setCompanyData(data.company); // ✅ fixed typo 'cmpany'
          setCompanyToken(data.token);
          localStorage.setItem("companyToken", data.token);
          localStorage.setItem("companyData", JSON.stringify(data.company));
          setShowRecruiterLogin(false);
          navigate("/dashboard");
        } else {
          toast.error(data.message);
        }
      } else {
        const formData = new FormData();
        formData.append("name", companyName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", logo);

        const { data } = await axios.post(`${backendUrl}/api/company/register`, formData);

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem("companyToken", data.token);
          localStorage.setItem("companyData", JSON.stringify(data.company));
          setShowRecruiterLogin(false);
          navigate("/dashboard");
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }, [authMode, email, password, companyName, logo, showImageUploadStep, backendUrl]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="absolute inset-0 z-10 backdrop-blur-sm flex justify-center items-center bg-black/30">
      <form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500 w-full max-w-sm"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-semibold">
          Recruiter {authMode}
        </h1>
        <p className="text-sm text-center mb-4">Welcome! Please {authMode === "Login" ? "sign in" : "register"} to continue</p>

        {authMode === "Sign Up" && showImageUploadStep ? (
          <div className="flex items-center gap-4 my-6">
            <label htmlFor="logo">
              <img
                className="w-16 h-16 rounded-full object-cover cursor-pointer"
                src={logo ? URL.createObjectURL(logo) : assets.upload_area}
                alt="Upload company logo"
              />
              <input
                type="file"
                id="logo"
                hidden
                accept="image/*"
                onChange={(e) => setLogo(e.target.files[0])}
              />
            </label>
            <p>Upload Company Logo</p>
          </div>
        ) : (
          <>
            {authMode === "Sign Up" && (
              <div className="border px-4 py-2 flex items-center gap-2 mt-5 rounded-full">
                <img src={assets.person_icon} alt="" />
                <input
                  type="text"
                  className="outline-none text-sm w-full"
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="border px-4 py-2 flex items-center gap-2 mt-5 rounded-full">
              <img src={assets.email_icon} alt="" />
              <input
                type="email"
                className="outline-none text-sm w-full"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="border px-4 py-2 flex items-center gap-2 mt-5 rounded-full">
              <img src={assets.lock_icon} alt="" />
              <input
                type="password"
                className="outline-none text-sm w-full"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </>
        )}

        {authMode === "Login" && (
          <p className="text-sm text-blue-600 my-3 cursor-pointer text-center">
            Forgot Password?
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 w-full text-white py-2 rounded-full mt-4 transition duration-200 ${
            loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {loading ? "Please wait..." : getButtonText()}
        </button>

        <p className="mt-5 text-center text-sm">
          {authMode === "Login" ? (
            <>
              Don't have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => {
                  setAuthMode("Sign Up");
                  setShowImageUploadStep(false);
                }}
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setAuthMode("Login")}
              >
                Login
              </span>
            </>
          )}
        </p>

        <img
          src={assets.cross_icon}
          alt="Close"
          onClick={() => setShowRecruiterLogin(false)}
          className="absolute top-5 right-5 w-5 h-5 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default RecruiterLogin;
