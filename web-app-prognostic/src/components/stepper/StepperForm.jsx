import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { steps } from "components/stepper/stepsConfig"; 
import Stepper from "./stepper";
import { setCurrentStep } from "store/Slices/formSlice";

const StepperForm = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.form.currentStep);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      dispatch(setCurrentStep(currentStep + 1));
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      dispatch(setCurrentStep(currentStep - 1));
    }
  };

  const renderForm = () => {
    const StepComponent = steps[currentStep].component; 
    return (
      <StepComponent
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        currentStep={currentStep} 
        stepsCount={steps.length} 
      />
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-lg w-full min-h-screen flex justify-center items-center py-[3rem]">
      <div className="bg-white rounded-lg w-full">
        {/* Heading */}
        <h1 className="text-[36px] font-bold text-center mb-6">
          {steps[currentStep].heading}
        </h1>

        {/* Stepper */}
        <div className="bg-[#F8F8F8] w-full flex justify-center items-center my-[3rem]">
          <div className="max-w-[766px] w-full">
            <Stepper steps={steps.map((step) => step.name)} currentStep={currentStep} />
          </div>
        </div>

        {/* Form */}
        <div className="mb-6 w-[766px] mx-auto">{renderForm()}</div>
      </div>
    </div>
  );
};

export default StepperForm;