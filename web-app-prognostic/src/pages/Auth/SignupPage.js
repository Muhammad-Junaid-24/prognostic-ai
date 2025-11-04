import React from "react";
import { Formik, Form } from "formik";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { SignupApiCall } from "../../services/authApiService";
// import { useDispatch } from "react-redux";
// import { usersignup } from "../../store/Slices/authSlice";
import { signupSchema } from "../../utils/validations";
import FormField from "../../components/stepper/FormFeild";
import UserIcon from "assets/pngs/settings/user.png";
import PhoneIcon from "assets/pngs/settings/phone.png";
import EmailIcon from "assets/pngs/settings/email.png";
import PasswordIcon from "../../assets/icons/lock.svg";

function SignupPage() {
  // const dispatch = useDispatch();
  const router = useNavigate();
  const [searchParams] = useSearchParams();
  const isTrial = searchParams.get("isTrial") === "true";

  const handleSignUp = async (values, { setSubmitting, setFieldError }) => {
    const { fullName, email, password, confirmPassword, phone } = values;

    try {
      const signup = await SignupApiCall(
        fullName,
        email,
        password,
        confirmPassword,
        phone
      );

      const userId = signup?.content?.id;

      if (signup?.success) {
        // dispatch(usersignup({ userId }));
        // localStorage.setItem("userId", userId);
        router("/signup/confirmation", {
          state: { id: userId, isTrial },
          replace: true,
        });
      } else {
        setFieldError(
          "general",
          signup?.error?.message || "An error occurred during signup."
        );
      }
    } catch (error) {
      setFieldError(
        "general",
        "An unexpected error occurred. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 px-10 w-full h-full">
      <div className="w-full ">
        <h1 className="text-3xl font-bold">Create Your Clients.ai Account</h1>
        <p className="opacity-70 mb-[20px] mt-[10px]">Create your free account</p>
      </div>
      <Formik
        initialValues={{
          fullName: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={signupSchema}
        onSubmit={handleSignUp}
      >
        {({ isSubmitting, errors }) => (
          <Form className="flex flex-col w-full max-w-[375px]">
            <div className="gap-1 flex flex-col">
              <FormField
                name="fullName"
                placeholder="Full Name"
                // label="Full Name"
                icon={UserIcon}
              />
              <FormField
                name="phone"
                placeholder="Phone Number"
                iconClass="w-4"
                // label="Phone Number"
                icon={PhoneIcon}
              />
              <FormField
                name="email"
                type="email"
                placeholder="Enter Email"
                // label="Email"
                icon={EmailIcon}
              />
              <FormField
                name="password"
                type="password"
                placeholder="Create Password (min 8 characters)"
                // label="Password"
                icon={PasswordIcon}
              />
              <FormField
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                // label="Confirm Password"
                icon={PasswordIcon}
              />
              {errors.general && (
                <p className="text-red-500 text-sm">{errors.general}</p>
              )}
            </div>

            <div className="mt-10 flex flex-col">
              <button
                type="submit"
                className="bg-prog-blue text-white py-4 rounded-md text-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>

              <div className="mt-[60px] text-center">
                <p>
                  Already Registered?{" "}
                  <Link to={"/"}>
                    <span className="text-prog-blue font-bold">Sign In here.</span>
                  </Link>
                </p>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignupPage;
