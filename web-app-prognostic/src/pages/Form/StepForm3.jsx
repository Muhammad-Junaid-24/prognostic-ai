import React from "react";
import { Formik, Form } from "formik";
import { step4Schema } from "../../utils/validations";
import FormField from "components/stepper/FormFeild";
import FormNavigation from "components/stepper/FormNavigation";
import { useDispatch, useSelector } from "react-redux";
import { setStep4Data } from "store/Slices/formSlice";

const Step3 = ({ handleNext, handlePrevious, currentStep, stepsCount }) => {
  const dispatch = useDispatch();
  const { step4Data } = useSelector((state) => state.form);
  const formatPrice = (price) => {
    if (!price) return "";
    const numericValue = price.toString().replace(/\D/g, '');
    return numericValue ? Number(numericValue).toLocaleString() : '';
  };

  const initialValues = {
    offers: step4Data ? step4Data.offers.map(offer => ({
      ...offer,
      price: formatPrice(offer.price)
    })) : [
      {
        offerName: "",
        offerDescription: "",
        offerGoal: "",
        price: "",
        offerTopic: "",
        primaryBenefits: "",
        targetActionURL: "",
      },
    ],
  };

  const handleSubmit = (values) => {
    dispatch(setStep4Data(values));
    handleNext();
  };

  // const addNewOffer = (setValues, values) => {
  //   const newOffer = {
  //     offerName: "",
  //     offerDescription: "",
  //     offerGoal: "",
  //     primaryBenefits: "",
  //     targetActionURL: "",
  //   };

  //   setValues({
  //     ...values,
  //     offers: [...values.offers, newOffer],
  //   });
  // };

  return (
    <div>
      <h2 className="text-[23px] font-semibold mb-1 text-center">
        List Your Products and Offers
      </h2>

      <div className="mb-4 text-center" style={{ color: "#868686" }}>
        <p>
          Provide details on each product or offer you’d like to promote. The AI
          will use this data for crafting specific campaign messages.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={step4Schema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setValues }) => (
          <Form>
            {values.offers.map((offer, index) => (
              <div key={index} className="space-y-6 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    name={`offers[${index}].offerName`}
                    placeholder="Enter offer name"
                    label="Offer Name"
                  />
                  <FormField
                    name={`offers[${index}].price`}
                    placeholder="Enter offer price"
                    label="Offer price"
                    prefix="$"
                  />
                  <FormField
                    as="textarea"
                    name={`offers[${index}].offerDescription`}
                    placeholder="Describe the offer"
                    label="Offer Description"
                    rows={3}
                  />
                  <FormField
                    as="textarea"
                    name={`offers[${index}].primaryBenefits`}
                    placeholder="Describe the primary benefits"
                    label="Primary Benefits"
                    rows={3}
                  />
                  <FormField
                    as="textarea"
                    name={`offers[${index}].offerGoal`}
                    placeholder="Describe the offer goal"
                    label="Offer goal"
                    rows={3}
                  />
                  <FormField
                    as="textarea"
                    name={`offers[${index}].offerTopic`}
                    placeholder="Describe the offer topic"
                    label="Offer topic"
                    rows={3}
                  />
                  <FormField
                    name={`offers[${index}].targetActionURL`}
                    placeholder="Enter the target URL"
                    label="Target Action URL"
                    type="url"
                  />
                </div>
              </div>
            ))}
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

export default Step3;