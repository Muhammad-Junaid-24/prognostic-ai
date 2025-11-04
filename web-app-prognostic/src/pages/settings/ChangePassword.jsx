import React, { useState } from "react";
import { useFormik } from "formik";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { changePassword } from "../../services/actions/auth"; 
import { changePasswordSchema } from "utils/validations";
import PasswordIcon from "assets/icons/lock.svg";
import Toast from "components/toast/Toast"; 

const ChangePassword = () => {
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  }); // State for password visibility

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: changePasswordSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const payload = {
          oldPassword: values.currentPassword,
          newPassword: values.newPassword,
        };
        const response = await changePassword(payload);
        if (response?.success) {
          setToast({
            show: true,
            message: "Password updated successfully!",
            type: "success",
          });
          resetForm();
        } else {
          setToast({
            show: true,
            message: response?.message || "Failed to update password.",
            type: "error",
          });
        }
      } catch (error) {
        setToast({
          show: true,
          message: "An error occurred while updating the password.",
          type: "error",
        });
        console.error("Error updating password:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="w-full bg-white">
      <h2 className="text-xl font-semibold mb-6">Change Password</h2>

      <div className="border-t border-[#E6EFF5] my-4"></div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Current Password */}
        <div>
          {/* <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Current Password
          </label> */}
          <div className="relative w-96 max-w-full">
            <div className="relative flex items-center h-12">
              <img
                src={PasswordIcon}
                alt="password icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
              />
              <input
                type={showPassword.currentPassword ? "text" : "password"}
                name="currentPassword"
                id="currentPassword"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter current password"
                className={`w-full pl-12 pr-10 py-2 border ${
                  formik.touched.currentPassword && formik.errors.currentPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("currentPassword")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
              >
                {showPassword.currentPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {formik.touched.currentPassword && formik.errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.currentPassword}
              </p>
            )}
          </div>
        </div>

        {/* New Password */}
        <div>
          {/* <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            New Password (min 8 characters)
          </label> */}
          <div className="relative w-96 max-w-full">
            <div className="relative flex items-center h-12">
              <img
                src={PasswordIcon}
                alt="password icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
              />
              <input
                type={showPassword.newPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter new password"
                className={`w-full pl-12 pr-10 py-2 border ${
                  formik.touched.newPassword && formik.errors.newPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("newPassword")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
              >
                {showPassword.newPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.newPassword}
              </p>
            )}
          </div>
        </div>

        {/* Confirm New Password */}
        <div>
          {/* <label
            htmlFor="confirmNewPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm New Password
          </label> */}
          <div className="relative w-96 max-w-full">
            <div className="relative flex items-center h-12">
              <img
                src={PasswordIcon}
                alt="password icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
              />
              <input
                type={showPassword.confirmNewPassword ? "text" : "password"}
                name="confirmNewPassword"
                id="confirmNewPassword"
                value={formik.values.confirmNewPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Confirm new password"
                className={`w-full pl-12 pr-10 py-2 border ${
                  formik.touched.confirmNewPassword &&
                  formik.errors.confirmNewPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirmNewPassword")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
              >
                {showPassword.confirmNewPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {formik.touched.confirmNewPassword &&
              formik.errors.confirmNewPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.confirmNewPassword}
                </p>
              )}
          </div>
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-96 max-w-full px-4 py-3 bg-[#252525] text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {formik.isSubmitting ? "Updating..." : "Update Password"}
        </button>
      </form>

      {/* Toast */}
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

export default ChangePassword;
