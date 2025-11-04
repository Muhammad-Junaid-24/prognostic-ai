import React from "react";
import WebScan from "assets/icons/webScanImg.svg";
import FillForm from "assets/icons/fillFormImg.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { populateFormData } from "store/Slices/formSlice";
import { fetchPrimaryCompany } from "services/actions/companyDetails";

const CampaignTypeSelectModal = ({ isOpen, onClose }) => {
  const { step1Data, step2Data, step4Data, step5Data } = useSelector(
    (state) => state.form
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleOptionClick = async (option) => {
    if (option === "webscan") {
      navigate("/webscan-campaign-form");
      return;
    }
  
    if (option === "quiz") {
      navigate("/quiz-campaign-form", { state: { isPrimary: true } });
      return;
    }
  
    const isStep1Empty = !step1Data || !step1Data.companyId;
    const isStep2Empty = !step2Data || !step2Data.primaryGoal;
    const isStep4Empty = !step4Data || !step4Data.offers?.length;
    const isStep5Empty = !step5Data;
  
    const needsFetching =
      isStep1Empty || isStep2Empty || isStep4Empty || isStep5Empty;
  
    if (needsFetching) {
      try {
        const response = await fetchPrimaryCompany();
        if (response.success) {
          dispatch(populateFormData(response.data));
        } else {
          console.error(
            "Failed to fetch primary company details:",
            response.message
          );
          return;
        }
      } catch (error) {
        console.error("Error fetching primary company details:", error);
        return;
      }
    }
  
    navigate("/quiz-form", { state: { isPrimary: true } });
  };
  

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-lg shadow-lg p-8 w-[90%] md:w-[50%] h-3/4 space-y-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-evenly h-3/4 items-center gap-8">
          <div className="flex flex-col items-center justify-center w-1/2">
            <img src={FillForm} alt="Fill out offer details" loading="lazy" />
          </div>
          <div className="h-4/5 w-[1px] bg-gray-100"></div>
          <div className="flex flex-col items-center justify-center w-1/2">
            <img src={WebScan} alt="Continue with Webcam" loading="lazy" />
          </div>
        </div>
        <div className="flex justify-evenly gap-4 md:gap-16">
          <button   
          // onClick={() => handleOptionClick("quiz")}         
            className="border border-gray-200 w-full md:w-96 hover:bg-gray-100 text-[#252525] py-2 px-4 rounded transition"
          >
            Create A Quiz
          </button>
          <button
            onClick={() => handleOptionClick("webscan")}
            className="bg-[#252525] w-full md:w-96 hover:bg-[#929292] text-white py-4 px-4 rounded transition"
          >
            New Campaign
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignTypeSelectModal;
