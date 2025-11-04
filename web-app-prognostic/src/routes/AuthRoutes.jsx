import { lazy } from "react";


const LoginPage = lazy(() => import("../pages/Auth/LoginPage"));
const SignupPage = lazy(() => import("../pages/Auth/SignupPage"));
const SignupOtpPage = lazy(() => import("../pages/Auth/SignupOtpPage"));
const VerificationSuccessPage = lazy(() => import("../pages/Auth/VerificationSuccessPage"));
const ForgetPasswordPage = lazy(() => import("../pages/Auth/ForgetPasswordPage"));
const RenewPasswordPage = lazy(() => import("../pages/Auth/RenewPasswordPage"));
const PasswordSuccessPage = lazy(() => import("../pages/Auth/PasswordSuccessPage"));




const authRoutes = [
  { path: "/", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/signup/confirmation", element: <SignupOtpPage /> },
  { path: "/signup/success", element: <VerificationSuccessPage /> },
  { path: "/forget-password", element: <ForgetPasswordPage /> },
  { path: "/forget-password/reset", element: <RenewPasswordPage /> },
  { path: "/forget-password/success", element: <PasswordSuccessPage /> },

];

export default authRoutes;
