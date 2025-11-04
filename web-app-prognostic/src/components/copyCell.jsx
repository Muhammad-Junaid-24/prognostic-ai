import React, { useState } from "react";

const CopyCell = ({ textToCopy, buttonClass = "", positionClass = "" }) => {
  const [copyStatus, setCopyStatus] = useState("Copy");

  const handleCopy = async (e) => {
    e.stopPropagation(); // prevents triggering row onClick
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopyStatus("Copied");
      // revert to "Copy" after 2 seconds
      setTimeout(() => setCopyStatus("Copy"), 2000);
    } catch (err) {
      setCopyStatus("Failed");
      setTimeout(() => setCopyStatus("Copy"), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`${buttonClass} ${positionClass} bg-white border border-[#252525] text-xs py-1 px-3 rounded flex items-center justify-center transition`}
    >
      {copyStatus === "Copy" && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
        >
          <path
            d="M10 8V7C10 6.05719 10 5.58579 10.2929 5.29289C10.5858 5 11.0572 5 12 5H17C17.9428 5 18.4142 5 18.7071 5.29289C19 5.58579 19 6.05719 19 7V12C19 12.9428 19 13.4142 18.7071 13.7071C18.4142 14 17.9428 14 17 14H16M7 19H12C12.9428 19 13.4142 19 13.7071 18.7071C14 18.4142 14 17.9428 14 17V12C14 11.0572 14 10.5858 13.7071 10.2929C13.4142 10 12.9428 10 12 10H7C6.05719 10 5.58579 10 5.29289 10.2929C5 10.5858 5 11.0572 5 12V17C5 17.9428 5 18.4142 5.29289 18.7071C5.58579 19 6.05719 19 7 19Z"
            stroke="#464455"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {copyStatus === "Copied" && (
        <svg
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
        >
          <circle
            cx="256"
            cy="256"
            r="246"
            stroke="#252525"
            fill="none"
            strokeWidth="20"
          />
          <polyline
            points="115.54 268.77 200.67 353.9 396.46 158.1"
            fill="none"
            stroke="#252525"
            strokeWidth="20"
          />
        </svg>
      )}
      {copyStatus === "Failed" && (
        // Example "X" or cross icon
        <svg
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
        >
          <line
            x1="114"
            y1="114"
            x2="398"
            y2="398"
            stroke="#252525"
            strokeWidth="20"
          />
          <line
            x1="398"
            y1="114"
            x2="114"
            y2="398"
            stroke="#252525"
            strokeWidth="20"
          />
        </svg>
      )}
      <span className="ml-2">
        {copyStatus === "Copy"
          ? "Copy"
          : copyStatus === "Copied"
          ? "Copied!"
          : "Failed"}
      </span>
    </button>
  );
};

export default CopyCell;
