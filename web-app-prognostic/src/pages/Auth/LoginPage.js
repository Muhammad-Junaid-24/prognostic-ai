import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../services/actions/auth";
import { login } from "../../store/Slices/authSlice";
import { populateFormData } from "../../store/Slices/formSlice";
import { loginSchema } from "utils/validations";
import FormField from "components/stepper/FormFeild";
import Toast from "components/toast/Toast";
import EmailIcon from "../../assets/icons/message.svg";
import PasswordIcon from "../../assets/icons/lock.svg";

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "" }); 
  const dispatch = useDispatch();

  const handleLogin = async (values, { setSubmitting, setFieldError }) => {
    setLoading(true);

    try {
      const response = await loginUser(values);
      setLoading(false);

      if (response?.token) {
        const { token, user, companyDetails } = response;

        dispatch(
          login({
            user,
            token,
            companyDetails,
            rememberMe: values.rememberMe,
          })
        );

        setToast({
          visible: true,
          message: "Login successful!",
          type: "success",
        });
      } else {
        setFieldError("general", "Login failed. Please try again.");
        setToast({ visible: true, message: "Login failed.", type: "error" });
      }
    } catch (error) {
      setLoading(false);
      setFieldError(
        "general",
        error.message || "An unexpected error occurred."
      );

      setToast({
        visible: true,
        message: error.message || "An unexpected error occurred.",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h1 className="text-3xl font-bold mb-[10px]">
        Welcome to Clients.ai Premium
      </h1>
      <p className="opacity-70 mb-[20px]">
        Access Your AI Agents That Gets You Clients
      </p>

      <div className="mb-[20px]">
        <div className="space-y-3">
          {[
            "Secure Access to Your AI Agents",
            "Automatic Client Acquisition & Nurturing",
            "AI-Driven Conversions & Smart Campaigns"
          ].map((text, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-5 h-5 flex items-center justify-center border border-[#dccaee] rounded-md">
                <span className="w-[5px] h-[5px] bg-[#8156AC] rounded-full"></span>
              </div>
              <p className="text-sm">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <Formik
        initialValues={{
          email: "",
          password: "",
          rememberMe: false,
        }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <FormField
              name="email"
              type="email"
              placeholder="Enter Email"
              icon={EmailIcon}
            />

            <FormField
              name="password"
              type="password"
              placeholder="Enter Password"
              icon={PasswordIcon}
            />

            {errors.general && (
              <p className="text-red-500 text-sm mt-2">{errors.general}</p>
            )}

            <div className="mt-10">
              <button
                type="submit"
                className="bg-prog-blue text-white py-3 w-full rounded-md text-center"
                disabled={isSubmitting || loading}
              >
                {isSubmitting || loading ? "Signing In..." : "Sign In"}
              </button>
            </div>

            <div className="form-footer flex justify-between items-center my-4">
              <label className="flex items-center space-x-2 text-[#5C5C5C]">
                <Field className="appearance-none h-5 w-5 border border-black rounded-sm focus:ring-offset-0 checked:bg-black checked:border-black focus:outline-none focus:ring-0"
                  type="checkbox" name="rememberMe" />
                <span>Remember Me</span>
              </label>
              <Link to="/forget-password" className="text-[#5C5C5C]">
                Forget Password?
              </Link>
            </div>

            <div className="form-signup-link mt-[60px] text-center">
              Don’t have an account?{" "}
              <Link to="/signup" className=" text-prog-blue font-bold">
                Sign Up
              </Link>
            </div>
          </Form>
        )}
      </Formik>

      {/* Toast Component */}
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, visible: false })}
        />
      )}
    </div>
  );
}

export default LoginPage;
