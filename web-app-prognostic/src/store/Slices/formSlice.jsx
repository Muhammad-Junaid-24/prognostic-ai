import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 

const initialState = {
  currentStep: 0, 
  websiteURL: "",
  step2Data: null, 
  step3Data: null, 
  step4Data: null,
  step5Data: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setStep1Data: (state, action) => {
      state.websiteURL = action.payload; 
    },
    setStep2Data: (state, action) => {
      state.step2Data = action.payload;
    },
    setStep3Data: (state, action) => {
      state.step3Data = action.payload;
    },
    setStep4Data: (state, action) => {
      state.step4Data = action.payload;
    },
    setStep5Data: (state, action) => {
      state.step5Data = action.payload;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    resetForm: (state) => {
      state.websiteURL = initialState.websiteURL;
      state.step2Data = initialState.step2Data;
      state.step3Data = initialState.step3Data;
      state.step4Data = initialState.step4Data;
      state.step5Data = initialState.step5Data;
      state.currentStep = initialState.currentStep;
    },
    populateFormData: (state, action) => {
      const { companyDetails } = action.payload;

      state.websiteURL = companyDetails.websiteURL || "";
      state.step2Data = {
        companyName: companyDetails.companyName,
        industry: companyDetails.industry,
        products: companyDetails.primaryProductsOrServices,
        businessDescription: companyDetails.companyDescription,
      };
      state.step3Data = {
        primaryGoal: companyDetails.primaryGoal,
        targetAudience: companyDetails.targetAudience,
        primaryCustomerPainPoints: companyDetails.primaryCustomerPainPoints,
      };
      state.step4Data = {
        offers: (companyDetails.offers || []).map((offerItem) => ({
          offerName: offerItem.offerName || "",
          offerTopic: offerItem.offerTopic || "",
          price: offerItem.price || "",
          offerDescription: offerItem.offerDescription || "",
          offerGoal: offerItem.offerGoal || "",
          primaryBenefits: offerItem.primaryBenefits || "",
          targetActionURL: offerItem.targetActionURL || "",
        })),
      };
      state.step5Data = companyDetails.testimonials || "";
    },
  },
});

const persistConfig = {
  key: "form",
  storage,
  whitelist: ["websiteURL", "step2Data", "step3Data", "step4Data", "step5Data", "currentStep"], // Persist key form data
};

const persistedFormReducer = persistReducer(persistConfig, formSlice.reducer);

export const {
  setStep1Data,
  setStep2Data,
  setStep3Data,
  setStep4Data,
  setStep5Data,
  setCurrentStep,
  populateFormData,
  resetForm,
} = formSlice.actions;

export default persistedFormReducer;
