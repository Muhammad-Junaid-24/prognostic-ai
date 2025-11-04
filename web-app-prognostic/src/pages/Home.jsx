import React, { useEffect, useState } from "react";
import banner from "../assets/dashboard/homepageBanner.jpeg";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import CampaignTypeSelectModal from "components/Modal/CampaignTypeSelectModal";
import { useSelector } from "react-redux";
import Charts from "components/Home/charts";
import CampaignsOverview from "components/Home/campaignsOverview";
import { getHomePageStats } from "services/actions/leads";

function Homepage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCampaigns, setActiveCampaigns] = useState(0);
  const [leadsData, setLeadsData] = useState({ totalLeads: 0, dailyStats: [] });
  const [salesAnalysis, setSalesAnalysis] = useState();
  const companyDetails = useSelector((state) => state.auth.companyDetails);
  const companyId = companyDetails?.id;
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const defaultLineData = [
    { name: 'Mon', leads: 0 },
    { name: 'Tue', leads: 0 },
    { name: 'Wed', leads: 0 },
    { name: 'Thu', leads: 0 },
    { name: 'Fri', leads: 0 },
    { name: 'Sat', leads: 0 },
    { name: 'Sun', leads: 0 },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getHomePageStats(companyId);
        setActiveCampaigns(response.activeCampaigns);
        setLeadsData(response.leads);
        setSalesAnalysis(response.salesAnalysis)
      } catch (error) {
        console.error("Error fetching homepage stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div
        className="bg-prog-blue text-white rounded-xl p-6 relative mb-6 shadow-lg"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          marginBottom: "20px",
        }}
      >
        <div className="flex items-center justify-between px-4">
          <div className="w-fit flex flex-col justify-center items-center">
            <span
              className="text-3xl"
            >
              Welcome to <span className="font-semibold">Clients.ai</span>
            </span>
            <span className="text-lg">
              Personalize your marketing.
            </span>
          </div>
          <div className="w-1/2 flex justify-end">
            <button
              className="font-medium hover:bg-gray-100"
              style={{
                border: "1px solid #FFFFFF",
                backgroundColor: "transparent",
                color: "white",
                borderRadius: "25px",
                padding: "10px 56px",
              }}
              onClick={handleOpenModal}
            >
              Create New Campaign
            </button>
          </div>
        </div>
      </div>

      <CampaignTypeSelectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <div className="flex justify-center gap-6">
        <div className="bg-white shadow-md rounded-lg p-6 w-1/2">
          <p className="text-gray-500">Total Conversion Cores</p>
          <h2 className="text-3xl font-bold text-prog-blue">{leadsData?.totalLeads ?? 0}</h2>
          <ResponsiveContainer width="100%" height={80}>
            <LineChart data={leadsData?.dailyStats || defaultLineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="leads" stroke="#252525" strokeWidth={2} />
              <XAxis dataKey="name" />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 w-1/2">
          <p className="text-gray-500">Active Campaigns</p>
          <h2 className="text-3xl font-bold text-prog-blue">{activeCampaigns}</h2>
        </div>
      </div>


      <div className="grid grid-cols-2 gap-6 mt-6">
        <CampaignsOverview />
        <Charts salesAnalysis={salesAnalysis} />
      </div>
    </div>
  );
}

export default Homepage;
