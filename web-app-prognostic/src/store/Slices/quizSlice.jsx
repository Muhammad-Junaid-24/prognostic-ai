import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 0,
  quizStepData: [], // Array to hold question-answer objects
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setQuizStepAnswer: (state, action) => {
      const { stepIndex, data } = action.payload;
      state.quizStepData[stepIndex] = data; // Save the question and answer together
    },
    resetQuizForm: (state) => {
      state.quizStepData = [];
      state.currentStep = 0;
    },
  },
});

export const { setQuizStepAnswer, setCurrentStep, resetQuizForm } =
  quizSlice.actions;

export default quizSlice.reducer;
