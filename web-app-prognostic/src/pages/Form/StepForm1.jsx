import React from "react";
import { Formik, Form } from "formik";
import { step1Schema } from "../../utils/validations";
import { useDispatch, useSelector } from "react-redux";
import { setStep2Data } from "store/Slices/formSlice";
import FormField from "components/stepper/FormFeild";
import FormNavigation from "components/stepper/FormNavigation";

const Step1 = ({ handleNext, handlePrevious, stepsCount , currentStep }) => {
  const dispatch = useDispatch();
  const { step2Data } = useSelector((state) => state.form);

  const initialValues = step2Data || {
    companyName: "",
    industry: "",
    products: "",
    businessDescription: "",
  };

  const handleSubmit = (values) => {
 
    dispatch(setStep2Data(values));
    handleNext();
  };

  return (
    <div>
      <h2 className="text-[23px] font-semibold mb-1 text-center">
        Tell Us About Your Business
      </h2>

      <div className="mb-4 text-center" style={{ color: "#868686" }}>
        <p>
          To get the most out of PrognosticAI, we need a quick overview of your
          business. This helps us tailor every campaign to your brand’s unique
          identity.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={step1Schema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {() => (
          <Form>
            {/* Row for Company Name and Industry Dropdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <FormField
                name="companyName"
                placeholder="Enter your company name"
                label="Company Name"
              />

<FormField
                name="industry"
                placeholder="Enter your industry (e.g., Software, Healthcare)"
                label="Industry"
                type="text"
              />
            </div>

            {/* Products */}
            <FormField
              name="products"
              placeholder="List your main products or services"
              as="textarea"
              rows={3}
              label="Products/Services"
            />

            {/* Business Description */}
            <FormField
              name="businessDescription"
              placeholder="Summarize what your business does"
              as="textarea"
              rows={3}
              label="Business Description"
            />

            {/* Navigation Buttons */}
            <FormNavigation
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              currentStep={ currentStep}
              stepsCount={stepsCount}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Step1;