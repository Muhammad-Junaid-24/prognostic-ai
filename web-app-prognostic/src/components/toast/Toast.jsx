import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Toast({ message, type, position, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColorMap = {
    success:
      "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200",
    error: "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200",
    info: "bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200",
    warning:
      "bg-yellow-100 text-yellow-500 dark:bg-yellow-800 dark:text-yellow-200",
  };

  const iconPathMap = {
    success:
      "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z",
    error:
      "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm-1 4h2v6h-2V4Zm0 8h2v2h-2v-2Z",
    info: "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm-1 4h2v6h-2V4Zm0 8h2v2h-2v-2Z",
    warning:
      "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm1 4h-2v2h2v-2Zm0 4h-2v2h2v-2Z",
  };

  // Explicit fallback for clarity:
  const toastType = type || "success"; // Use incoming type if available, else default to "success".
  const bgColor = bgColorMap[toastType];
  const iconPath = iconPathMap[toastType];

  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  };

  const positionClass =
    positionClasses[position] || positionClasses["top-right"];

  return (
    visible && (
      <div
        className={`fixed ${positionClass} z-50 flex items-center p-4 space-x-4 rounded-lg shadow-lg transition-opacity ease-in-out duration-300 ${bgColor}`}
      >
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg">
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d={iconPath} />
          </svg>
          <span className="sr-only">Toast Icon</span>
        </div>
        <span className="font-medium">{message}</span>
        <button
          className="text-gray-400 text-3xl hover:text-gray-900 dark:hover:text-white"
          onClick={() => {
            setVisible(false);
            onClose();
          }}
        >
          ×
        </button>
      </div>
    )
  );
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "info", "warning"]),
  position: PropTypes.oneOf([
    "top-right",
    "top-left",
    "bottom-right",
    "bottom-left",
  ]),
  onClose: PropTypes.func.isRequired,
};

Toast.defaultProps = {
  type: "success",
  position: "top-right",
};

export default Toast;
