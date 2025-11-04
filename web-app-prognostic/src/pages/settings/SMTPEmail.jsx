import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Modal, Button } from "antd"; 
import { CheckCircleOutlined } from "@ant-design/icons";
import Toast from "components/toast/Toast";
import { addUpdateSMTPEmail } from "services/actions/smtp";
import { useDispatch, useSelector } from "react-redux";
import { updateCompanyDetails } from "store/Slices/authSlice";

const SMTPEmail = () => {
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const dispatch = useDispatch();
  const companyDetails = useSelector((state) => state.auth.companyDetails);

  const EmailSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: companyDetails?.smtpEmail || "",
    },
    validationSchema: EmailSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (values.email === companyDetails?.smtpEmail) {
        setToast({
          show: true,
          message: "This Email address is already configured",
          type: "error",
        });
        return;
      }

      try {
        const response = await addUpdateSMTPEmail(companyDetails.id, {
          smtpEmail: values.email,
        });

        if (response?.status === 200) {
          dispatch(
            updateCompanyDetails({
              ...companyDetails,
              smtpEmail: values.email,
            })
          );

          setShowSuccessModal(true);
        } else {
          throw new Error(response?.message || "Something went wrong");
        }
      } catch (error) {
        setToast({
          show: true,
          message: error.message || "Failed to save email. Please try again.",
          type: "error",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-full bg-white pb-8">
      <h3 className="text-xl font-semibold mb-6">Email Configuration</h3>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="relative w-96 max-w-full">
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-96 p-2 border ${formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border-gray-300"
              } rounded-lg`}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            className={`w-96 font-medium py-3 rounded-lg ${formik.isSubmitting || !formik.isValid
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#252525] text-white"
              }`}
          >
            {formik.isSubmitting ? "Saving..." : companyDetails?.smtpEmail ? "Update" : "Save"}
          </button>
        </div>
      </form>

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      <Modal
        title={
          <div className="flex items-center p-4 space-x-2 text-prog-blue">
            <CheckCircleOutlined className="text-2xl" />
            <span className="text-xl font-semibold">Email Successfully Added</span>
          </div>
        }
        
        open={showSuccessModal}
        onCancel={() => setShowSuccessModal(false)}
        centered
        footer={[
          <Button
            key="ok"
            type="primary"
            className="bg-prog-blue hover:!bg-prog-blue text-white px-6 py-2 rounded-lg"
            onClick={() => setShowSuccessModal(false)}
          >
            OK
          </Button>,
        ]}
      >
        <div className="p-8 bg-gray-50 rounded-md">
          <p className="text-gray-700 text-lg text-center">
            We have emailed a verification link to this address.
          </p>
          <p className="text-gray-700 text-lg text-center">
            Please verify your email within <span className="font-semibold">48 hours</span>.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default SMTPEmail;
