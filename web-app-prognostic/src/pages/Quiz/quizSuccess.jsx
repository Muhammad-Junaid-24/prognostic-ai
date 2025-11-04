import React from "react";
import CampaignSuccess from "assets/icons/campaignSuccess.svg";
import { useNavigate } from "react-router-dom";

const QuizSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-[800px] flex flex-col gap-12 justify-center items-center h-full w-full text-center">
        <h1 className="text-5xl font-bold mb-6 max-w-[600px] leading-[60.48px]">
          Thank you for completing the quiz
        </h1>

        <div className="flex justify-center mb-6">
          <img
            src={CampaignSuccess}
            alt="campaign-success-icon"
            className="w-42 h-42"
          />
        </div>
        <button
          onClick={() => navigate("/")}
          className="bg-[#252525] text-white w-full py-3 rounded-lg max-w-[400px] mt-14 hover:bg-blue-600 transition"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default QuizSuccess;
