import axios from "axios";
import { store } from "store";
import { logout } from "store/Slices/authSlice";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8088",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    // console.log("Token being sent:", config.headers['Authorization']);
    // console.log("Final Request Headers:", config.headers);
    // console.log('Request Config:', config);
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    // console.log('Response Headers:', response.headers);
    // console.log('Response Data:', response.data);

    return response;
  },
  (error) => {
    // console.error('Response Error:', error);

    if (error.response?.status === 401) {
      store.dispatch(logout());
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
