import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { getLeadsList, deleteLeadById } from "services/actions/leads";
// import dayjs from "dayjs";
import FilterIcon from "assets/icons/filterIcon.png";
import AddIcon from "assets/icons/add.png";
import Reload from "assets/icons/refresh.png";
// import ActionsMenu from "components/ActionsMenu/ActionsMenu";
// import DeleteCampaignModal from "components/Modal/DeleteCampaignModal";

const LeadTable = () => {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    pageSize: 10,
  });
  const [filters, setFilters] = useState({ source: "" });
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  // const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFilterDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const fetchLeads = useCallback(
    async (page = meta.currentPage) => {
      setLoading(true);
      try {
        const params = { page, limit: meta.pageSize };
        if (filters.source) {
          params.source = filters.source;
        }
        const response = await getLeadsList(params);
        if (response?.data) {
          setData(response.data || []);
          setMeta({
            currentPage: response.meta.page,
            totalPages: response.meta.totalPages,
            totalRecords: response.meta.total,
            pageSize: response.meta.limit,
          });
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    },
    [filters, meta.currentPage]
  );
  

  useEffect(() => {
    fetchLeads();
  }, [filters, meta.currentPage, fetchLeads]);

  // const handleDelete = async (id) => {
  //   try {
  //     await deleteLeadById(id);
  //     alert(`Lead ${id} deleted successfully.`);
  //     fetchLeads(meta.currentPage);
  //     closeModal();
  //   } catch (error) {
  //     console.error("Failed to delete campaign", error);
  //   }
  // };

  const resetFiltersAndReload = () => {
    setFilters({ source: "" });
  };

  const handlePreviousPage = () => {
    if (meta.currentPage > 1) {
      fetchLeads(meta.currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (meta.currentPage < meta.totalPages) {
      fetchLeads(meta.currentPage + 1);
    }
  };
  // const openModal = (id) => {
  //   setSelectedLeadId(id);
  //   setShowModal(true);
  // };

  // const closeModal = () => {
  //   setShowModal(false);
  //   setSelectedLeadId(null);
  // };

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("firstName", {
      header: "First Name",
    }),
    columnHelper.accessor("lastName", {
      header: "Last Name",
    }),
    columnHelper.accessor("email", {
      header: "Email",
    }),
    columnHelper.accessor("createdAt", {
      header: "Submitted At",
      cell: (info) => {
        const date = new Date(info.getValue());
        return date.toLocaleDateString("en-GB"); 
      },
    }),
    // columnHelper.accessor("id", {
    //   header: "Actions",
    //   cell: (info) => (
    //     <ActionsMenu
    //       itemId={info.getValue()}
    //       actions={[
    //         { label: "View", onClick: (id) => alert(`Viewing lead ${id}`) },
    //         { label: "Edit", onClick: (id) => navigate(`/Leads/edit/${id}`) },
    //         { label: "Delete", onClick: (id) => openModal(id) },
    //       ]}
    //     />
    //   ),
    // }),
  ];

  const table = useReactTable({
    data: data || [],
    columns,
    pageCount: meta.totalPages || 1,
    manualPagination: true,
    state: {
      pagination: {
        pageIndex: meta.currentPage - 1, 
        pageSize: meta.pageSize || 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Leads</h1>
        <div className="flex gap-4 relative">
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center border rounded-full text-gray-800 hover:bg-gray-100 px-8 py-2 gap-2.5"
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            >
              <img src={FilterIcon} alt="Filter" />
              Filters
            </button>

            {showFilterDropdown && (
              <div className="absolute right-0 bg-white shadow-lg rounded-lg p-4 w-[200px] z-10">
                <div>
                  <label className="block text-gray-700 font-medium">
                    source
                  </label>
                  <select
                    className="w-full border rounded px-2 py-1"
                    value={filters.source}
                    onChange={(e) => setFilters({ source: e.target.value })}
                  >
                    <option value="">All</option>
                    <option value="webScan">Web Scan</option>
                    <option value="quiz">Quiz</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 justify-end mb-4">
        <div className="flex items-center gap-2">
          <span className="text-[15px] text-[#6E6E71]">
            {`${(meta.currentPage - 1) * meta.pageSize + 1} - ${Math.min(
              meta.currentPage * meta.pageSize,
              meta.totalRecords
            )} of ${meta.totalRecords}`}
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

        <div className="border-l h-5 mx-4"></div>
        <button
          onClick={resetFiltersAndReload}
          className="text-gray-700 hover:opacity-75"
        >
          <img src={Reload} alt="Reload" className="w-5 h-5" />
        </button>
      </div>

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
                    className="text-left px-6 py-4 border-b text-gray-600"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <DeleteCampaignModal
        isOpen={showModal}
        onClose={closeModal}
        onDelete={handleDelete}
        itemId={selectedLeadId}
      /> */}
    </div>
  );
};

export default LeadTable;
