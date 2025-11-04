import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { getCampaignEmailsById } from "services/actions/campaigns";

const MarketingEmails = () => {
  const { id } = useParams();
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [emailContent, setEmailContent] = useState({
    recipient: "",
    body: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmails = async () => {
      setLoading(true);
      try {
        const response = await getCampaignEmailsById(id);
        if (response.success) {
          const labels = [
            "Day 1",
            "Day 2",
            "Day 3",
            "Day 4",
            "Day 5",
            "Day 6",
            "Day 7 (Morning)",
            "Day 7 (Afternoon)",
            "Day 7 (Evening)",
            "Day 8",
          ];
          const templates = response.data.map((email, index) => ({
            label: labels[index] || `Email Template ${index + 1}`,
            recipient: email.recipientEmail || "Unknown Recipient",
            body: email.emailContent,
          }));

          setEmailTemplates(templates);

          if (templates.length > 0) {
            setSelectedEmail(templates[0].label);
            setEmailContent({
              recipient: templates[0].recipient,
              body: templates[0].body,
            });
          }
        } else {
          console.error("Failed to fetch emails:", response.message);
        }
      } catch (error) {
        console.error("Error fetching emails:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, [id]);

  const handleEmailChange = (event) => {
    const selectedTemplate = emailTemplates.find(
      (template) => template.label === event.target.value
    );
    if (selectedTemplate) {
      setSelectedEmail(selectedTemplate.label);
      setEmailContent({
        recipient: selectedTemplate.recipient,
        body: selectedTemplate.body,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      {loading ? (
        <div className="flex justify-center items-center h-[300px]">
          <Spin size="large" />
        </div>
      ) : (
        <div className="w-full bg-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-[32px] font-bold text-gray-800">
              Send Marketing Email
            </h1>
            <select
              value={selectedEmail}
              onChange={handleEmailChange}
              className="px-6 border border-gray-300 cursor-pointer rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 [&>*]:focus:bg-none"
            >
              <option disabled>Select an email template</option>
              {emailTemplates.map((template) => (
                <option key={template.label} value={template.label}>
                  {template.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 flex items-center gap-4">
            <label className="text-2xl font-semibold">Send to</label>
            <div>
              <span className="inline-block text-[#868686] font-semibold text-[24px]">
                {emailContent.recipient}
              </span>
            </div>
          </div>
          <div className="p-8 rounded-lg shadow-md mb-6 flex flex-col gap-4 mt-8 text-[20px] font-medium text-[#000000]">
            <div dangerouslySetInnerHTML={{ __html: emailContent.body }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingEmails;
