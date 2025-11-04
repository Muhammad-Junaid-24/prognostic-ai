import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { webscanSchema } from "../../utils/validations";
import FormField from "components/stepper/FormFeild";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { createWebscanQuizWithTypeForm } from "services/actions/quiz";
import { addCampaignQuiz } from "services/actions/campaigns";
import { useSelector } from "react-redux";

const formatPrice = (price) => {
  if (!price) return "";
  const numericValue = price.toString().replace(/\D/g, "");
  return numericValue ? Number(numericValue).toLocaleString() : "";
};

const Webscan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const companyDetails = useSelector((state) => state.auth.companyDetails);


  const initialValues = {
    campaignName: "New campaign",
    testimonial: companyDetails?.testimonials || "",
    offers: companyDetails?.offers
      ? companyDetails.offers.map((offer) => ({
          offerName: offer.offerName,
          offerDescription: offer.offerDescription,
          offerGoal: offer.offerGoal,
          price: formatPrice(offer.price),
          offerTopic: offer.offerTopic,
          primaryBenefits: offer.primaryBenefits,
          targetActionURL: offer.targetActionURL,
        }))
      : [
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

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      let response;

      if (location.pathname === "/quiz-campaign-form") {
        const payload = {
          companyDetails: {
            companyName: companyDetails?.companyName || "",
            industry: companyDetails?.industry || "",
            primaryProductsOrServices:
              companyDetails?.primaryProductsOrServices || "",
            companyDescription: companyDetails?.companyDescription || "",
            primaryCustomerPainPoints:
              companyDetails?.primaryCustomerPainPoints || "",
            primaryGoal: companyDetails?.primaryGoal || "",
            testimonials: values.testimonial,
            targetAudience: companyDetails?.targetAudience || "",
          },
          ...values,
        };
        response = await addCampaignQuiz(payload);

        if (response && response.success) {
          navigate("/ai-quiz-hooks", {
            state: { prognosticData: response.data },
          });
        }
      } else {
        response = await createWebscanQuizWithTypeForm(values);
      }

      if (response && response.success) {
        navigate("/webscan/success", {
          state: { prognosticData: response.data },
        });
      }
    } catch (error) {
      console.error("Error creating campaign or quiz:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center gap-36 min-h-screen p-4">
      <div className="bg-white rounded-lg p-8 w-full max-w-4xl">
        <nav className="mb-4 flex gap-2 text-center text-sm text-gray-500">
          <Link to="/campaigns" className="hover:text-[#252525]">
            <span className="text-black">Campaigns </span>
          </Link>
          <span className="text-black font-semibold">{">"}</span>
          <Link to="/webscan-form" className="text-[#252525]">
            <span className="font-semibold"> New Campaign</span>
          </Link>
        </nav>
        <h1 className="text-[28px] font-bold text-center mb-2">
          Unlock the Power of AI for Your Campaigns!
        </h1>
        <p className="text-lg text-center mb-6 text-gray-600">
          Showcase your products, offers, and testimonials to craft campaigns
          that truly resonate with your audience.
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={webscanSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting }) => (
            <Form>
              {/* Campaign Name Field */}
              <div className="mb-8">
                <FormField
                  name="campaignName"
                  placeholder="Enter campaign name"
                  label="Campaign Name"
                />
              </div>

              {/* Testimonial Field */}
              <div className="mb-8">
                <FormField
                  as="textarea"
                  name="testimonial"
                  placeholder="Enter testimonial"
                  label="Testimonial"
                  rows={3}
                />
              </div>

              {/* Offer Details Section */}
              {values.offers.map((offer, index) => (
                <div
                  key={index}
                  className="space-y-6 mb-8 border-b pb-6 last:border-0"
                >
                  <h2 className="text-[20px] font-semibold">Offer Details</h2>
                  <FormField
                    name={`offers[${index}].offerName`}
                    placeholder="Enter offer name"
                    label="Offer Name"
                  />
                  <FormField
                    name={`offers[${index}].price`}
                    placeholder="Enter offer price"
                    label="Offer Price"
                    prefix="$"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      label="Offer Goal"
                      rows={3}
                    />
                    <FormField
                      as="textarea"
                      name={`offers[${index}].offerTopic`}
                      placeholder="Describe the offer topic"
                      label="Offer Topic"
                      rows={3}
                    />
                  </div>
                  <FormField
                    name={`offers[${index}].targetActionURL`}
                    placeholder="Enter the target URL"
                    label="Target Action URL"
                    type="url"
                  />
                </div>
              ))}

              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className={`bg-[#252525] text-white max-w-[160px] w-full py-3 flex items-center justify-center rounded transition ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
                        ></path>
                      </svg>
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Webscan;
