import React from "react";
import { useNavigate } from "react-router-dom";
import webScan from "assets/pngs/Website-Scan.png";
import Quiz from "assets/pngs/Group.png";

const CreateCampaignModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null; // Don't render if modal is not open

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // Close modal when clicking outside
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing on content click
      >
        {/* Text in the center */}
        <h2 className="text-center text-xl md:text-2xl font-semibold mb-6 text-[#000000]">
          Build High-Converting Opt-Ins <br /> for Every Lead
        </h2>
        <div className="flex flex-col md:flex-row justify-around items-center gap-6">
          {/* First Section */}
          <div className="flex flex-col justify-between items-center p-6 rounded-md w-full md:w-[43.3333%] h-[250px] gap-4">
            {/* Image */}
            <img src={Quiz} alt="Fill Out Offer Details" className="w-28" />
            {/* Button */}
            <button
              onClick={() => navigate("/quiz-form")}
              className="w-full py-1 bg-white text-[#252525] border-2 border-[#D9D9D9] rounded-md hover:bg-[#252525] hover:text-white transition"
            >
              Fill Out Offer Details
            </button>
          </div>

          {/* Divider Line */}
          <div className="w-px bg-[#E6EFF5]  h-[200px]  hidden md:block  border-[#D9D9D9] "></div>

          {/* Second Section */}
          <div className="flex flex-col justify-between items-center p-6 rounded-md w-full md:w-[43.3333%] h-[250px] gap-4">
            {/* Image */}
            <img src={webScan} alt="Continue with Webcam" className="w-28" />
            {/* Button */}
            <button
              onClick={() => navigate("/webscan-form")}
              className="w-full py-1 bg-white text-[#252525] border-2 border-[#D9D9D9] rounded-md hover:bg-[#252525] hover:text-white transition"
            >
              Continue with Webcam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignModal;
