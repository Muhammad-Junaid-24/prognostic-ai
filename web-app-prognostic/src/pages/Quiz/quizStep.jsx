import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuizStepAnswer,
  setCurrentStep,
  resetQuizForm,
} from "store/Slices/quizSlice";
import PrognosticLogo from "assets/logos/Prognostic-AI.png";
import Toast from "components/toast/Toast";
import { useNavigate } from "react-router-dom";

const QuizStep = ({ questionData, stepIndex, stepsCount }) => {
  const [toastMessage, setToastMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quizData = useSelector((state) => state.quiz.quizStepData);
  const currentAnswer = quizData[stepIndex]?.answer;

  const handleOptionClick = (option) => {
    dispatch(
      setQuizStepAnswer({
        stepIndex,
        data: {
          question: questionData.question,
          answer: option,
        },
      })
    );
  };

  const handleInputChange = (e) => {
    dispatch(
      setQuizStepAnswer({
        stepIndex,
        data: {
          question: questionData.question,
          answer: e.target.value,
        },
      })
    );
  };

  const handleNext = () => {
    if (stepIndex < stepsCount - 1) {
      dispatch(setCurrentStep(stepIndex + 1));
    } else {
      setToastMessage("Quiz submitted successfully!");
      setTimeout(() => {
        dispatch(resetQuizForm());
        setToastMessage("");
        navigate(`/quiz/success`);
      }, 3000);
    }
  };

  const handlePrevious = () => {
    if (stepIndex > 0) {
      dispatch(setCurrentStep(stepIndex - 1));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
      <div className="w-full max-w-[703px] text-center flex flex-col gap-9">
        <div className="flex justify-center mb-4">
          <img
            className="max-w-[364px] max-h-[60px] w-full h-full"
            src={PrognosticLogo}
            alt="Prognostic AI Logo"
          />
        </div>

        <h2 className="text-4xl font-bold mb-4">Quiz Name</h2>

        <div className="text-3xl font-semibold mb-6 gap-6 flex items-center">
          <span className="bg-[#25252533] text-[#252525] px-6 py-3 mb-4 rounded-full">
            {stepIndex + 1}
          </span>
          <div className="flex flex-col justify-start gap-4">
            <span className="text-start text-3xl leading-[32px]">
              {questionData.question}
            </span>
            <span className="text-sm text-start text-gray-500 mb-4">
              Choose the correct option
            </span>
          </div>
        </div>

        {questionData.options.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 mb-6">
            {questionData.options.map((option, index) => (
              <button
                key={index}
                className={`px-4 py-3 border rounded-lg font-semibold ${
                  currentAnswer === option
                    ? "bg-[#252525] text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-blue-100"
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <div className="mb-6">
            <input
              type={questionData.inputType || "text"}
              value={currentAnswer}
              onChange={handleInputChange}
              placeholder={`Enter your ${questionData.inputType || "answer"}`}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={stepIndex === 0}
            className={`px-6 py-2 border rounded-lg ${
              stepIndex === 0
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-white text-gray-800"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-[#252525] text-white rounded-lg hover:bg-blue-700"
          >
            {stepIndex === stepsCount - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizStep;
