import { postRequest, putRequest, getRequest } from "../request";
import { store } from "../../store";
import {
  updateOfferingDetails,
  getOfferings,
  addOffering,
  getOfferDetail,
  updateOfferDetails,
} from "../apiroutes";

const getAuthHeaders = () => {
  const state = store.getState();
  const companyId = state.auth.companyDetails?.id || null;
  return { companyId };
};

export const getOfferingsList = async (params) => {
  const queryParams = new URLSearchParams(params).toString();
  const route = `${getOfferings}?${queryParams}`;
  return await getRequest(route, {
    headers: getAuthHeaders(),
  });
};

export const addNewOffering = async (data) => {
  return await postRequest(addOffering, data, {
    headers: getAuthHeaders(),
  });
};

export const getOfferById = async ({ companyId }) => {
  const route = `${getOfferDetail}?companyId=${companyId}`;
  return await getRequest(route, {
    headers: getAuthHeaders(),
  });
};

export const updateOffering = async ({ companyId, ...data }) => {
  const queryParams = new URLSearchParams({ companyId }).toString();
  const route = `${updateOfferDetails}?${queryParams}`;

  return await putRequest(route, data, {
    headers: getAuthHeaders(),
  });
};
