import React, { useState } from "react";
import { Formik, Form } from "formik";
import { step5Schema } from "../../utils/validations";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  resetForm,
  setStep5Data,
} from "store/Slices/formSlice";
import FormField from "components/stepper/FormFeild";
import FormNavigation from "components/stepper/FormNavigation";
import Toast from "components/toast/Toast";
import { addCompany } from "services/actions/companyDetails";
import { updateCompanyDetails, updateUserData } from "store/Slices/authSlice";


const Step4 = ({ handleNext, handlePrevious, currentStep, stepsCount }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const navigate = useNavigate();

  const { websiteURL, step2Data, step3Data, step4Data, step5Data } = useSelector(
    (state) => state.form
  );

  const userId = useSelector((state) => state.auth.user.id);


  const initialValues = {
    testimonials: step5Data || "",
  };

  const handleSubmit = async (values) => {
    dispatch(setStep5Data(values.testimonials));
  
    const payload = {
      companyDetails: {
        companyName: step2Data.companyName,
        industry: step2Data.industry,
        primaryProductsOrServices: step2Data.products,
        companyDescription: step2Data.businessDescription,
        primaryGoal: step3Data.primaryGoal,
        targetAudience: step3Data.targetAudience,
        primaryCustomerPainPoints: step3Data.primaryCustomerPainPoints,
        testimonials: values.testimonials,
      },
      isOnboarded: true,
      website: websiteURL,
      offers: step4Data.offers,
      userId: userId,
    };
  
    try {
      const response = await addCompany(payload);
      if (response && response.content) {
        const { content: companyDetails } = response;
  
        dispatch(updateUserData({ isOnboarded: true }));
        dispatch(updateCompanyDetails(companyDetails));
  
        setToastMessage("Form submitted successfully!");
        setTimeout(() => {
          dispatch(resetForm());
          setToastMessage("");
          navigate("/home");
        }, 3000);
      }
    } catch (error) {
      setToastMessage("Error submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}

      <h2 className="text-[23px] font-semibold mb-1 text-center">
        Got any Testimonials?
      </h2>
      <div className="mb-4 text-center" style={{ color: "#868686" }}>
        <p>
          Help us hit 'em with undeniable proof. For example, share your success
          story with us!
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={step5Schema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values }) => (
          <Form>
            <div className="mb-6 p-4 rounded-md">
              <FormField
                as="textarea"
                name="testimonials"
                placeholder="Type your answer here...."
                rows={6}
              />
            </div>
            <FormNavigation
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              currentStep={currentStep}
              stepsCount={stepsCount}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Step4;