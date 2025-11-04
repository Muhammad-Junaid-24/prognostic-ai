import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import FormField from "components/stepper/FormFeild";
import Toast from "components/toast/Toast";
import FaEdit from "../../assets/icons/editIcon.svg";
import { INDUSTRIES, PRIMARY_GOALS } from "constants/index";
import { updateCompany } from "services/actions/companyDetails";
import { UnifiedFormValidationSchema } from "utils/validations";

export function CompanyForm({ initialFormData }) {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");
  const [isEditable, setIsEditable] = useState(false);

  const handleSubmit = async (values) => {
    try {
      const { id, createdAt, updatedAt, ...filteredValues } = values;

      const response = await updateCompany(filteredValues);

      setToastMessage(response.message);
      setIsEditable(false);

      setTimeout(() => {
        setToastMessage("");
        navigate("/company-details");
      }, 3000);
    } catch (error) {
      setToastMessage("Error updating the form. Please try again.");
    }
  };

  return (
    <div className="mx-auto p-4">
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}

      <div className="flex justify-end items-center mb-6">
        {!isEditable && (
          <button
            className="flex items-center text-blue-600 hover:text-blue-800"
            onClick={() => setIsEditable(true)}
          >
            <img width={20} src={FaEdit} alt="Edit Icon" className="mr-2" />
            Update Company Profile
          </button>
        )}
      </div>

      <Formik
        initialValues={initialFormData}
        validationSchema={UnifiedFormValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, resetForm, errors, touched }) => (
          <Form className="space-y-8">
            <section className="space-y-4 bg-white rounded-xl p-6">
              <h2 className="text-xl font-semibold">Business Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <FormField
                    disabled={!isEditable}
                    name="companyName"
                    label="Company Name"
                    placeholder="Enter your company name"
                  />
                </div>
                <div>
                  <FormField
                    as="select"
                    name="industry"
                    label="Industry"
                    disabled={!isEditable}
                  >
                    <option value="" disabled>
                      Select an Industry
                    </option>
                    {INDUSTRIES.map((industry) => (
                      <option key={industry.value} value={industry.value}>
                        {industry.label}
                      </option>
                    ))}
                  </FormField>
                </div>
              </div>
              <div>
                <FormField
                  name="primaryProductsOrServices"
                  label="Products/Services"
                  placeholder="List your main products or services"
                  as="textarea"
                  rows={3}
                  disabled={!isEditable}
                />
              </div>
              <div>
                <FormField
                  name="companyDescription"
                  label="Business Description"
                  placeholder="Summarize what your business does"
                  as="textarea"
                  rows={3}
                  disabled={!isEditable}
                />
              </div>
            </section>

            {/* Marketing Goals */}
            <section className="space-y-4 bg-white rounded-xl p-6">
              <h2 className="text-xl font-semibold">Marketing Goals</h2>
              <div>
                <FormField
                  as="select"
                  name="primaryGoal"
                  label="Primary Goal"
                  disabled={!isEditable}
                >
                  <option value="" disabled>
                    Select a primary goal
                  </option>
                  {PRIMARY_GOALS.map((goals) => (
                    <option key={goals.value} value={goals.value}>
                      {goals.label}
                    </option>
                  ))}
                </FormField>
              </div>
              <div>
                <FormField
                  name="targetAudience"
                  label="Target Audience"
                  placeholder="Describe your target audience"
                  as="textarea"
                  rows={3}
                  disabled={!isEditable}
                />
              </div>
              <div>
                <FormField
                  name="primaryCustomerPainPoints"
                  label="Customer Pain Points"
                  placeholder="List the primary customer pain points"
                  as="textarea"
                  rows={3}
                  disabled={!isEditable}
                />
              </div>
            </section>
            <section className="space-y-4 bg-white rounded-xl p-6">
              <h2 className="text-xl font-semibold">Testimonial</h2>
              <div className="p-4 border rounded-lg space-y-4">
                <div>
                  <FormField
                    as="textarea"
                    name="testimonials"
                    label="Testimonial"
                    placeholder="Enter your testimonial"
                    rows={4}
                    disabled={!isEditable}
                  />
                </div>
              </div>
            </section>

            {isEditable && (
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setIsEditable(false);
                  }}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
