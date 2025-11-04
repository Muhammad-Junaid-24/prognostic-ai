import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { optInFormSchema } from "../../utils/validations";
import { populateFormData, resetForm } from "store/Slices/formSlice";
import { useNavigate } from "react-router-dom";
import FormField from "../../components/stepper/FormFeild";
import Toast from "../../components/toast/Toast";
import FormNavigation from "components/stepper/FormNavigation";
import { fetchPrimaryCompany } from "services/actions/companyDetails";
import { addCampaign } from "services/actions/campaigns";

const OptInForm = ({ handlePrevious, currentStep, stepsCount }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { step1Data, step2Data, step3Data, step4Data, step5Data } = useSelector(
    (state) => state.form
  );

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    website: "",
  };

  const handleSubmit = async (values) => {
    const payload = {
      companyDetails: {
        userId: user.id,
        companyId: step1Data.companyId ?? null,
        companyName: step1Data.companyName,
        industry: step1Data.industry,
        primaryProductsOrServices: step1Data.products,
        companyDescription: step1Data.businessDescription,
        primaryGoal: step2Data.primaryGoal,
        targetAudience: step2Data.targetAudience,
        primaryCustomerPainPoints: step2Data.primaryCustomerPainPoints,
        testimonials: step5Data,
      },
      offers: step4Data.offers,
      campaignDetails: { type: "web_scan", ...step3Data },
      optInDetails: values,
    };

    try {
      setIsSubmitting(true);

      const response = await addCampaign(payload);

      if (!response.success) {
        throw new Error(response.message || "Error submitting the form");
      }

      dispatch(resetForm());
      const primaryResponse = await fetchPrimaryCompany();

      if (primaryResponse.success) {
        dispatch(populateFormData(primaryResponse.data));
      } else {
        console.warn(
          "Could not update primary company details:",
          primaryResponse.message
        );
      }

      setToastMessage("Form submitted successfully!");
      navigate(`/home`);
    } catch (error) {
      console.error("Error submitting the form:", error);
      setToastMessage("Error submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
      <div className="w-full max-w-[766px] p-6 bg-white ">
        <Formik
          initialValues={initialValues}
          validationSchema={optInFormSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="my-8">
                <h5 className="mb-2 font-bold">Enter Basic Details</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    name="firstName"
                    placeholder="First Name"
                    icon="https://img.icons8.com/ios/50/user.png"
                  />
                  <FormField
                    name="lastName"
                    placeholder="Last Name"
                    icon="https://img.icons8.com/ios/50/user.png"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    icon="https://img.icons8.com/ios/50/email.png"
                  />
                  <FormField
                    name="website"
                    placeholder="https://"
                    icon="https://img.icons8.com/ios/50/link.png"
                  />
                </div>
              </div>
              <FormNavigation
                handlePrevious={handlePrevious}
                handleNext={null}
                currentStep={currentStep}
                stepsCount={stepsCount}
                isLastStep={true}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default OptInForm;
