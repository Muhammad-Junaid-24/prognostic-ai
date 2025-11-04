import React, { useState, useEffect, useCallback } from "react";
import { getCampaignsList } from "services/actions/campaigns"; 
import { useNavigate } from "react-router-dom";
import { Tag } from "antd";
import ViewIcon from "assets/icons/viewIcon.svg";


export default function CampaignsOverview() {
  const [campaigns, setCampaigns] = useState([]);
  const [filterType, setFilterType] = useState("webscan");
  const navigate = useNavigate();

  const fetchCampaigns = useCallback(async () => {
    try {
      const filters = filterType ? { type: filterType } : {};
      const response = await getCampaignsList({ ...filters, page: 1 });
      setCampaigns(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch campaigns", error);
    }
  }, [filterType]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);


  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-700">Campaigns Overview</h3>

        <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border text-sm border-gray-300 rounded px-2 py-1 text-prog-blue focus:ring-0 outline-0 focus:outline-0 focus:ring-offset-0 focus:border-gray-300 "
          >
            <option value="webscan">Webscan</option>
            <option value="quiz">Quiz</option>
          </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-6 py-3 border-b border-gray-200 font-semibold text-gray-700">
                Campaign Name
              </th>
              <th className="text-left px-6 py-3 border-b border-gray-200 font-semibold text-gray-700">
                Status
              </th>
              <th className="text-left px-6 py-3 border-b border-gray-200 font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {campaigns.length > 0 ? (
              campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="text-left px-6 py-4 border-b border-gray-200 text-gray-600">
                    {campaign.campaignName}
                  </td>

                  <td className="text-left px-6 py-4 border-b border-gray-200 text-gray-600">
                    <Tag color={campaign.status ? "green" : "red"}>
                      {campaign.status ? "Active" : "Inactive"}
                    </Tag>
                  </td>

                  <td className="text-left px-6 py-4 border-b border-gray-200 text-gray-600">
                  <button
                  onClick={() =>
                    navigate(`/campaign/${campaign.id}?campaignType=${filterType}`)
                  }
                  className="p-2 rounded-full hover:bg-gray-100"
                  title="View"
                >
                  <img width={20} src={ViewIcon} alt="View" />
                </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No campaigns found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
