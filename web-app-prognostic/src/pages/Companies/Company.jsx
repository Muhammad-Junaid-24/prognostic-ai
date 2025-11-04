import React, { useState, useEffect, useCallback } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import AddIcon from "assets/icons/addPlus.svg";
import Reload from "assets/icons/refresh.png";
import EditIcon from "assets/icons/editQuiz.svg";
import { useNavigate } from "react-router-dom";
import CustomSwitch from "components/Switch/switch";
import {
  getCompanies,
  updateCompanyPrimaryMethod,
} from "services/actions/companyDetails";
import { INDUSTRIES, PRIMARY_GOALS } from "constants";
import Toast from "components/toast/Toast";
import { Spin } from "antd";

const Companies = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [meta, setMeta] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    pageSize: 10,
  });

  const fetchCompanies = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const response = await getCompanies({ page, pageSize: meta.pageSize });
        const {
          data: companyData,
          currentPage,
          totalPages,
          totalRecords,
        } = response.content;

        setData(companyData);
        setMeta({
          currentPage,
          totalPages,
          totalRecords,
          pageSize: meta.pageSize,
        });
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      } finally {
        setLoading(false);
      }
    },
    [meta.pageSize]
  );

  useEffect(() => {
    fetchCompanies(meta.currentPage);
  }, [fetchCompanies, meta.currentPage]);

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

  const handleToggleIsPrimary = async (companyId, newStatus, companyName) => {
    setLoading(true);
    try {
      await updateCompanyPrimaryMethod({ id: companyId });
      setToastMessage(
        `${companyName} has been set as ${
          newStatus ? "Primary" : "Non-Primary"
        } company!`
      );
      await fetchCompanies(meta.currentPage);
    } catch (error) {
      console.error("Failed to update 'isPrimary':", error);
      setToastMessage(`Failed to update ${companyName}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("companyName", {
      header: "Company Name",
    }),
    columnHelper.accessor("industry", {
      header: "Industry",
      cell: (info) => {
        const industryValue = info.getValue();
        const industryLabel =
          INDUSTRIES.find((item) => item.value === industryValue)?.label ||
          "Unknown";
        return industryLabel;
      },
    }),
    columnHelper.accessor("primaryGoal", {
      header: "Primary Goal",
      cell: (info) => {
        const goalValue = info.getValue();
        const goalLabel =
          PRIMARY_GOALS.find((item) => item.value === goalValue)?.label ||
          "Unknown";
        return goalLabel;
      },
    }),
    columnHelper.accessor("isPrimary", {
      header: "Is Primary",
      cell: (info) => {
        const companyId = info.row.original.id;
        const isPrimary = info.getValue();
        const companyName = info.row.original.companyName;

        const handleToggleChange = () => {
          const newStatus = !isPrimary;
          handleToggleIsPrimary(companyId, newStatus, companyName);
        };

        return (
          <div className="flex justify-start">
            <CustomSwitch isToggled={isPrimary} onToggle={handleToggleChange} />
          </div>
        );
      },
    }),
    columnHelper.accessor("id", {
      header: "Action",
      cell: (info) => {
        const companyId = info.getValue();
        return (
          <button
            onClick={() => navigate(`/company/edit/${companyId}`)}
            className="p-2 rounded-full"
            title="Edit"
          >
            <img className="ml-4" width={16} src={EditIcon} alt="Edit" />
          </button>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: data || [],
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
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Companies</h1>
        <button
          onClick={() => navigate("/company/add")}
          className="flex items-center bg-[#252525] text-white rounded-full shadow hover:bg-blue-700 px-8 py-2 gap-2.5"
        >
          <img width={15} src={AddIcon} alt="Add New" />
          Add New
        </button>
      </div>

      <div className="flex items-center gap-2 justify-end mb-4">
        <span className="text-[15px] text-[#6E6E71]">
          {`${(meta.currentPage - 1) * meta.pageSize + 1} - ${Math.min(
            meta.currentPage * meta.pageSize,
            meta.totalRecords
          )} of ${meta.totalRecords}`}
        </span>
        <button
          onClick={handlePreviousPage}
          disabled={meta.currentPage === 1 || loading}
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
          disabled={meta.currentPage === meta.totalPages || loading}
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

        <div className="border-l h-5 mx-4"></div>
        <button
          onClick={() => fetchCompanies(meta.currentPage)}
          disabled={loading}
          className="text-gray-700 hover:opacity-75"
        >
          <img src={Reload} alt="Reload" className="w-5 h-5" />
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[200px]">
          <Spin size="large" />
        </div>
      ) : (
        <div className="overflow-x-auto lg:overflow-visible">
          <table className="w-full table-auto border-collapse bg-white shadow-[0px_0px_30px_0px_#AAAAAA29] rounded-[12px] mt-4">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="text-left px-6 py-[2rem] border-b border-gray-200 font-semibold text-gray-700"
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
                      className="text-left px-6 py-4 border-b border-gray-200 align-middle text-gray-600"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Companies;
