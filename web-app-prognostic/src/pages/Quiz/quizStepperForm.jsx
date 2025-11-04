import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetQuizSteps } from "./quizStepsConfig";
import { setCurrentStep } from "store/Slices/quizSlice";

const QuizStepperForm = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.quiz.currentStep);
  const steps = GetQuizSteps();

  const handlePrevious = () => {
    if (currentStep > 0) {
      dispatch(setCurrentStep(currentStep - 1));
    }
  };

  const renderForm = () => {
    const StepComponent = steps[currentStep].component;
    return <StepComponent handlePrevious={handlePrevious} />;
  };

  return <div className="mx-auto">{renderForm()}</div>;
};

export default QuizStepperForm;
