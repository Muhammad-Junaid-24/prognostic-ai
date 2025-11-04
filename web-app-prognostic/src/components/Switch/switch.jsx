import React from "react";

const CustomSwitch = ({ isToggled, onToggle }) => {
  return (
    <div
      onClick={onToggle}
      className={`w-16 h-8 bg-[#E5EAF1] flex items-center rounded-full cursor-pointer transition-colors`}
    >
      <div
        className={`w-6 h-6  rounded-full shadow-md transform transition-transform ${
          isToggled ? "translate-x-8 bg-[#252525]" : "translate-x-2 bg-gray-500"
        }`}
      ></div>
    </div>
  );
};

export default CustomSwitch;
