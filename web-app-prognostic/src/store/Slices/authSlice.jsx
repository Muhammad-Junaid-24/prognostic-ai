import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  isAuthenticated: false,
  user: null,
  companyDetails: null,
  token: null,
  userId: null,
  rememberMe: false,
  isOnboarded: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.isOnboarded = action.payload.user.isOnboarded;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.rememberMe = action.payload.rememberMe;
      state.companyDetails = action.payload.companyDetails;


      if (action.payload.rememberMe) {
        localStorage.setItem("authToken", action.payload.token);
      } else {
        sessionStorage.setItem("authToken", action.payload.token);
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.userId = null;
      state.token = null;
      state.companyDetails = null;
      state.isOnboarded = false;
      state.rememberMe = false;
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");
    },
    usersignup: (state, action) => {
      state.userId = action.payload.userId;
    },
    updateUserData: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
      if (action.payload.isOnboarded !== undefined) {
        state.isOnboarded = action.payload.isOnboarded;
      }
    },
    updateCompanyDetails: (state, action) => {
      state.companyDetails = action.payload;
    },
    hydrateAuthState: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

const persistConfig = {
  key: "auth",
  storage,
  whitelist: [
    "token",
    "isAuthenticated",
    "isOnboarded",
    "user",
    "refreshToken",
    "userId",
    "companyDetails",
  ],
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const { login, logout, usersignup, hydrateAuthState, updateUserData,updateCompanyDetails } =
  authSlice.actions;
export default persistedAuthReducer;
