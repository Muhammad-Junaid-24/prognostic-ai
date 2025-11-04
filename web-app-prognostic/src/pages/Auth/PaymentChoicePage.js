import React, { useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useLocation } from "react-router-dom";

const PaymentChoicePage = () => {
  const [isAnnually, setIsAnnually] = useState(true);
  const location = useLocation();
  const userId = location?.state?.userId;
  const isTrial = location?.state?.isTrial;


  const handleToggle = () => {
    setIsAnnually(!isAnnually);
  };


  const handleGetStarted = async () => {

    const plan = isAnnually ? "yearly" : "monthly";

    const payload = {
      userId,
      plan,
      ...(isTrial && { isTrial }),
    };

    try {
      const response = await fetch("https://be-prognostic.azurewebsites.net/payments/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data) {

        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Choose the Perfect Plan for Your Business
      </h1>

      <div className="flex items-center mb-8 space-x-4">
        <span className={isAnnually ? "text-black font-semibold" : "text-gray-400"}>Annually</span>
        <div
          className="relative inline-flex items-center cursor-pointer"
          onClick={handleToggle}
        >
          <span className={`w-14 h-8 bg-[#E5EAF1] rounded-full flex items-center transition ${isAnnually ? 'bg-prog-blue' : 'bg-[#E5EAF1]'}`}>
            <span className={`h-5 w-5  rounded-full shadow transform transition-transform ${isAnnually ? 'translate-x-2 bg-white' : 'translate-x-7 bg-prog-blue'}`}></span>
          </span>
        </div>

        <span className={isAnnually ? "text-gray-400" : "text-black font-semibold"}>Monthly</span>
      </div>

      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-md overflow-hidden max-w-screen-md mx-4">
        <div className="p-6 flex-1">
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex gap-4 items-center justify-center">
              <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="72" height="72" rx="16" fill="#ECEBFF" />
                <path d="M36 17C30.9609 17 26.1282 19.0018 22.565 22.565C19.0018 26.1282 17 30.9609 17 36C17 41.0391 19.0018 45.8718 22.565 49.435C26.1282 52.9982 30.9609 55 36 55L36 36V17Z" fill="#252525" />
                <path d="M36 55C41.0391 55 45.8718 52.9982 49.435 49.435C52.9982 45.8718 55 41.0391 55 36C55 30.9609 52.9982 26.1282 49.435 22.565C45.8718 19.0018 41.0391 17 36 17L36 36L36 55Z" fill="#B8B1FF" />
              </svg>

              <h2 className="font-semibold text-2xl">Basic</h2>
            </div>
          </div>
          <p className="text-gray-500 mb-4">
            Lorem ipsum dolor sit amet doloroli sitoli conse ctetur adipiscing elit.
          </p>
          <p className="text-gray-500 mb-4 ">
            <span className="text-3xl font-bold text-black"> ${isAnnually ? 80 : 100}</span> {isAnnually ? "per month, billed annually" : "per month"}
          </p>
          <button className="w-full bg-prog-blue text-white py-2 rounded-md" onClick={handleGetStarted}>
            Get started
          </button>
        </div>

        <div className="bg-[#F7F7FC] p-6 flex flex-col justify-center flex-1">
          <h3 className="font-semibold mb-2 text-center lg:text-left">Features</h3>
          <ul className="text-prog-blue">
            <li className="flex gap-2">
              <IoIosCheckmarkCircle className="bg-transparent text-prog-blue h-6 w-6" />
              Up to 10 Campaigns
            </li>
            <li className="flex gap-2">
              <IoIosCheckmarkCircle className="bg-transparent text-prog-blue h-6 w-6" />
              $0.10 per additional lead after 500 leads
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaymentChoicePage;
