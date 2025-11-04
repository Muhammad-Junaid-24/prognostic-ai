import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal, Input, Form, message } from "antd";
import EditIcon from "assets/icons/editQuiz.svg";
import LimitExceed from "assets/icons/limitExceed.svg";
import { getQuizHandler, regenerateQuizHandler } from "services/actions/quiz";

const QuizHooks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizTitles = [], campaignData } = location.state || {};
  const [quizzes, setQuizzes] = useState(
    quizTitles.map((title, index) => ({
      id: index + 1,
      title: title,
    }))
  );
  const [loadingQuizId, setLoadingQuizId] = useState(null); // Track which quiz is being generated
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!localStorage.getItem('quizHookRegenerateCount')) {
      localStorage.setItem('quizHookRegenerateCount', '0');
    }
  }, []);

  const handleRegenerate = async () => {
    const currentCount = parseInt(localStorage.getItem('quizHookRegenerateCount') || '0');
    
    if (currentCount >= 3) {
      setShowModal(true); // Show limit exceed modal
      return;
    }

    setIsRegenerating(true);
    try {
      const response = await regenerateQuizHandler(campaignData);

      if (response.success) {
        // Increment and save the regenerate count
        localStorage.setItem('quizHookRegenerateCount', (currentCount + 1).toString());
        
        const newQuizTitles = response.quizTitles || [];

        const updatedQuizzes = newQuizTitles.map((title, index) => ({
          id: index + 1,
          title: title,
        }));
        setQuizzes(updatedQuizzes);

        navigate(location.pathname, {
          state: { ...location.state,quizTitles: newQuizTitles },
          replace: true,
        });

        message.success("Quiz hooks regenerated successfully!");
      } else {
        message.error(response.message || "Failed to regenerate quizzes.");
      }
    } catch (error) {
      console.error("Error regenerating quizzes:", error);
      message.error("Something went wrong while regenerating quizzes.");
    } finally {
      setIsRegenerating(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleEditClick = (quiz, index) => {
    setSelectedQuiz({ ...quiz, index });
    form.setFieldsValue({ title: quiz.title });
    setShowEditModal(true);
  };

  const handleGenerateClick = async (quiz) => {
    const payload = {
      ...campaignData,
      quizTitle: quiz.title,
    };

    setLoadingQuizId(quiz.id); 

    try {
      const response = await getQuizHandler(payload);
      if (response.success) {
        localStorage.setItem('quizHookRegenerateCount', '0');
        navigate("/quiz-hook", { state: { quizData: response.data } });
      }
    } catch (error) {
      console.error("Error generating quiz:", error);
      message.error(`Failed to generate quiz for "${quiz.title}".`);
    } finally {
      setLoadingQuizId(null); 
    }
  };

  const handleEditCancel = () => {
    setShowEditModal(false);
    setSelectedQuiz(null);
    form.resetFields();
  };

  const handleEditSubmit = async () => {
    try {
      const values = await form.validateFields();

      setQuizzes((prevQuizzes) => {
        const newQuizzes = [...prevQuizzes];
        newQuizzes[selectedQuiz.index] = {
          ...newQuizzes[selectedQuiz.index],
          title: values.title.trim(),
        };
        return newQuizzes;
      });

      const updatedQuizTitles = quizzes.map((quiz) => {
        if (quiz.id === selectedQuiz.id) {
          return values.title.trim();
        }
        return quiz.title;
      });

      navigate(location.pathname, {
        state: { ...location.state, quizTitles: updatedQuizTitles },
        replace: true,
      });

      setShowEditModal(false);
      setSelectedQuiz(null);
      form.resetFields();
      message.success("Quiz title updated successfully!");
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  useEffect(() => {
    if (!quizTitles.length) {
      setTimeout(() => {
        const defaultQuizzes = [
          { id: 1, title: "Quiz 1" },
          { id: 2, title: "Quiz 2" },
        ];
        setQuizzes(defaultQuizzes);
      }, 1000);
    }
  }, [quizTitles]);

  return (
    <div className="flex justify-center items-center min-h-screen mt-12 bg-white">
      <div className="max-w-[60%] w-full p-6 rounded-lg text-center">
        <h1 className="text-3xl font-bold mb-6">Quiz Hooks</h1>
        <div>
          {quizzes.map((quiz, index) => (
            <div
              key={index}
              className="flex justify-between items-center px-6 py-6 mb-4 bg-[#F8F8F8] rounded-lg"
            >
              <span className="text-xl font-medium whitespace-nowrap">
                {quiz.title}
              </span>
              <div className="flex gap-6 items-center">
                <button
                  className="text-[#252525] text-base flex gap-2 items-center font-semibold hover:underline transition"
                  onClick={() => handleEditClick(quiz, index)}
                >
                  <img
                    width={17}
                    src={EditIcon}
                    alt="Edit quiz"
                    className="mb-1"
                  />
                  Edit
                </button>
                <button
                  className={`bg-[#252525] text-white ${loadingQuizId ? "px-12":"px-2"} py-2 rounded-lg text-base font-medium transition flex justify-center items-center ${loadingQuizId && loadingQuizId !== quiz.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => handleGenerateClick(quiz)}
                  disabled={loadingQuizId !== null}
                >
                  {loadingQuizId === quiz.id ? (
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
                  ) : (
                    "Generate Quiz"
                  )}
                </button>
              </div>
            </div>
          ))}
           <div className="w-full flex justify-end items-center">
            <button
              className="bg-[#252525] text-white px-24 py-3 mt-6 rounded-lg shadow transition disabled:opacity-50 flex justify-center items-center"
              onClick={handleRegenerate}
              disabled={isRegenerating}
            >
              {isRegenerating ? (
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
              ) : (
                "Regenerate"
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Regenerate Limit Modal */}
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
      <Modal
        title={<span className="text-2xl">Edit Quiz Title</span>}
        open={showEditModal}
        centered
        onCancel={handleEditCancel}
        onOk={handleEditSubmit}
        okText="Save"
        cancelText="Cancel"
        okButtonProps={{
          style: {
            backgroundColor: "#252525",
          },
        }}
        cancelButtonProps={{
          style: {
            borderColor: "#252525", 
            color: "#252525",
          },
        }}
      >
        <Form form={form} layout="vertical" name="editQuizForm">
          <Form.Item
            name="title"
            label={<span className="text-lg">Quiz Title</span>}
            rules={[
              {
                required: true,
                message: "Please enter a quiz title",
              },
              {
                whitespace: true,
                message: "Title cannot be empty",
              },
            ]}
          >
            <Input placeholder="Enter quiz title" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default QuizHooks;
