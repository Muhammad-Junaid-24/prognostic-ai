import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { offeringValidationSchema } from "../../utils/validations";
import { updateOffering, getOfferById } from "../../services/actions/offerings";
import Toast from "../../components/toast/Toast";
import { Spin } from "antd";

const OfferingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.querySelectorAll(".ant-spin-dot-item").forEach((item) => {
      item.style.backgroundColor = "#252525"; 
    });
  }, []);

  const [initialValues, setInitialValues] = useState({
    offerName: "",
    price: "",
    offerDescription: "",
    primaryBenefits: "",
    targetActionURL: "",
    offerTopic: "",
    offerGoal: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "", show: false });

  useEffect(() => {
    if (id) {
      fetchOfferingDetails(id);
    }
  }, [id]);

  const fetchOfferingDetails = async (companyId) => {
    setIsLoading(true);
    try {
      const response = await getOfferById({ companyId });
      const offerData = response.content;
      setInitialValues({
        offerName: offerData.offerName || "",
        price: offerData.price || "",
        offerDescription: offerData.offerDescription || "",
        primaryBenefits: offerData.primaryBenefits || "",
        targetActionURL: offerData.targetActionURL || "",
        offerTopic: offerData.offerTopic || "",
        offerGoal: offerData.offerGoal || "",
      });
    } catch (error) {
      console.error("Failed to fetch offering details", error);
      setToast({
        message: "Failed to load offering details.",
        type: "error",
        show: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setIsLoading(true);

      const payload = {
        offerName: values.offerName,
        price: values.price,
        offerDescription: values.offerDescription,
        primaryBenefits: values.primaryBenefits,
        targetActionURL: values.targetActionURL,
        offerTopic: values.offerTopic,
        offerGoal: values.offerGoal,
      };
      const companyId = id;

      await updateOffering({ companyId, ...payload });

      setToast({
        message: "Offer updated successfully!",
        type: "success",
        show: true,
      });

      setTimeout(() => {
        navigate("/offers");
      }, 1000);
    } catch (error) {
      console.error("Failed to save offering", error);
      setToast({
        message: "Failed to save offering.",
        type: "error",
        show: true,
      });
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  if (isLoading && !initialValues.offerName) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-4 text-gray-600">
        <span
          className="cursor-pointer hover:text-blue-600"
          onClick={() => navigate("/offers")}
        >
          Offerings
        </span>
        {" > "}
        <span className="font-semibold">Edit Offering</span>
      </div>

      <h1 className="text-2xl font-bold mb-6">Edit Offering</h1>

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={offeringValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4 bg-white p-6 rounded shadow">
            <div>
              <label className="block font-medium">Offer Name</label>
              <Field
                type="text"
                name="offerName"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <ErrorMessage
                name="offerName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block font-medium">Price</label>
              <Field
                type="text"
                name="price"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block font-medium">Offer Description</label>
              <Field
                as="textarea"
                name="offerDescription"
                className="w-full border border-gray-300 rounded px-3 py-2 h-32"
              />
              <ErrorMessage
                name="offerDescription"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block font-medium">Primary Benefits</label>
              <Field
                as="textarea"
                name="primaryBenefits"
                className="w-full border border-gray-300 rounded px-3 py-2 h-32"
              />
              <ErrorMessage
                name="primaryBenefits"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block font-medium">Offer Topic</label>
              <Field
                type="text"
                name="offerTopic"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <ErrorMessage
                name="offerTopic"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block font-medium">Offer Goal</label>
              <Field
                type="text"
                name="offerGoal"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <ErrorMessage
                name="offerGoal"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block font-medium">Target Action URL</label>
              <Field
                type="url"
                name="targetActionURL"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <ErrorMessage
                name="targetActionURL"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="w-full flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="bg-[#252525] text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                {isLoading
                  ? "Updating..."
                  : id
                  ? "Update Offer"
                  : "Add Offering"}
              </button>
            </div>
          </Form>
        )}
      </Formik>

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

export default OfferingForm;
