import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import CampaignSuccess from "assets/icons/campaignSuccess.svg";
import CustomSwitch from "components/Switch/switch";

const StepperSuccess = () => {
  const { prognosticData } = useLocation().state;
  const [isClientsAi, setIsClientsAi] = useState(false);
  const [copyStatus, setCopyStatus] = useState("Copy"); 

  const embeddedHtml = prognosticData?.embeddedHtml || "<!-- No Embedded HTML Available -->";
  const clientsAiUrl = prognosticData?.clientsAiUrl || "No URL Available";

  const displayContent = isClientsAi ? clientsAiUrl : embeddedHtml;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(displayContent);
      setCopyStatus("Copied");
      setTimeout(() => setCopyStatus("Copy"), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      setCopyStatus("Failed");
      setTimeout(() => setCopyStatus("Copy"), 2000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-[800px] flex flex-col gap-4 justify-center items-center h-full w-full text-center">
        <h1 className="text-5xl font-bold mb-6 leading-[60.48px]">
          Build High-Converting Opt-Ins for Every Lead
        </h1>

        <div className="flex justify-center mb-6">
          <img
            src={CampaignSuccess}
            alt="campaign-success-icon"
            className="w-42 h-42"
          />
        </div>

        <div className="flex justify-center items-center space-x-4 mb-2">
          <span
            className={`text-base font-semibold ${
              !isClientsAi ? "text-[#0F172A]" : "text-[#606571]"
            }`}
          >
            HTML Embedded Code
          </span>
          <CustomSwitch
            isToggled={isClientsAi}
            onToggle={() => setIsClientsAi((prev) => !prev)}
          />
          <span
            className={`text-base font-semibold ${
              isClientsAi ? "text-[#0F172A]" : "text-[#606571]"
            }`}
          >
            ClientsAI Form Link
          </span>
        </div>

        <div className="border flex items-center w-[100%] border-gray-300 rounded-lg bg-gray-100 text-left p-4 relative max-h-[400px] overflow-auto">
          <pre className="text-sm whitespace-pre-wrap break-words w-full h-full">{displayContent}</pre>
          <button
            onClick={handleCopy}
            className="absolute top-3 right-2 bg-white border border-[#252525] text-xs py-1 px-3 rounded flex items-center justify-center transition"
          >
            {copyStatus === "Copy" && (
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <path
                  d="M10 8V7C10 6.05719 10 5.58579 10.2929 5.29289C10.5858 5 11.0572 5 12 5H17C17.9428 5 18.4142 5 18.7071 5.29289C19 5.58579 19 6.05719 19 7V12C19 12.9428 19 13.4142 18.7071 13.7071C18.4142 14 17.9428 14 17 14H16M7 19H12C12.9428 19 13.4142 19 13.7071 18.7071C14 18.4142 14 17.9428 14 17V12C14 11.0572 14 10.5858 13.7071 10.2929C13.4142 10 12.9428 10 12 10H7C6.05719 10 5.58579 10 5.29289 10.2929C5 10.5858 5 11.0572 5 12V17C5 17.9428 5 18.4142 5.29289 18.7071C5.58579 19 6.05719 19 7 19Z"
                  stroke="#464455"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {copyStatus === "Copied" && (
              <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                <circle cx="256" cy="256" r="246" stroke="#252525" fill="none" strokeWidth="20" />
                <polyline points="115.54 268.77 200.67 353.9 396.46 158.1" fill="none" stroke="#252525" strokeWidth="20" />
              </svg>
            )}
            <span className="ml-2">
              {copyStatus === "Copy" ? "Copy" : copyStatus === "Copied" ? "Copied!" : "Failed"}
            </span>
          </button>
        </div>

        <Link 
          to="/home" 
          className="my-4 bg-[#252525] text-white px-6 py-3 rounded-lg hover:bg-[#929292] transition-colors"
        >
          Go Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default StepperSuccess;
