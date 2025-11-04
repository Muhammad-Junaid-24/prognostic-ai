import React, { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBarComponent from "../components/layouts/Sidebar";
import AppHeader from "../components/layouts/Header";
import { Spin } from "antd";

const AdminLayout = () => {
  const location = useLocation();

  useEffect(() => {
      document.querySelectorAll(".ant-spin-dot-item").forEach((item) => {
        item.style.backgroundColor = "#252525"; 
      });
    }, [location.pathname]);
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-64 bg-[#F0F4F8] fixed h-full">
        <SideBarComponent />
      </div>

      <div className="flex flex-col flex-grow ml-64">
        <div className="bg-white shadow-md">
          <AppHeader />
        </div>

        <div className="p-6 flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-full">
                <Spin size="large" />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
