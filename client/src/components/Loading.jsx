import React from "react";
import { assets } from "../assets/assets"; // Assuming a spinner icon exists here

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] py-10 text-center">
      <img
        src={assets.spinner_icon} // Replace with an actual spinner icon or loader gif
        alt="Loading spinner"
        className="w-12 h-12 mb-4 animate-spin"
      />
      <p className="text-gray-600 text-sm sm:text-base">{message}</p>
    </div>
  );
};

export default Loading;
