import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { INDUSTRIES, PRIMARY_GOALS } from "constants";
import { CompanyFormValidationSchema } from "utils/validations";
import {
  updateCompany,
  getCompany,
  addNewCompanyDetails,
} from "services/actions/companyDetails";
import { useSelector } from "react-redux";
import Toast from "components/toast/Toast";

const CompanyForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [initialValues, setInitialValues] = useState({
    companyName: "",
    industry: "",
    primaryProductsOrServices: "",
    companyDescription: "",
    primaryGoal: "",
    targetAudience: "",
    primaryCustomerPainPoints: "",
    offers: [
      {
        offerName: "",
        price: "",
        offerDescription: "",
        primaryBenefits: "",
        targetActionURL: "",
        offerGoal: "",
        offerTopic: "",
      },
    ],
    testimonials: "",
    isPrimary: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCompanyDetails(id);
    }
  }, [id]);

  const fetchCompanyDetails = async (companyId) => {
    setIsLoading(true);
    try {
      const response = await getCompany(companyId);
      const companyData = response.content;

      const industryOption = INDUSTRIES.find(
        (industry) => industry.value === companyData.industry
      );
      const primaryGoalOption = PRIMARY_GOALS.find(
        (goal) => goal.value === companyData.primaryGoal
      );

      setInitialValues({
        companyName: companyData.companyName || "",
        industry: industryOption ? industryOption.value : "",
        primaryProductsOrServices: companyData.primaryProductsOrServices || "",
        companyDescription: companyData.companyDescription || "",
        primaryGoal: primaryGoalOption ? primaryGoalOption.value : "",
        targetAudience: companyData.targetAudience || "",
        primaryCustomerPainPoints: companyData.primaryCustomerPainPoints || "",
        testimonials: companyData.testimonials || "",
        isPrimary: companyData.isPrimary || false,
        offers: companyData.offers.length
          ? companyData.offers
          : [
              {
                offerName: "",
                price: "",
                offerTopic: "",
                offerDescription: "",
                primaryBenefits: "",
                offerGoal: "",
                targetActionURL: "",
              },
            ],
      });
    } catch (error) {
      setToastMessage("Error fetching company details");
      setToastType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    const cleanedValues = { ...values };

    cleanedValues.offers = cleanedValues.offers.map((offer) => {
      const { id, ...rest } = offer;
      return rest;
    });

    const dataSetUpdate = { ...cleanedValues, userId: user.id };
    const dataSet = { ...values, userId: user.id };

    try {
      if (id) {
        await updateCompany(dataSetUpdate, id);
        setToastMessage("Company updated successfully!");
        setToastType("success");
      } else {
        await addNewCompanyDetails(dataSet);
        setToastMessage("Company added successfully!");
        setToastType("success");
      }

      setTimeout(() => {
        navigate("/companies");
      }, 2000);
    } catch (error) {
      setToastMessage("Error saving company");
      setToastType("error");
    }
  };

  useEffect(() => {
    if (toastMessage) {
      const timeout = setTimeout(() => {
        setToastMessage("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [toastMessage]);

  if (isLoading) {
    return <p className="text-center">Loading company details...</p>;
  }

  return (
    <div className="p-6 min-h-screen">
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          position="top-right"
          onClose={() => setToastMessage("")}
        />
      )}
      <div className="mb-4 text-gray-600">
        <span
          className="cursor-pointer hover:text-blue-600"
          onClick={() => navigate("/companies")}
        >
          Companies
        </span>
        {" > "}
        <span className="font-semibold">
          {id ? "Edit Company" : "Add Company"}
        </span>
      </div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Company Form</h1>
      <Formik
        validationSchema={CompanyFormValidationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="space-y-6 bg-white p-8 shadow-md rounded-lg">
            {/* Business Details */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Business Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium text-gray-700">
                    Company Name
                  </label>
                  <Field
                    type="text"
                    name="companyName"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="companyName"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700">
                    Industry
                  </label>
                  <Field
                    as="select"
                    name="industry"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Industry</option>
                    {INDUSTRIES.map((industry) => (
                      <option key={industry.value} value={industry.value}>
                        {industry.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="industry"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block font-medium text-gray-700">
                  Products/Services
                </label>
                <Field
                  as="textarea"
                  name="primaryProductsOrServices"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                />
                <ErrorMessage
                  name="primaryProductsOrServices"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mt-4">
                <label className="block font-medium text-gray-700">
                  Business Description
                </label>
                <Field
                  as="textarea"
                  name="companyDescription"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                />
                <ErrorMessage
                  name="companyDescription"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            {/* Marketing Goals */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Marketing Goals</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium text-gray-700">
                    Primary Goal
                  </label>
                  <Field
                    as="select"
                    name="primaryGoal"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Primary Goal</option>
                    {PRIMARY_GOALS.map((goal) => (
                      <option key={goal.value} value={goal.value}>
                        {goal.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="primaryGoal"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block font-medium text-gray-700">
                  Target Audience
                </label>
                <Field
                  as="textarea"
                  name="targetAudience"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                />
                <ErrorMessage
                  name="targetAudience"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mt-4">
                <label className="block font-medium text-gray-700">
                  Customer Pain Points
                </label>
                <Field
                  as="textarea"
                  name="primaryCustomerPainPoints"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                />
                <ErrorMessage
                  name="primaryCustomerPainPoints"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            {/* Offer Section */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Offers</h2>
              <FieldArray name="offers">
                {({ form }) => {
                  const offers = form.values.offers;
                  return (
                    <>
                      {offers.map((_, index) => (
                        <div key={index} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block font-medium text-gray-700">
                                Offer Name
                              </label>
                              <Field
                                type="text"
                                name={`offers[${index}].offerName`}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                              />
                              <ErrorMessage
                                name={`offers[${index}].offerName`}
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>
                            <div>
                              <label className="block font-medium text-gray-700">
                                Target Action URL
                              </label>
                              <Field
                                type="text"
                                name={`offers[${index}].targetActionURL`}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                              />
                              <ErrorMessage
                                name={`offers[${index}].targetActionURL`}
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div>
                              <label className="block font-medium text-gray-700">
                                Primary Benefit
                              </label>
                              <Field
                                type="text"
                                name={`offers[${index}].primaryBenefits`}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                              />
                              <ErrorMessage
                                name={`offers[${index}].primaryBenefits`}
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>
                            <div>
                              <label className="block font-medium text-gray-700">
                                Offer Goal
                              </label>
                              <Field
                                type="text"
                                name={`offers[${index}].offerGoal`}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                              />
                              <ErrorMessage
                                name={`offers[${index}].offerGoal`}
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div>
                              <label className="block font-medium text-gray-700">
                                Offer Price
                              </label>
                              <Field
                                type="text"
                                name={`offers[${index}].price`}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                              />
                              <ErrorMessage
                                name={`offers[${index}].price`}
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>
                            <div>
                              <label className="block font-medium text-gray-700">
                                Offer Topic
                              </label>
                              <Field
                                type="text"
                                name={`offers[${index}].offerTopic`}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                              />
                              <ErrorMessage
                                name={`offers[${index}].offerTopic`}
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block font-medium text-gray-700">
                              Offer Description
                            </label>
                            <Field
                              as="textarea"
                              name={`offers[${index}].offerDescription`}
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                              rows={3}
                            />
                            <ErrorMessage
                              name={`offers[${index}].offerDescription`}
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                        </div>
                      ))}
                    </>
                  );
                }}
              </FieldArray>
            </div>

            <h2 className="text-lg font-semibold mb-4">Testimonials</h2>

            <div className="mt-2">
              <label className="block font-medium text-gray-700">Content</label>
              <Field
                as="textarea"
                name="testimonials"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
              <ErrorMessage
                name="testimonials"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-4">Is Primary?</h2>

              <div className="flex items-center gap-3 mt-4">
                <Field
                  type="checkbox"
                  name="isPrimary"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="text-gray-700">Set as Primary Company</span>
              </div>
              <ErrorMessage
                name="isPrimary"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate("/companies")}
                className="text-gray-800 border py-2 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CompanyForm;
