import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function Charts({ salesAnalysis }) {
  // const [selectedYear, setSelectedYear] = useState("2025");
  const [chartData, setChartData] = useState([]);

  const defaultEmptyStats = [
    { name: "Jan", leads: 0 },
    { name: "Feb", leads: 0 },
    { name: "Mar", leads: 0 },
    { name: "Apr", leads: 0 },
    { name: "May", leads: 0 },
    { name: "Jun", leads: 0 },
    { name: "Jul", leads: 0 },
    { name: "Aug", leads: 0 },
    { name: "Sep", leads: 0 },
    { name: "Oct", leads: 0 },
    { name: "Nov", leads: 0 },
    { name: "Dec", leads: 0 },
  ];

  useEffect(() => {
    if (salesAnalysis && salesAnalysis.year === Number("2025")) {
      setChartData(salesAnalysis.monthlyStats);
    } else {
      setChartData(defaultEmptyStats);
    }
  }, [salesAnalysis]);

  const barChartData = chartData.map((item) => ({
    name: item.name,
    value: item.leads,
  }));

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-700">
            Sales Funnel Analysis
          </h3>
          {/* <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-prog-blue focus:ring-0 outline-0 focus:outline-0 focus:ring-offset-0 focus:border-gray-300"
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select> */}
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="leads"
              stroke="#252525"
              strokeWidth={2}
            />
            <XAxis dataKey="name" />
            <YAxis domain={[0, "auto"]} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Performance Visualization
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, "auto"]} />
            <Tooltip />
            <Bar dataKey="value" fill="#252525" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
