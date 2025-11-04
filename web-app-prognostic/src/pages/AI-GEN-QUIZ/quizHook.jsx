import React, { useEffect, useState } from "react";
import EditIcon from "assets/icons/editQuiz.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { createQuizWithTypeForm, getQuizHandler } from "services/actions/quiz";
import { message } from "antd";
import LimitExceed from "assets/icons/limitExceed.svg";


const QuizHook = () => {
  const { quizData } = useLocation().state;
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);

  useEffect(() => {
    if (quizData && quizData.questions.length >= 13) {
      const firstTenQuestions = quizData.questions.slice(0, 10);
      const lastThreeQuestions = quizData.questions.slice(-3);
      setQuestions(firstTenQuestions);
      setAdditionalQuestions(lastThreeQuestions);
    }
  }, [quizData]);

  useEffect(() => {
    if (!localStorage.getItem('quizRegenerateCount')) {
      localStorage.setItem('quizRegenerateCount', '0');
    }
  }, []);

  const handleEditClick = (index, isAdditional = false) => {
    const questionToEdit = isAdditional
      ? additionalQuestions[index]
      : questions[index];

    setCurrentQuestion({
      ...questionToEdit,
      index,
      isAdditional,
      options: questionToEdit.options || [],
    });
    setIsModalOpen(true);
  };

  const handleRegenerateQuiz = async () => {
    const currentCount = parseInt(localStorage.getItem('quizRegenerateCount') || '0');

    if (currentCount >= 3) {
      setShowModal(true);
      return;
    }

    setIsRegenerating(true);
    try {
      const response = await getQuizHandler(quizData?.data);
      if (response.success) {
        localStorage.setItem('quizRegenerateCount', (currentCount + 1).toString());

        navigate("/quiz-hook", { state: { quizData: response.data } });
        message.success("Quiz regenerated successfully!");
      }
    } catch (error) {
      message.error("Failed to regenerate quiz");
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleCreateQuizWithTypeForm = async () => {
    try {
      const campaignPayload = {
        ...quizData,
      };
      setIsCreatingCampaign(true);
      const response = await createQuizWithTypeForm(campaignPayload);

      if (response.success) {
        message.success("Campaign created successfully!");
        setIsCreatingCampaign(false);
        localStorage.setItem('quizRegenerateCount', '0');
        navigate("/quiz-hook/success", { state: { prognosticData: response.data } });
      } else {
        message.error("Failed to create campaign.");
        setIsCreatingCampaign(false);
      }
    } catch (error) {
      console.error("Error creating campaign:", error);
      message.error("Error while creating campaign.");
    } finally {
      setIsCreatingCampaign(false);
    }
  };


  const handleSave = () => {
    let updatedQuestions = [...questions];
    let updatedAdditionalQuestions = [...additionalQuestions];

    if (currentQuestion.isAdditional) {
      updatedAdditionalQuestions = updatedAdditionalQuestions.map((q, i) =>
        i === currentQuestion.index ? currentQuestion : q
      );
      setAdditionalQuestions(updatedAdditionalQuestions);
    } else {
      updatedQuestions = updatedQuestions.map((q, i) =>
        i === currentQuestion.index ? currentQuestion : q
      );
      setQuestions(updatedQuestions);
    }

    const updatedQuizData = {
      ...quizData,
      questions: [...updatedQuestions, ...updatedAdditionalQuestions],
    };

    navigate(`/quiz-hook`, { state: { quizData: updatedQuizData } });

    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col gap-8 mt-12 items-center bg-white p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Quiz: {quizData?.title}</h1>

      {/* Main Questions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full max-w-[53%]">
        {questions.map((q, index) => (
          <div key={q.id} className="rounded-lg p-8 shadow-md">
            <div className="flex flex-col gap-4 justify-between items-start mb-6">
              <h2 className="text-xl font-semibold">
                {index + 1}. {q.question}
              </h2>
              <div className="flex items-center gap-4">
                <button
                  className="text-[#252525] flex gap-1 hover:underline"
                  onClick={() => handleEditClick(index, false)} // Pass the correct index
                >
                  <img
                    width={17}
                    src={EditIcon}
                    alt="edit-icon"
                    className="mb-1"
                  />
                  Edit Question
                </button>
                {/* <button className="text-white text-sm bg-[#252525] px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                  Regenerate
                </button> */}
              </div>
            </div>
            <div className="flex flex-wrap gap-8 justify-between items-center">
              {q.options.map((option, i) => (
                <div
                  key={i}
                  className="flex items-center text-[#000000] font-medium text-lg justify-center gap-2 border bg-[#25252514] border-gray-200 rounded-lg py-4 w-full max-w-[180px]"
                >
                  <span>{option.text}</span>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

      <div className="grid gap-6 w-full max-w-[53%] mt-10">
        {additionalQuestions.map((q, index) => (
          <div
            key={q.id}
            className="rounded-lg p-6 shadow-md flex justify-between items-center bg-white"
          >
            <h2 className="text-xl font-semibold">
              {index + 11}. {q.question} *
            </h2>

            <div className="flex gap-4">
              <button
                onClick={() => handleEditClick(index, true)}
                className="text-[#252525] flex items-center gap-2 hover:underline font-semibold"
              >
                <img
                  width={17}
                  src={EditIcon}
                  alt="edit-icon"
                  className="mb-1"
                />
                Edit Question
              </button>
              {/* <button className="text-white text-sm bg-[#252525] px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Regenerate
              </button> */}
            </div>
          </div>
        ))}
        <div className="w-full flex justify-between gap-4 mt-4">
          <button
            onClick={handleRegenerateQuiz}
            disabled={isRegenerating || isCreatingCampaign}
            className="w-[200px] bg-[#252525] text-white py-3 rounded-lg shadow hover:bg-blue-700 transition flex items-center justify-center"
          >
            {isRegenerating ? (
              <>
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
              </>
            ) : (
              'Regenerate Quiz'
            )}
          </button>
          <button
            disabled={isRegenerating || isCreatingCampaign}
            onClick={handleCreateQuizWithTypeForm}
            className="w-[200px] bg-[#252525] text-white py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Create Campaign
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg text-center shadow-lg w-[30%]">
            <div className="flex flex-col gap-4 items-center">
              <div className="mb-4">
                <img src={LimitExceed} alt="limit-exceed" />
              </div>
              <p className="text-xl font-semibold mb-4">
                The regenerate limit has been exceeded!
              </p>
              <button
                className="bg-[#252525] text-white w-full max-w-[250px] py-3 rounded-lg shadow hover:bg-blue-600 transition"
                onClick={closeModal}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-lg">
            <h2 className="text-3xl text-center font-bold mb-4">Edit Question</h2>
            <div className="flex flex-col gap-4">
              <div className="mb-4">
                <label className="block font-semibold text-xl mb-2">Question</label>
                <input
                  type="text"
                  name="question"
                  value={currentQuestion?.question || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-4"
                />
              </div>
              {/* Only show options if they exist */}
              {currentQuestion.options?.length > 0 && (
                <div className="mb-4">
                  <label className="block font-semibold text-xl mb-2">Options</label>
                  <div className="flex flex-col gap-2">
                    {currentQuestion.options.map((option, index) => (
                      <input
                        key={index}
                        type="text"
                        name={`option-${index}`}
                        value={option.text || ""}
                        onChange={(e) => {
                          const updatedOptions = [...currentQuestion.options];
                          updatedOptions[index] = { ...updatedOptions[index], text: e.target.value };
                          setCurrentQuestion((prev) => ({
                            ...prev,
                            options: updatedOptions,
                          }));
                        }}
                        className="w-full border border-gray-300 rounded-lg p-4 mb-2"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-[#252525] text-white px-8 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default QuizHook;
