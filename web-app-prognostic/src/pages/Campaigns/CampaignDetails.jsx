import React, { useState, useEffect } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useNavigate, useParams } from "react-router-dom";
import { parseISO, format } from "date-fns"; 
import { getCampaignDetailById } from "services/actions/campaigns";
import ViewIcon from "assets/icons/viewIcon.svg";
import TotalLeadsCard from "./TotalLeadsCard";

const CampaignDetails = () => {
  const { id: campaignId } = useParams();
  const [data, setData] = useState([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [chartData, setChartData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [meta, setMeta] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    pageSize: 10,
  });
  

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFormSubmissions = async () => {
      try {
        setLoading(true);
        const response = await getCampaignDetailById(campaignId);
        const formattedData = response.data.map((submission) => ({
          submittedAt: new Date(submission.submittedAt).toLocaleString(),
          ...submission, 
        }));

        if (formattedData.length > 0) {
          setData(formattedData); 
          setTotalLeads(response.totalLeads || 0);

          const leadCounts = formattedData.reduce((acc, submission) => {
            const date = new Date(submission.submittedAt).toISOString().split("T")[0]; 
            acc[date] = (acc[date] || 0) + 1;
            return acc;
          }, {});
    
          const today = new Date();
          const lastWeek = new Date();
          lastWeek.setDate(today.getDate() - 6);
    
          let timeSeriesData = [];
          for (let d = new Date(lastWeek); d <= today; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split("T")[0];
            timeSeriesData.push({ date: dateStr, value: leadCounts[dateStr] || 0 });
          }    
          setChartData(timeSeriesData); 
          setMeta({
            currentPage: 1,
            totalPages: Math.ceil(formattedData.length / 10),
            totalRecords: formattedData.length,
            pageSize: 10,
          });
        }
      } catch (err) {
        setError(err.message || "Failed to fetch form submissions");
      } finally {
        setLoading(false);
      }
    };

    fetchFormSubmissions();
  }, [campaignId]);

  const handlePreviousPage = () => {
    if (meta.currentPage > 1) {
      setMeta((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
    }
  };

  const handleNextPage = () => {
    if (meta.currentPage < meta.totalPages) {
      setMeta((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
    }
  };

  const columnHelper = createColumnHelper();

  const columns = [
    // columnHelper.accessor("responseId", {
    //   header: "Response ID",
    // }),

    columnHelper.accessor("firstName", {
      header: "First Name",
    }),
    columnHelper.accessor("lastName", {
      header: "Last Name",
    }),
    columnHelper.accessor("email", {
      header: "Email",
    }),
    // columnHelper.accessor("phoneNumber", {
    //   header: "Phone Number",
    // }),
    
    columnHelper.accessor("website", {
      header: "Website",
      cell: (info) => (
        <a href={info.getValue()} target="_blank" rel="noopener noreferrer">
          {info.getValue()}
        </a>
      ),
    }),
    columnHelper.accessor("submittedAt", {
      header: "Submitted At",
      cell: (info) => {
        // Format the date to show only the date part
        const date = new Date(info.getValue());
        return date.toLocaleDateString(); // Returns '1/13/2025'
      },
    }),
    columnHelper.accessor("id", {
      header: "Show Emails",
      cell: (info) => {
        const submissionId = info.getValue();
        return (
          <div className="flex justify-start pl-8 items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => navigate(`/marketing-emails/${submissionId}`)}
              className="p-2 rounded-full hover:bg-gray-100"
              title="View"
            >
              <img width={20} src={ViewIcon} alt="View" />
            </button>
          </div>
        );
      },
    }),
  ];


  const paginatedData = data.slice(
    (meta.currentPage - 1) * meta.pageSize,
    meta.currentPage * meta.pageSize
  );
  const table = useReactTable({
    data: paginatedData || [],
    columns,
    pageCount: meta.totalPages || 1,
    manualPagination: true,
    state: {
      pagination: {
        pageIndex: meta.currentPage ? meta.currentPage - 1 : 0,
        pageSize: meta.pageSize || 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Campaign Details</h1>
      </div>

      <div className="flex items-center gap-2 justify-between mt-10">
        <h2 className="text-xl font-bold text-gray-800">
          Form Submissions
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-[15px] text-[#6E6E71]">
            Page {meta.currentPage} of {meta.totalPages}
          </span>
          <button
            onClick={handlePreviousPage}
            disabled={meta.currentPage === 1}
            className="py-2 disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <button
            onClick={handleNextPage}
            disabled={meta.currentPage === meta.totalPages}
            className="py-2 disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto lg:overflow-visible">
        <table className="w-full table-auto border-collapse bg-white shadow-[0px_0px_30px_0px_#AAAAAA29] rounded-[12px] mt-4 ">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left px-6 py-6 border-b border-gray-200 font-semibold text-gray-700"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="text-left px-6 py-6 border-b border-gray-200 align-middle text-gray-600"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TotalLeadsCard totalLeads={totalLeads} data={chartData} />
      </div>
  );
};

export default CampaignDetails;
