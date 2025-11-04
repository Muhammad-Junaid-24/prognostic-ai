import React, { useState, useEffect, useCallback } from "react";
import { useFormik } from "formik";
import Toast from "components/toast/Toast";
import UserIcon from "assets/pngs/settings/user.png";
import PasswordIcon from "assets/icons/lock.svg";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { SMTPSchema } from "utils/validations";
import {
  addSMTPConfiguration,
  getSMTPConfiguration,
} from "services/actions/smtp";

const SMTPSettings = () => {
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      serverAddress: "",
      port: "",
      encryptionType: "",
      username: "",
      password: "",
    },
    validationSchema: SMTPSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          smtpHost: values.serverAddress,
          smtpPort: parseInt(values.port, 10),
          smtpUser: values.username,
          smtpPassword: values.password,
          useSSL: values.encryptionType === "SSL",
        };

        await addSMTPConfiguration(payload);

        setToast({
          show: true,
          message: "SMTP settings saved successfully!",
          type: "success",
        });
      } catch (error) {
        console.error("Error saving SMTP settings: ", error);
        setToast({
          show: true,
          message: "Failed to save SMTP settings. Please try again.",
          type: "error",
        });
      }
    },
  });

  // useEffect(() => {
  //   const fetchSMTPSettings = async () => {
  //     try {
  //       const response = await getSMTPConfiguration();
  //       formik.setValues({
  //         serverAddress: response.smtpHost || "",
  //         port: response.smtpPort?.toString() || "",
  //         encryptionType: response.useSSL ? "SSL" : "TLS",
  //         username: response.smtpUser || "",
  //         password: response.smtpPassword || "",
  //       });
  //     } catch (error) {
  //       console.error("Error fetching SMTP settings: ", error);
  //       setToast((prevToast) => ({
  //         ...prevToast,
  //         show: true,
  //         message: "Failed to load SMTP settings. Please try again.",
  //         type: "error",
  //       }));
  //     }
  //   };
  
  //   fetchSMTPSettings();
  // }, []); // ✅ Empty dependency array prevents infinite re-renders
  

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full bg-white pb-8">
      <h3 className="text-xl font-semibold mb-6">SMTP Settings</h3>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Server Address */}

        <div className="relative w-96 max-w-full">
          <input
            type="text"
            name="serverAddress"
            placeholder="Server Address"
            value={formik.values.serverAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-96 p-2 border ${
              formik.touched.serverAddress && formik.errors.serverAddress
                ? "border-red-500"
                : "border-gray-300"
            } rounded-lg`}
          />
          {formik.touched.serverAddress && formik.errors.serverAddress && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.serverAddress}
            </p>
          )}
        </div>

        {/* Port */}
        <div className="relative w-96 max-w-full">
          <input
            type="text"
            name="port"
            placeholder="Port"
            value={formik.values.port}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-96 p-2 border ${
              formik.touched.port && formik.errors.port
                ? "border-red-500"
                : "border-gray-300"
            } rounded-lg`}
          />
          {formik.touched.port && formik.errors.port && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.port}</p>
          )}
        </div>

        {/* Encryption Type */}
        <div className="relative w-96 max-w-full">
          <select
            name="encryptionType"
            value={formik.values.encryptionType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-96 p-2 border ${
              formik.touched.encryptionType && formik.errors.encryptionType
                ? "border-red-500"
                : "border-gray-300"
            } rounded-lg`}
          >
            <option value="" label="Select encryption type" />
            <option value="SSL" label="SSL" />
            <option value="TLS" label="TLS" />
          </select>
          {formik.touched.encryptionType && formik.errors.encryptionType && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.encryptionType}
            </p>
          )}
        </div>

        {/* Username */}
        <div className="relative w-96 max-w-full">
          <div className="relative">
            <img
              src={UserIcon}
              alt="User Icon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-96 pl-10 p-2 border ${
                formik.touched.username && formik.errors.username
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg`}
            />
          </div>
          {formik.touched.username && formik.errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.username}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="relative w-96 max-w-full">
          <div className="relative">
            <img
              src={PasswordIcon}
              alt="Password Icon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-96 pl-10 pr-10 p-2 border ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg`}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-96 bg-[#252525] text-white font-medium py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </form>

      {/* Toast Notification */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </div>
  );
};

export default SMTPSettings;
