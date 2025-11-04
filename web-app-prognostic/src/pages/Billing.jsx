import React, { useEffect, useState } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { fetchBillingHistory } from "services/actions/auth";
import { Spin } from "antd";

const Billing = () => {
  const [billingData, setBillingData] = useState(null);
  const [billingHistory, setBillingHistory] = useState([]);

  useEffect(() => {
    async function fetchBillingData() {
      try {
        const response = await fetchBillingHistory();
        setBillingData(response); 
        setBillingHistory(response.billingHistory || []);
      } catch (error) {
        console.error("Error fetching billing history:", error);
      }
    }
    fetchBillingData();
  }, []);

    useEffect(() => {
        document.querySelectorAll(".ant-spin-dot-item").forEach((item) => {
          item.style.backgroundColor = "#252525"; 
        });
      }, []);

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("invoice", {
      header: "Invoice Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("date", {
      header: "Date",
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: billingHistory || [], 
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!billingData) {
    return  <div className="flex justify-center items-center h-full">
    <Spin size="large" />
  </div>;
  }

  const { subscription, lastBill, nextBill } = billingData;

  return (
    <div className="p-6">
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Billing</h1>
        <p className="text-gray-500">Get all access when you subscribe</p>
      </div>

      <div className="p-6 border border-gray-200 my-6 rounded-lg">
        <h2 className="text-lg font-semibold">Account Type</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500">Your Subscription</p>
            <p className="text-xl font-medium">
              {subscription?.subscribedPlan || "No Active Subscription"}
            </p>
          </div>

          {nextBill ? (
            <div>
              <p className="text-gray-500">Your Next Bill</p>
              <p className="text-xl font-medium">{nextBill.amount}</p>
              <p className="text-sm text-gray-500">on {nextBill.date}</p>
            </div>
          ) : (
            <div>
              <p className="text-gray-500">Your Next Bill</p>
              <p className="text-xl font-medium">N/A</p>
              <p className="text-sm text-gray-500">No upcoming billing</p>
            </div>
          )}

          {lastBill ? (
            <div>
              <p className="text-gray-500">Your Last Bill</p>
              <p className="text-xl font-medium">{lastBill.amount}</p>
              <p className="text-sm text-gray-500">on {lastBill.date}</p>
            </div>
          ) : (
            <div>
              <p className="text-gray-500">Your Last Bill</p>
              <p className="text-xl font-medium">N/A</p>
              <p className="text-sm text-gray-500">No billing history</p>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 border border-gray-200 my-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Billing History</h2>
        {billingHistory.length === 0 ? (
          <div className="text-center text-gray-500 py-6">
            No Billing History Found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse rounded-lg shadow-lg">
              <thead className="bg-gray-100">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-3 text-left text-gray-700 border-b"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 border-b text-gray-600">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Billing;
