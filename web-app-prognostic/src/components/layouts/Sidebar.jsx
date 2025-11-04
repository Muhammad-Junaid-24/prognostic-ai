import React, { forwardRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/Slices/authSlice";
import { resetForm } from "../../store/Slices/formSlice";
import Toast from "components/toast/Toast";

const SideBar = forwardRef((props, ref) => {
  const [toast, setToast] = useState({ visible: false, message: "", type: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    dispatch(logout());
    dispatch(resetForm());

    setToast({
      visible: true,
      message: "Logged out successfully!",
      type: "success",
    });

    navigate("/");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo Section */}
      <div className="p-8">
        <NavLink to="/">
          <img src="/brandingDark.png" alt="logo" className="h-8 mb-8" />
        </NavLink>
      </div>

      {/* Menu Items */}
      <nav className="flex-grow">
        <ul className="space-y-4 px-6 text-gray-600">
          {/* Use NavLink for active link styling */}
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 bg-[#252525] text-white rounded"
                  : "block py-2 px-4 hover:bg-gray-300 rounded"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/campaigns"
              className={({ isActive }) =>
                isActive || location.pathname === "/webscan-form"
                  ? "block py-2 px-4 bg-[#252525] text-white rounded"
                  : "block py-2 px-4 hover:bg-gray-300 rounded"
              }
            >
              Campaigns
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/companies"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 bg-[#252525] text-white rounded"
                  : "block py-2 px-4 hover:bg-gray-300 rounded"
              }
            >
              Companies
            </NavLink>
          </li> */}
          {/* <li>
            <NavLink
              to="/offers"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 bg-[#252525] text-white rounded"
                  : "block py-2 px-4 hover:bg-gray-300 rounded"
              }
            >
              Offerings
            </NavLink>
          </li> */}
          {/* <li>
            <NavLink
              to="/company-details"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 bg-[#252525] text-white rounded"
                  : "block py-2 px-4 hover:bg-gray-300 rounded"
              }
            >
              Company Details
            </NavLink>
          </li> */}
          {/* <li>
            <NavLink
              to="/integration"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 bg-[#252525] text-white rounded"
                  : "block py-2 px-4 hover:bg-gray-300 rounded"
              }
            >
              Integration
            </NavLink>
          </li> */}
          <li>
            <NavLink
              to="/billing"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 bg-[#252525] text-white rounded"
                  : "block py-2 px-4 hover:bg-gray-300 rounded"
              }
            >
              Billing
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/conversion-cores-list"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 bg-[#252525] text-white rounded"
                  : "block py-2 px-4 hover:bg-gray-300 rounded"
              }
            >
              Conversion Cores
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Bottom Menu */}
      <div className="p-6 border-t border-gray-300">
        <ul className="space-y-2 text-gray-600">
          <li>
            <NavLink
              to="/settings/profile"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 bg-[#252525] text-white rounded"
                  : "block py-2 px-4 hover:bg-gray-300 rounded"
              }
            >
              Settings
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left py-2 px-4 hover:bg-gray-300 rounded"
            >
              Log Out
            </button>
          </li>
        </ul>
      </div>

      {/* Toast Component */}
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, visible: false })}
        />
      )}
    </div>
  );
});

export default SideBar;
