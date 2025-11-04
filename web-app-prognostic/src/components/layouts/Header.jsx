import React from "react";
import { Layout, Menu, Dropdown, Space, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import setting from "../../assets/icons/weui_setting-outlined.png";
import defaultAvatar from "../../assets/logos/person.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/Slices/authSlice";
import { resetForm } from "../../store/Slices/formSlice";

const { Header } = Layout;

const AppHeader = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Provide a valid URL or fallback
  const profileImageUrl = user?.profileImage || defaultAvatar;

  // Define your menu items for Ant Design v5
  const menuItems = [
    {
      label: "Profile",
      key: "profile",
      onClick: () => navigate("/settings/profile"),
    },
    {
      label: "Logout",
      key: "logout",
      onClick: () => {
        dispatch(logout());
        dispatch(resetForm());
        navigate("/");
      },
    },
  ];

  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "16px", fontWeight: "bold" }}>
        Welcome, {user?.name || "Guest"}!
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <img
          src={setting}
          alt="setting"
          style={{ width: 28, height: 28, cursor: "pointer" }}
          onClick={() => navigate("/settings/profile")}
        />

        <Dropdown menu={{ items: menuItems }} placement="bottomRight" trigger={["click"]}>
          <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
            <img
              src={profileImageUrl || defaultAvatar}
              alt="user avatar"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: 8,
              }}
            />
            <span>{user?.name || "User"}</span>
          </div>
        </Dropdown>
      </div>

    </Header>
  );
};

export default AppHeader;
