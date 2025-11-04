import { postRequest, putRequest, getRequest, delRequest } from "../request";
import { store } from "../../store";
import {
  addCampaignDetails,
  updateCampaignDetails,
  deleteCampaign,
  listCampaigns,
  getCampaignDetail,
  getCampaignEmails,
  addQuizCampaign,
} from "../apiroutes";

const getAuthHeaders = () => {
  const state = store.getState();
  const companyId = state.auth.companyDetails?.id || null;
  return { companyId };
};

// Get Campaigns List
// export const getCampaignsList = async (params) => {
//     const queryParams = new URLSearchParams(params).toString();
//     const route = `${listCampaigns}?${queryParams}`;
//     console.log("Campaigns List API Request:", route);
//     return await getRequest(route, {
//         headers: getAuthHeaders(),
//     });
// };

export const getCampaignsList = async (params) => {
  const queryParams = new URLSearchParams(params).toString();
  const route = `${listCampaigns}?${queryParams}`;
  return await getRequest(route, {
    headers: getAuthHeaders(), 
  });
};

export const addCampaign = async (data) => {
  return await postRequest(addCampaignDetails, data, {
    headers: getAuthHeaders(),
  });
};

export const addCampaignQuiz = async (data) => {
  return await postRequest(addQuizCampaign, data, {
    headers: getAuthHeaders(),
  });
};

// Get Campaigns List
// export const getCampaignsList = async (params) => {
//     const queryParams = new URLSearchParams(params).toString();
//     const route = `${listCampaigns}?${queryParams}`;
//     return await getRequest(route, {
//         headers: getAuthHeaders(),
//     });
// };

// Get Campaign Details
export const getCampaignDetailById = async (id) => {
  const route = getCampaignDetail.replace("{id}", id);
  return await getRequest(route, {
    headers: getAuthHeaders(),
  });
};

export const getCampaignEmailsById = async (id) => {
  const route = getCampaignEmails.replace("{id}", id);
  return await getRequest(route, {
    headers: getAuthHeaders(),
  });
};


export const updateCampaign = async (id, data) => {
  const route = updateCampaignDetails.replace("{id}", id);
  return await putRequest(route, data, {
    headers: getAuthHeaders(),
  });
};

export const getFormSubmissions = async (id, data) => {
  const route = updateCampaignDetails.replace("{id}", id);
  return await putRequest(route, data, {
    headers: getAuthHeaders(),
  });
};

export const deleteCampaignById = async (id) => {
  const route = deleteCampaign.replace("{id}", id);
  return await delRequest(route, {
    headers: getAuthHeaders(),
  });
};
