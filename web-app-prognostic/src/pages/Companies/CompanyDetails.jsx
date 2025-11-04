import React, { useEffect, useState } from "react";
import { CompanyForm } from "../Form/UnifiedForm";
import { getCompany } from "services/actions/companyDetails";

function CompanyDetails() {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setLoading(true);
        const response = await getCompany();
        setFormData(response.content);
      } catch (err) {
        setError("Failed to load company data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen max-w-[80%] bg-gray-50 py-8">
      <div className="container">
        <div>
          <div className="p-6">
            <h1 className="text-3xl font-bold text-start text-gray-900 mb-8 ml-4">
              Company Profile
            </h1>
            {formData && <CompanyForm initialFormData={formData} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetails;
