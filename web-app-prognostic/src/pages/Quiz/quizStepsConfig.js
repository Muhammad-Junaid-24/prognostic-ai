import QuizStep from "./quizStep";
import { quizQuestions } from "./quizData";

export const GetQuizSteps = () => {
  return quizQuestions.map((questionData, index) => ({
    name: `Step ${index + 1}`,
    heading: `Quiz Question ${index + 1}`,
    component: (props) => (
      <QuizStep
        {...props}
        questionData={questionData}
        stepIndex={index}
        stepsCount={quizQuestions.length}
      />
    ),
  }));
};
