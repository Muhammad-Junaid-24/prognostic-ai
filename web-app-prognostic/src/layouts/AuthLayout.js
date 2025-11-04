import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import ClientsAI from "../assets/icons/favicon.png";
import image1 from "../assets/auth1.png";
import Login from "../assets/bannerTest.png";
import ResetPassword from "../assets/banner1.png";
import SignUp from "../assets/banner2.png";

function AuthLayout() {
  const location = useLocation();

  const isLogin = location.pathname === "/";
  const isSignUp = location.pathname === "/signup";
  const isResetPassword = location.pathname === "/forget-password";

  let bannerImage;
  let bannerAlt;
  if (isLogin) {
    bannerImage = Login;
    bannerAlt = "Login Visual";
  } else if (isSignUp) {
    bannerImage = SignUp;
    bannerAlt = "Sign Up Visual";
  } else if (isResetPassword) {
    bannerImage = ResetPassword;
    bannerAlt = "Reset Password Visual";
  } else {
    bannerImage = image1;
    bannerAlt = "Authentication Visual";
  }

  let toggleButtonText;
  // let toggleButtonLink;
  if (isLogin) {
    toggleButtonText = "Login";
    // toggleButtonLink = "/signup";
  } else if (isSignUp) {
    toggleButtonText = "Signup";
    // toggleButtonLink = "/";
  } else if (isResetPassword) {
    toggleButtonText = "Reset Password";
    // toggleButtonLink = "/";
  } else {
    toggleButtonText = "Signup";
    // toggleButtonLink = "/signup";
  }

  return (
    <div className="h-screen w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 p-4 md:p-10 lg:px-14 relative">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        {/* <Link to={toggleButtonLink}> */}
          <button className="flex min-w-[120px] items-center justify-between border border-gray-300 text-gray-700 rounded-md">
            <span className="px-4 my-2 text-sm">{toggleButtonText}</span>
            <span className="bg-gray-600 text-white rounded-r-md flex items-center justify-center w-9 h-9 p-1">
              <img
                src={ClientsAI}
                alt="Authentication Visual"
                className="h-full w-full object-contain"
              />
            </span>
          </button>
        {/* </Link> */}
      </div>

      <div className="w-full flex flex-col justify-center items-center relative">
        <div className="w-full max-w-xl text-left">
          <Outlet />
        </div>
      </div>

      <div className="hidden md:flex items-center justify-center">
        <img
          src={bannerImage}
          alt={bannerAlt}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

export default AuthLayout;
