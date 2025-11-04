import React, { useState, useEffect, useCallback } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import Reload from "assets/icons/refresh.png";
import EditIcon from "assets/icons/editQuiz.svg";
import SearchIcon from "assets/icons/searchIcon.svg";
import { getOfferList } from "services/actions/companyDetails";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import { Spin } from "antd";

const OfferingTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state
  const [meta, setMeta] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    pageSize: 10,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchOffers = useCallback(
    async (page = 1) => {
      setLoading(true); // Start loader
      try {
        const filters = {
          page,
          pageSize: 10,
        };
        if (searchQuery.trim().length > 3) {
          filters.search = searchQuery.trim();
        }

        const response = await getOfferList({ ...filters, page });
        const offerData = response.content?.data || [];
        setData(offerData);
        setMeta({
          currentPage: response.content?.currentPage || 1,
          totalPages: response.content?.totalPages || 1,
          totalRecords: response.content?.totalRecords || 0,
          pageSize: response.content?.pageSize || 10,
        });
      } catch (error) {
        console.error("Failed to fetch offers", error);
      } finally {
        setLoading(false); // Stop loader
      }
    },
    [searchQuery]
  );

  const debouncedFetchOffers = useCallback(debounce(fetchOffers, 500), [
    fetchOffers,
  ]);

  useEffect(() => {
    if (searchQuery.trim().length === 0 || searchQuery.trim().length > 3) {
      debouncedFetchOffers();
    }
  }, [searchQuery, debouncedFetchOffers]);

  const resetFiltersAndReload = () => {
    setSearchQuery("");
    fetchOffers();
  };

  const handlePreviousPage = () => {
    if (meta.currentPage > 1) {
      fetchOffers(meta.currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (meta.currentPage < meta.totalPages) {
      fetchOffers(meta.currentPage + 1);
    }
  };

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("offerName", {
      header: "Offer Name",
    }),
    columnHelper.accessor("companyName", {
      header: "Company Name",
    }),
    columnHelper.accessor("price", {
      header: "Price",
    }),
    columnHelper.accessor("primaryBenefits", {
      header: "Benefits",
    }),
    columnHelper.accessor("offerTopic", {
      header: "Topic",
    }),
    columnHelper.accessor("companyId", {
      header: "Action",
      cell: (info) => {
        const companyId = info.getValue();
        return (
          <button
            onClick={() => navigate(`/offer/edit/${companyId}`)}
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Offers</h1>
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search offers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-full w-[300px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <img
                src={SearchIcon}
                alt="Search"
                className="w-4 h-4 text-gray-400"
              />
            </div>
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
        </div>

        <div className="border-l h-5 mx-4"></div>
        <button
          onClick={resetFiltersAndReload}
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

export default OfferingTable;
