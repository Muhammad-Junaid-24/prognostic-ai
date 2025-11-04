import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { FiEye, FiEyeOff } from "react-icons/fi";

const FormField = ({
  name,
  type = "text",
  placeholder,
  as = "input",
  rows,
  label,
  icon,
  iconClass = "",
  prefix = "",  // Added prefix prop
  children,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block mb-1 font-bold text-gray-700">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <img
            src={icon}
            alt={`${name}-icon`}
            className={`absolute left-3 h-6 ${
              disabled ? "text-gray-300" : "text-gray-400"
            } ${iconClass}`}
          />
        )}
        {prefix && (
          <span className="absolute left-1 px-2 py-2 border-r text-black font-semibold rounded-l-md">
            {prefix}
          </span>
        )}
        <Field
          as={as}
          id={name}
          name={name}
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          className={`block outline-0 focus:ring-0 focus:border-gray-300 w-full p-2 resize-none rounded-[4px] ${
            icon ? "pl-12" : prefix ? "pl-10" : ""
          } ${
            disabled
              ? "bg-gray-100 border-gray-300 text-gray-400"
              : "border-[#D9D9D9]"
          }`}
        />
        {type === "password" && !disabled && (
          <button
            type="button"
            className="absolute right-3 top-2.5 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};

export default FormField;
