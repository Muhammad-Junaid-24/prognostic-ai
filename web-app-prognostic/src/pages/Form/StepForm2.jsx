import React from "react";
import { Formik, Form } from "formik";
import { step2Schema } from "../../utils/validations";
import { setStep3Data } from "store/Slices/formSlice";
import { useDispatch, useSelector } from "react-redux";
import FormField from "components/stepper/FormFeild";
import FormNavigation from "components/stepper/FormNavigation";

const Step2 = ({ handleNext, handlePrevious, stepsCount ,currentStep }) => {
  const dispatch = useDispatch();
  const { step3Data } = useSelector((state) => state.form);

  const initialValues = step3Data || {
    primaryGoal: "",
    targetAudience: "",
    primaryCustomerPainPoints: "",
  };

  const handleSubmit = (values) => {
    dispatch(setStep3Data(values));
   
    handleNext();
  };

  return (
    <div>
      <h2 className="text-[23px] font-semibold mb-1 text-center">
        Define Your Core Marketing Goals
      </h2>

      <div className="mb-4 text-center" style={{ color: "#868686" }}>
        <p>
          What are the main actions you want your customers to take? This will
          guide the AI in crafting targeted campaigns for each lead.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={step2Schema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {() => (
          <Form>
            <FormField
              name="primaryGoal"
              placeholder="Enter your primary goal (e.g., increase sales)"
              label="Primary Goal"
              type="text" 
            />

            <FormField
              as="textarea"
              name="targetAudience"
              label="Target Audience"
              placeholder="Describe your target audience"
              rows={3}
            />

            <FormField
              as="textarea"
              name="primaryCustomerPainPoints"
              label="Customer Pain Points"
              placeholder="List the primary customer pain points"
              rows={3}
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

export default Step2;