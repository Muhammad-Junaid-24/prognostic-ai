import React from "react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const TotalLeadsCard = ({ totalLeads, data }) => {

  return (
    <div className="bg-red-100 p-5 rounded-xl shadow-md flex flex-col items-start w-[40%] mt-[20px]">
      <span className="bg-white px-3 py-1 rounded-lg text-gray-700 text-sm font-semibold">
        Total Leads
      </span>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-blue-600 text-2xl">↑</span>
        <span className="text-2xl font-bold text-gray-800">{totalLeads.toLocaleString()}</span>
      </div>
      <div className="w-full h-24 mt-2">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis hide />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#003399" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-sm text-center">No data available</p>
        )}
      </div>
    </div>
  );
};

export default TotalLeadsCard;
