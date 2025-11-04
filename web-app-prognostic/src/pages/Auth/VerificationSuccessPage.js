import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function VerificationSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location?.state?.userId;
  const isTrial = location?.state?.isTrial;

  const handleNavigate = () => {
    navigate("/payment-setup", { state: { userId, isTrial } });
  };

  return (
    <div className="mt-48 justify-center flex flex-col items-center h-full gap-4 max-w-[375px] w-full mx-auto">
      <svg
        width="165"
        height="165"
        viewBox="0 0 165 165"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          opacity="0.2"
          cx="82.4993"
          cy="82.4993"
          r="82.4993"
          fill="#252525"
        />
        <circle cx="82.5039" cy="82.4989" r="54.999" fill="#252525" />
        <path
          d="M102.817 67.1965C102.155 67.2162 101.528 67.4927 101.066 67.9673L74.8577 94.1761L66.4728 85.7913C66.2382 85.5469 65.9572 85.3518 65.6462 85.2174C65.3352 85.083 65.0006 85.012 64.6618 85.0086C64.323 85.0051 63.987 85.0693 63.6734 85.1973C63.3597 85.3254 63.0748 85.5147 62.8352 85.7543C62.5957 85.9938 62.4063 86.2788 62.2783 86.5924C62.1502 86.9061 62.086 87.2421 62.0895 87.5809C62.0929 87.9196 62.1639 88.2543 62.2983 88.5653C62.4327 88.8762 62.6279 89.1573 62.8722 89.3919L73.0574 99.577C73.5349 100.054 74.1825 100.323 74.8577 100.323C75.5329 100.323 76.1804 100.054 76.658 99.577L104.667 71.5679C105.035 71.2103 105.286 70.7498 105.388 70.2469C105.49 69.7439 105.437 69.222 105.237 68.7494C105.037 68.2769 104.699 67.8757 104.267 67.5986C103.835 67.3215 103.33 67.1814 102.817 67.1965Z"
          fill="white"
        />
      </svg>

      <h1 className="text-3xl font-bold">Verified!</h1>

      <div className="mt-10 flex flex-col w-full">
        <button
          onClick={handleNavigate}
          className="bg-prog-blue text-white text-center py-4 rounded-md"
        >
          Go to Payment Plan
        </button>
      </div>
    </div>
  );
}

export default VerificationSuccessPage;
