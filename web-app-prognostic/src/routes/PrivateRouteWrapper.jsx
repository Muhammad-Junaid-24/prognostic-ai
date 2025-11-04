import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout, hydrateAuthState } from "../store/Slices/authSlice";

const PrivateRouteWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, isOnboarded } = useSelector((state) => state.auth);

  useEffect(() => {
    const storedToken =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    if (storedToken) {
      if (!isAuthenticated) {
        dispatch(
          hydrateAuthState({
            isAuthenticated: true,
            token: storedToken,
          })
        );
      }
    } else {
      dispatch(logout());
    }
  }, [dispatch, isAuthenticated]);

  if (isAuthenticated === undefined || isOnboarded === undefined) {
    return null; 
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!isOnboarded) {
    return <Navigate to="/quiz-form" replace />;
  }

  return children;
};

export default PrivateRouteWrapper;
