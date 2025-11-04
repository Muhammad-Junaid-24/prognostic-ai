import { postRequest, putRequest, getRequest } from '../request';
import {
    loginRoute,
    signupRoute,
    forgotPasswordRoute,
    changePasswordRoute,
    resetPasswordRoute,
    verifyOtpRoute,
    refreshTokenRoute,
    updateUserProfileRoute,
    getBillingHistory,
} from '../apiroutes';



// POST request for Auth APIs
export const authPostRequest = async (route, data) => {
    return await postRequest(route, data);
};

// PUT request for Auth APIs
export const authPutRequest = async (route, data) => {
    return await putRequest(route, data);
};

// GET request for Auth APIs
export const authGetRequest = async (route, id) => {
    const dynamicRoute = route.replace('{id}', id);
    return await getRequest(dynamicRoute);
};


export const fetchBillingHistory = async () => {
    const route = getBillingHistory;
    return await getRequest(route);
};

// Specific Auth API calls

// Login
export const loginUser = async (data) => {
    return await authPostRequest(loginRoute, data);
};

// Signup
export const signupUser = async (data) => {
    return await authPostRequest(signupRoute, data);
};

// Forgot Password
export const forgotPassword = async (data) => {
    return await authPostRequest(forgotPasswordRoute, data);
};

// Change Password
export const changePassword = async (data) => {
    return await authPostRequest(changePasswordRoute, data);
};

// Reset Password
export const resetPassword = async (data) => {
    return await authPostRequest(resetPasswordRoute, data);
};

// Verify OTP
export const verifyOtp = async (data) => {
    return await authPostRequest(verifyOtpRoute, data);
};

// Refresh Token
export const refreshToken = async (data) => {
    return await authPostRequest(refreshTokenRoute, data);
};

// Update User Profile
export const updateUserProfile = async (data) => {
    return await authPutRequest(updateUserProfileRoute, data);
};
