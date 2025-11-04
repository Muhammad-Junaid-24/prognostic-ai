import { lazy } from "react";

// Lazy load the components

const PaymentChoicePage = lazy(() => import("../pages/Auth/PaymentChoicePage"));
const PaymentFailure = lazy(() => import("../pages/Payment/PaymentFailure"));
const PaymentSuccess = lazy(() => import("../pages/Payment/PaymentSuccess"));
const QuizResults = lazy(() => import("../pages/Quiz/quizResults"));
const ClientsAiFormPage = lazy(() => import("../pages/Form/ClientsAiForm"));

// const StepperForm = lazy(() => import("components/stepper/StepperForm"));


// Define public routes
const publicRoutes = [

  { path: "/payment-setup", element: <PaymentChoicePage /> },
  { path: "/payment-cancel", element: <PaymentFailure /> },
  { path: "/payment-success", element: <PaymentSuccess /> },
  { path: "/quiz-results", element: <QuizResults /> },
  { path: "/form/:companySlug", element: <ClientsAiFormPage /> },
  // { path: "/campaign-overeview", element: <CampaignTable /> },
  // { path: "/form", element: <StepperForm /> },
];

export default publicRoutes;
