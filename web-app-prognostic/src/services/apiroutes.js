import configs from "../config";

const API_BASE_URL = configs.apiUrl;

// Auth endpoints
export const loginRoute = `${API_BASE_URL}/userAuth/login`;
export const signupRoute = `${API_BASE_URL}/userAuth/register`;
export const forgotPasswordRoute = `${API_BASE_URL}/userAuth/forgotPassword`;
export const changePasswordRoute = `${API_BASE_URL}/userAuth/user/change-password`;
export const resetPasswordRoute = `${API_BASE_URL}/userAuth/resetPassword`;
export const verifyOtpRoute = `${API_BASE_URL}/userAuth/verifyOtp`;
export const refreshTokenRoute = `${API_BASE_URL}/userAuth/refreshToken`;
export const updateUserProfileRoute = `${API_BASE_URL}/userAuth/user/update-profile`;

export const addCompanyDetails = `${API_BASE_URL}/company/addCompanyDetails`;
export const fetchCompanyDetailHook = `${API_BASE_URL}/company/scrapeCompanyDetails`;
export const addNewCompany = `${API_BASE_URL}/company/addNewCompany`;
export const getPrimaryCompany = `${API_BASE_URL}/company/primaryCompany`;
export const offerList = `${API_BASE_URL}/company/offer/list`;
export const updateCompanyDetails = `${API_BASE_URL}/company/update/{id}`;
export const companyListing = `${API_BASE_URL}/company/list`;
export const updateCompanyPrimary = `${API_BASE_URL}/company/selectAsPrimary`;
export const getBillingHistory = `${API_BASE_URL}/userAuth/billing-history`;
export const getHomePageData = `${API_BASE_URL}/stats/home-page`;


// Campaign Routes
export const listCampaigns = `${API_BASE_URL}/campaigns/list`;
export const addCampaignDetails = `${API_BASE_URL}/campaigns/create`;
export const addQuizCampaign = `${API_BASE_URL}/campaigns/create`;
export const getCampaignDetail = `${API_BASE_URL}/campaigns/{id}`;
export const updateCampaignDetails = `${API_BASE_URL}/campaigns/{id}`;
export const deleteCampaign = `${API_BASE_URL}/campaigns/{id}`;
export const getCampaignEmails = `${API_BASE_URL}/campaigns/emails/{id}`;


// Offering Routes
export const getOfferings = `${API_BASE_URL}/offer/getOfferList`;
export const addOffering = `${API_BASE_URL}/offer/createOffer`;
export const getOfferDetail = `${API_BASE_URL}/company/offer/detail`;
export const updateOfferDetails = `${API_BASE_URL}/company/offer/update`;
// export const deleteOffering = `${API_BASE_URL}/campaigns/{id}`;

//LEADS
export const listLeads = `${API_BASE_URL}/lead/leads`;
export const getLeadDetail = `${API_BASE_URL}/lead/leads/{id}`;
export const addLeadDetails = `${API_BASE_URL}/lead/leads`;
export const updateLeadDetails = `${API_BASE_URL}/lead/leads/{id}`;
export const deleteLead = `${API_BASE_URL}/lead/leads/{id}`;

//SMTP
export const addSMTPConfig = `${API_BASE_URL}/smtp/smtp-config`;
export const getSMTPConfig = `${API_BASE_URL}/smtp/smtp-config/{id}`;
export const addOrUpdateSMTPEmail = `${API_BASE_URL}/smtp/smtp-email/{companyId}`;

//Quiz
export const getQuiz = `${API_BASE_URL}/quizzes/quiz`;
export const regenerateQuizHooks = `${API_BASE_URL}/quizzes/regenerateQuizHooks`;
export const initiateQuizWithTypeForm = `${API_BASE_URL}/quizzes/createQuizWithTypeForm`;
export const initiateWebscanQuizWithTypeForm = `${API_BASE_URL}/quizzes/createWebscanQuizWithTypeForm`;
export const deleteWebscanCampaign = `${API_BASE_URL}/quizzes/deleteWebscanCampaign`;
export const generateEmails = `${API_BASE_URL}/quizzes/generateWebScanEmails`;
export const fetchQuizResults = `${API_BASE_URL}/quizzes/generateQuizResults`;

