import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setStep1Data, populateFormData,resetForm } from "store/Slices/formSlice";
import FormField from "components/stepper/FormFeild";
import FormNavigation from "components/stepper/FormNavigation";
import ModalWithLoader from "./loader";
import { InitialStepSchema } from "utils/validations";
import { fetchDetailFromAI } from "services/actions/companyDetails";



const InitialStep = ({ handleNext, handlePrevious, currentStep, stepsCount }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    websiteURL: "",
  };

  const handleSubmit = async (values) => {
    dispatch(setStep1Data(values.websiteURL));
    setIsLoading(true);

    try {
      const response = await fetchDetailFromAI(values.websiteURL);
      const fallbackData = {
        companyName: "Innovative Tech Solutions",
        industry: "Software",
        primaryProductsOrServices: "CRM and Automation tools",
        companyDescription: "Providing innovative solutions for tech companies.",
        primaryGoal: "Generate Leads",
        targetAudience: "Small and medium-sized tech companies",
        primaryCustomerPainPoints: "Lack of automation in their sales processes",
        testimonials: "Excellent service that helped us scale!",
        offers: [{
          offerName: "Pro Plan",
          offerDescription: "Get all premium features",
          offerGoal: "Boost sales",
          offerTopic: "Sales",
          price: "199",
          primaryBenefits: "Increased efficiency and better analytics",
          targetActionURL: "https://example.com/signup",
        }]
      };

      // Clean HTML tags and format line breaks
      const apiData = response?.content?.companyDetails || {};
      const cleanedApiData = {
        ...apiData,
        testimonials: apiData.testimonials ? apiData.testimonials.replace(/<br\/?>|<\/br>/gi, '\n') : fallbackData.testimonials,
        targetAudience: apiData.targetAudience ? apiData.targetAudience.replace(/<br\/?>|<\/br>/gi, '\n') : fallbackData.targetAudience,
        primaryCustomerPainPoints: apiData.primaryCustomerPainPoints ? apiData.primaryCustomerPainPoints.replace(/<br\/?>|<\/br>/gi, '\n') : fallbackData.primaryCustomerPainPoints
      };

      const formattedData = {
        companyDetails: {
          websiteURL: values.websiteURL,
          ...fallbackData,
          ...cleanedApiData,
          offers: apiData.offers?.length ? apiData.offers : fallbackData.offers
        }
      };

      dispatch(populateFormData(formattedData));
      setIsLoading(false);
      handleNext();

    } catch (error) {
      console.error('Error fetching AI data:', error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ModalWithLoader isOpen={isLoading} onClose={() => setIsLoading(false)} />
      <h2 className="text-[23px] font-semibold mb-1 text-center">Enter Your Website</h2>
      <div className="mb-4 text-center" style={{ color: "#868686" }}>
        <p>
          Share your website URL to help us tailor your experience and campaigns based on your
          online presence.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={InitialStepSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <FormField
              name="websiteURL"
              placeholder="Enter your website URL (e.g., https://example.com)"
              label="Website URL"
              type="url"
            />
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

export default InitialStep;
