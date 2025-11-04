import { lazy } from "react";

const QuizHook = lazy(() => import("pages/AI-GEN-QUIZ/quizHook"));
const QuizHooks = lazy(() => import("pages/AI-GEN-QUIZ/quizHooks"));
const StepperSuccess = lazy(() => import("pages/StepperSuccess"));
const StepperForm = lazy(() => import("components/stepper/StepperForm"));

// const QuizStepperForm = lazy(() => import("pages/Quiz/quizStepperForm"));
// const QuizSuccess = lazy(() => import("pages/Quiz/quizSuccess"));

const PrivateStepperRoutes = [
  {
    path: "/quiz-form",
    element: <StepperForm />,
  },
 
  {
    path: "/ai-quiz-hooks",
    element: <QuizHooks />,
  },
  {
    path: "/quiz-hook",
    element: <QuizHook />,
  },
  {
    path: "/quiz-hook/success",
    element: <StepperSuccess />,
  },
  {
    path: "/webscan/success",
    element: <StepperSuccess />,
  },
  // {
  //   path: "/quiz-stepper-form",
  //   element: <QuizStepperForm />,
  // },
  // {
  //   path: "/quiz/success",
  //   element: <QuizSuccess />,
  // },
];

export default PrivateStepperRoutes;
