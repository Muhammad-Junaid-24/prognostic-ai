import axiosInstance from "./interceptors";

const handleError = (error) => {
  console.error("API Error:", error);

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "An unexpected error occurred";

  throw new Error(errorMessage);
};

// GET request
export const getRequest = async (route, config = {}) => {
  try {
    const response = await axiosInstance.get(route, {
      headers: {
        ...config.headers,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// POST request
export const postRequest = async (route, data, config = {}) => {
  try {
    const response = await axiosInstance.post(route, data, {
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// PUT request
export const putRequest = async (route, data, config = {}) => {
  try {
    const response = await axiosInstance.put(route, data, {
      headers: {
        ...(data instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
        ...config.headers,
      },
      ...config,
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// DELETE request
export const delRequest = async (route, config = {}) => {
  try {
    const response = await axiosInstance.delete(route, {
      headers: {
        ...config.headers,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};
