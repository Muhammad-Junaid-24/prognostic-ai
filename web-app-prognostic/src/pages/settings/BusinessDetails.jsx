import React, { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import { businessDetailsSchema } from "utils/validations";
import Email from "assets/pngs/settings/email.png";
import User from "assets/pngs/settings/user.png";
import { useSelector } from "react-redux";
import {
  getCompany,
  updateCompany,
} from "../../services/actions/companyDetails";
import Toast from "components/toast/Toast";

const BusinessDetails = () => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "", show: false });
  const companyDetails = useSelector((state) => state.auth.companyDetails);

  const companyId = companyDetails?.id;

  const formik = useFormik({
    initialValues: {
      companyName: "",
      email: "",
      productOverview: "",
      targetAudience: "",
      paymentMethod: "",
    },
    validationSchema: businessDetailsSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await updateCompany(companyId, values);

        setToast({
          message: "Company details updated successfully!",
          type: "success",
          show: true,
        });
      } catch (error) {
        console.error("Update Failed:", error);
        setToast({
          message: "Failed to update company details. Please try again.",
          type: "error",
          show: true,
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const fetchCompanyDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getCompany(companyId);
      if (response) {
        formik.setValues({
          companyName: response.companyName || "",
          email: response.email || "",
          productOverview: response.productOverview || "",
          targetAudience: response.targetAudience || "",
          paymentMethod: response.paymentMethod || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch company details:", error);
      setToast({
        message: "Failed to fetch company details. Please refresh the page.",
        type: "error",
        show: true,
      });
    } finally {
      setLoading(false);
    }
  }, [companyId, formik]);

  useEffect(() => {
    fetchCompanyDetails();
  }, [fetchCompanyDetails]);

  return (
    <div className="bg-white pb-8">
      <h2 className="text-xl font-semibold mb-6">
        Business Information — Tell Us About Your Company
      </h2>
      <div className="border-t border-[#E6EFF5] my-4"></div>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Company Name */}
        <div>
          {/* <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label> */}
          <div className="relative w-96 max-w-full">
            <div className="relative flex items-center h-12">
              <img
                src={User}
                alt="User Icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
              />
              <input
                type="text"
                name="companyName"
                id="companyName"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter company name"
                className={`w-full pl-12 pr-10 py-2 border ${
                  formik.touched.companyName && formik.errors.companyName
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            {formik.touched.companyName && formik.errors.companyName && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.companyName}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          {/* <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label> */}
          <div className="relative w-96 max-w-full">
            <div className="relative flex items-center h-12">
              <img
                src={Email}
                alt="Email Icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
              />
              <input
                type="email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter email"
                className={`w-full pl-12 pr-10 py-2 border ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>
        </div>

        {/* Product Overview */}
        <div>
          {/* <label htmlFor="productOverview" className="block text-sm font-medium text-gray-700 mb-1">
            Product Overview
          </label> */}
          <textarea
            name="productOverview"
            id="productOverview"
            value={formik.values.productOverview}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter product overview"
            rows="4"
            className={`w-96 max-w-full pl-4 pr-4 py-2 border ${
              formik.touched.productOverview && formik.errors.productOverview
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {formik.touched.productOverview && formik.errors.productOverview && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.productOverview}
            </p>
          )}
        </div>

        {/* Target Audience */}
        <div>
          {/* <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 mb-1">
            Target Audience
          </label> */}
          <select
            name="targetAudience"
            id="targetAudience"
            value={formik.values.targetAudience}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-96 max-w-full pl-4 pr-4 py-2 border ${
              formik.touched.targetAudience && formik.errors.targetAudience
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="" disabled>
              Select target audience
            </option>
            <option value="audience1">Audience 1</option>
            <option value="audience2">Audience 2</option>
            <option value="audience3">Audience 3</option>
          </select>
          {formik.touched.targetAudience && formik.errors.targetAudience && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.targetAudience}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-96 max-w-full px-4 py-3 bg-[#252525] text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessDetails;
