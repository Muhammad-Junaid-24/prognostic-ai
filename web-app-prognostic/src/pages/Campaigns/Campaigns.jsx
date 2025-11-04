import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import FilterIcon from "assets/icons/filterIcon.png";
import AddIcon from "assets/icons/addPlus.svg";
import Reload from "assets/icons/refresh.png";
import DeleteIcon from "assets/icons/deleteIcon.svg";
import ViewIcon from "assets/icons/viewIcon.svg";
import {
  getCampaignsList,
  // deleteCampaignById,
} from "services/actions/campaigns";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import CampaignTypeSelectModal from "components/Modal/CampaignTypeSelectModal";
import DeleteCampaignModal from "components/Modal/DeleteCampaignModal";
import { Tag } from "antd";
import { cascadeWebscanQuizWithTypeForm } from "services/actions/quiz";
import CopyCell from "components/copyCell";

const CampaignTable = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [meta, setMeta] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    pageSize: 10,
  });
  const [filters, setFilters] = useState({ type: "webscan", status: "" });
  const [showModal, setShowModal] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

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

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const resetFiltersAndReload = () => {
    setFilters({ type: "webscan", status: "" });
    fetchCampaigns();
  };

  const fetchCampaigns = useCallback(
    async (page = 1) => {
      try {
        const validFilters = { ...filters };

        if (!validFilters.type) delete validFilters.type;
        if (!validFilters.status) delete validFilters.status;

        const response = await getCampaignsList({ ...validFilters, page });
        setData(response.data.data);
        setMeta({
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          totalRecords: response.data.totalRecords,
          pageSize: response.data.pageSize,
        });
      } catch (error) {
        console.error("Failed to fetch campaigns", error);
      }
    },
    [filters]
  );

  useEffect(() => {
    fetchCampaigns();
  }, [filters, fetchCampaigns]);

  const formatDate = (date, format) => dayjs(date).format(format);

  const handlePreviousPage = () => {
    if (meta.currentPage > 1) {
      fetchCampaigns(meta.currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (meta.currentPage < meta.totalPages) {
      fetchCampaigns(meta.currentPage + 1);
    }
  };

  const openModal = (id) => {
    setSelectedCampaignId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCampaignId(null);
  };

  const handleDelete = async (campaignId) => {
    try {
      await cascadeWebscanQuizWithTypeForm(campaignId);
      fetchCampaigns(meta.currentPage);
      closeModal();
    } catch (error) {
      console.error("Failed to delete campaign", error);
    }
  };

  const columnHelper = createColumnHelper();

  const columns = React.useMemo(() => {
    if (filters.type === "webscan" || filters.type === "quiz") {
      return [
        columnHelper.accessor("campaignName", {
          header: "Campaign Name",
        }),
        columnHelper.accessor("offers", {
          id: "offers",
          header: "Offer Name",
          cell: (info) => {
            const offers = info.getValue();
            return offers?.length > 0 ? (
              offers.map((offer, index) => (
                <span key={`offer-${info.row.id}-${index}`}>
                  {offer.offerName}
                  {index < offers.length - 1 ? ", " : ""}
                </span>
              ))
            ) : (
              "-"
            );
          },
        }),

        columnHelper.accessor("offers", {
          id: "price",
          header: "Price",
          cell: (info) => {
            const offers = info.getValue();
            return offers?.length > 0 ? (
              offers.map((offer, index) => (
                <span key={`price-${info.row.id}-${index}`}>
                  {offer.price ? `$${offer.price}` : "-"}
                  {index < offers.length - 1 ? ", " : ""}
                </span>
              ))
            ) : (
              "-"
            );
          },
        }),

        columnHelper.accessor("createdAt", {
          header: "Created At",
          cell: (info) => formatDate(info.getValue(), "M/D/YY"),
        }),
        columnHelper.accessor("status", {
          header: "Status",
          cell: (info) => {
            const status = info.getValue();
            return (
              <Tag color={status ? "green" : "red"}>
                {status ? "Active" : "Inactive"}
              </Tag>
            );
          },
        }),

        columnHelper.accessor("typeFormEmbeddedLink", {
          header: "Type Form Link",
          cell: (info) => {
            const link = info.getValue() || "";
            return <CopyCell textToCopy={link} />;
          },
        }),

        columnHelper.accessor("htmlEmbeddedCode", {
          header: "Type Form Embedded Code",
          cell: (info) => {
            const code = info.getValue() || "";
            return <CopyCell textToCopy={code} />;
          },
        }),

        columnHelper.accessor("id", {
          header: "Actions",
          cell: (info) => {
            const campaignId = info.getValue();
            return (
              <div
                className="flex justify-start items-center gap-3"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  onClick={() =>
                    navigate(`/campaign/${campaignId}?campaignType=${filters.type}`)
                  }
                  className="p-2 rounded-full hover:bg-gray-100"
                  title="View"
                >
                  <img width={20} src={ViewIcon} alt="View" />
                </button>
                <button
                  onClick={() => openModal(campaignId)}
                  className="p-2 rounded-full hover:bg-gray-100"
                  title="Delete"
                >
                  <img width={20} src={DeleteIcon} alt="Delete" />
                </button>
              </div>
            );
          },
        }),
      ];
    }

    return [];
  }, [filters.type]);


  const tableKey = `table-${filters.type}`;

  useEffect(() => {
    setMeta((prev) => ({ ...prev, currentPage: 1 }));
    fetchCampaigns(1);
  }, [filters.type]);

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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Campaigns</h1>
        <div className="flex gap-4 relative">
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center border border-[#0C2A3D70] rounded-full text-gray-800 hover:bg-gray-100 px-8 py-2 gap-2.5"
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            >
              <img src={FilterIcon} alt="Filter" />
              Filters
            </button>

            <CampaignTypeSelectModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            />

            {showFilterDropdown && (
              <div className="absolute mt-2 bg-white shadow-lg rounded-lg p-4 w-[200px] z-10">
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">
                    Type
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded px-2 py-1 focus:ring-0 outline-0 focus:outline-0 focus:ring-offset-0 focus:border-gray-300"
                    value={filters.type}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, type: e.target.value }))
                    }
                  >
                    <option value="webscan">Web Scan</option>
                    <option value="quiz">Quiz</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">
                    Status
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded px-2 py-1 focus:ring-0 outline-0 focus:outline-0 focus:ring-offset-0 focus:border-gray-300"
                    value={filters.status}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                  >
                    <option value="">All</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Draft">Draft</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={handleOpenModal}
            className="flex items-center bg-[#252525] text-white rounded-full shadow px-8 py-2 gap-2.5"
          >
            <img width={15} src={AddIcon} alt="Add New" />
            Add New
          </button>
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
        <table
          key={tableKey}
          className="w-full table-auto border-collapse bg-white shadow-[0px_0px_30px_0px_#AAAAAA29] rounded-[12px] mt-4"
        >
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
              <tr
                key={`row-${row.original.id || row.id}`} 
                className={`hover:bg-gray-50 ${filters.type === "webscan" ? "cursor-pointer" : ""}`}
                onClick={() =>
                  filters.type === "webscan" &&
                  navigate(`/campaign/${row.original.id}?campaignType=${filters.type}`)
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="text-left px-6 py-4 border-b border-gray-200 align-middle text-gray-600">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && <CampaignTypeSelectModal />}

      <DeleteCampaignModal
        isOpen={showModal}
        onClose={closeModal}
        onDelete={handleDelete}
        itemId={selectedCampaignId}
      />
    </div>
  );
};

export default CampaignTable;
