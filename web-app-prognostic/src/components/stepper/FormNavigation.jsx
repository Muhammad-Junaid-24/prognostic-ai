import React from "react";

const FormNavigation = ({
  handlePrevious,
  handleNext,
  currentStep,
  stepsCount,
  disableNavigation,
}) => (
  <div className="flex justify-between mt-4">
    {currentStep > 0 && (
      <button
        type="button"
        onClick={handlePrevious}
        disabled={disableNavigation}
        className={`px-[6rem] py-[0.3rem] rounded-lg ${
          disableNavigation
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#252525] text-white"
        }`}
      >
        Back
      </button>
    )}
    {currentStep < stepsCount - 1 && (
      <button
        type="submit"
        disabled={disableNavigation}
        className={`px-[6rem] py-[0.3rem] rounded-lg ml-auto ${
          disableNavigation
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#252525] text-white"
        }`}
      >
        Next
      </button>
    )}
    {currentStep === stepsCount - 1 && (
      <button
        type="submit"
        disabled={disableNavigation}
        className={`flex items-center justify-center px-[6rem] py-[0.3rem] rounded-lg ${
          disableNavigation
            ? "cursor-not-allowed bg-[#252525] text-white"
            : "bg-[#252525] text-white"
        }`}
      >
        {disableNavigation ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
            ></path>
          </svg>
        ) :  <span>Submit</span>}
       
      </button>
    )}
  </div>
);

export default FormNavigation;
