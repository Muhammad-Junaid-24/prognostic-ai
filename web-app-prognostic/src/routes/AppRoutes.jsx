import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { Spin } from "antd";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";
import UnsupportedDevice from "../components/auth/UnsupportedDevice";
import authRoutes from "./AuthRoutes";
import AdminRoutes from "./AdminRoutes";
import OtherPrivateRoutes from "./OtherPrivateRoutes";
import PrivateRouteWrapper from "./PrivateRouteWrapper";
import publicRoutes from "./PublicRoutes";
import NotFoundPage from "pages/NotFoundPage";
import { useSelector } from "react-redux";

function AppRoutes() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isOnboarded = useSelector((state) => state.auth.isOnboarded);
  const isMobile = window.innerWidth < 768;

  const location = useLocation();
  
    useEffect(() => {
        document.querySelectorAll(".ant-spin-dot-item").forEach((item) => {
          item.style.backgroundColor = "#252525"; 
        });
      }, [location.pathname]);

  if (isMobile) {
    return <UnsupportedDevice />;
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex justify-center items-center">
          <Spin size="large"/>
        </div>
      }
    >
      <Routes>
        {/* Public Routes */}
        {publicRoutes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}

        {/* Auth Routes */}
        <Route
          element={
            isAuthenticated ? (
              isOnboarded ? (
                <Navigate to="/home" />
              ) : (
                <Navigate to="/quiz-form" />
              )
            ) : (
              <AuthLayout />
            )
          }
        >
          {authRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>

        {/* Admin Routes */}
        <Route
          element={
            <PrivateRouteWrapper>
              <AdminLayout />
            </PrivateRouteWrapper>
          }
        >
          {AdminRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element}>
              {route.children?.map((child) => (
                <Route
                  key={child.path}
                  path={child.path}
                  element={child.element}
                />
              ))}
            </Route>
          ))}
        </Route>

        {/* Other Private Routes */}
        {OtherPrivateRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
