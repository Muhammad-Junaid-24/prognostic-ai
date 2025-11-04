import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OTPInput from "../../components/auth/OtpInput";
import { verifyOtpApiCall } from "../../services/authApiService";

function SignupOtpPage() {
  const [otpValue, setOtpValue] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const userId = location?.state?.id;
  const isTrial = location?.state?.isTrial;

  const handleOtpChange = (value) => {
    setOtpValue(value);
  };

  const handleVerifyOTP = async () => {
    const otpverification = await verifyOtpApiCall(userId, otpValue);

    if (otpverification?.success) {
      setError("");

      navigate("/signup/success", { state: { userId, isTrial } });
    } else {
      setError(otpverification?.error.message);
    }
  };

  return (
    <div className="mt-32 2xl:mt-48 items-center justify-center flex flex-col gap-4  max-w-[375px] w-full mx-auto">
      <h1 className="text-3xl font-bold">Verification</h1>
      <div className="mt-10 mb-8">
        <svg
          width="134"
          height="134"
          viewBox="0 0 134 134"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle opacity="0.2" cx="67" cy="67" r="67" fill="#252525" />
          <circle cx="66.9997" cy="66.9997" r="44.6667" fill="#252525" />
          <g clip-path="url(#clip0_148_8847)">
            <path
              d="M77.6663 61.9998V56.2932C77.7236 53.4023 76.6334 50.6065 74.6344 48.5175C72.6354 46.4285 69.8902 45.2164 66.9997 45.1465C64.1091 45.2164 61.364 46.4285 59.365 48.5175C57.3659 50.6065 56.2757 53.4023 56.333 56.2932V61.9998H52.333V84.6665C52.333 85.3737 52.614 86.052 53.1141 86.5521C53.6142 87.0522 54.2924 87.3332 54.9997 87.3332H78.9997C79.7069 87.3332 80.3852 87.0522 80.8853 86.5521C81.3854 86.052 81.6663 85.3737 81.6663 84.6665V61.9998H77.6663ZM68.333 75.6398V79.3332H65.6663V75.5198C65.0172 75.1858 64.5018 74.6399 64.2056 73.9726C63.9094 73.3054 63.8503 72.5569 64.038 71.8515C64.2258 71.146 64.6491 70.5259 65.2377 70.0941C65.8264 69.6623 66.545 69.4448 67.2743 69.4776C68.0036 69.5104 68.6997 69.7916 69.2472 70.2745C69.7947 70.7575 70.1606 71.413 70.2842 72.1325C70.4078 72.852 70.2817 73.5921 69.9268 74.2301C69.5719 74.868 69.0095 75.3655 68.333 75.6398ZM74.9997 61.9998H58.9997V56.2932C58.9422 54.1095 59.7514 51.9918 61.2504 50.4029C62.7494 48.8139 64.8163 47.8829 66.9997 47.8132C69.183 47.8829 71.25 48.8139 72.749 50.4029C74.248 51.9918 75.0572 54.1095 74.9997 56.2932V61.9998Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_148_8847">
              <rect
                width="49.6296"
                height="49.6296"
                fill="white"
                transform="translate(42.1855 42.1851)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-lg font-bold">Enter the verification code </h2>
        <p>Verify your code we just send you to your email address</p>
      </div>

      <OTPInput
        onChange={handleOtpChange}
        className="otp-input bg-white"
        length={6}
      />
      {error && <span className="text-red-600 text-lg bg-white ">{error}</span>}
      <div className="mt-10 flex flex-col w-full">
        {/* <Link to={'/signup/success'} className="bg-prog-blue text-white text-center py-4 rounded-md">Verify</Link> */}
        <button
          className={`bg-prog-blue text-white text-center py-4 rounded-md ${otpValue.length < 6 && "bg-gray-600"
            }`}
          disabled={otpValue.length < 6}
          onClick={handleVerifyOTP}
        >
          Verify
        </button>
      </div>
    </div>
  );
}

export default SignupOtpPage;
