import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function Settings() {
  return (
    <div className="h-screen">
      {/* Page Header */}
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-800">Settings</h3>
      </div>

      {/* Main Content */}
      <div className="flex h-full px-6 pt-6">
        {/* Sidebar */}
        <div className="w-1/4">
          <ul className="space-y-2 bg-white shadow-[0px_0px_30px_0px_#AAAAAA29] rounded-lg p-6">
            {/* <li>
              <NavLink
                to="/settings/business-details"
                className={({ isActive }) =>
                  `block py-2 px-4 rounded transition ${
                    isActive ? "text-[#252525] font-semibold" : "hover:text-[#252525]"
                  }`
                }
              >
                Business Details
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to="/settings/profile"
                className={({ isActive }) =>
                  `block py-2 px-4 rounded transition ${
                    isActive ? "text-[#252525] font-semibold" : "hover:text-[#252525]"
                  }`
                }
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/password"
                className={({ isActive }) =>
                  `block py-2 px-4 rounded transition ${
                    isActive ? "text-[#252525] font-semibold" : "hover:text-[#252525]"
                  }`
                }
              >
                Password
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/settings/SMTP-Settings"
                className={({ isActive }) =>
                  `block py-2 px-4 rounded transition ${
                    isActive ? "text-[#252525] font-semibold" : "hover:text-[#252525]"
                  }`
                }
              >
                SMTP Settings
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to="/settings/SMTPEmail"
                className={({ isActive }) =>
                  `block py-2 px-4 rounded transition ${
                    isActive ? "text-[#252525] font-semibold" : "hover:text-[#252525]"
                  }`
                }
              >
                SMTP Email
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Content Area */}
        <div className="w-3/4 bg-white shadow-[0px_0px_30px_0px_#AAAAAA29] rounded-lg p-10 ml-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Settings;
