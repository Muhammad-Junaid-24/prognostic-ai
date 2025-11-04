import { postRequest, putRequest, getRequest } from "../request";
import {
  addCompanyDetails,
  companyListing,
  updateCompanyPrimary,
  addNewCompany,
  offerList,
  getPrimaryCompany,
  fetchCompanyDetailHook,
} from "../apiroutes";
import configs from "config";

const API_BASE_URL = configs.apiUrl;

export const addCompany = async (data) => {
  return await postRequest(addCompanyDetails, data);
};

export const fetchDetailFromAI = async (companyWebsite) => {
  const queryString = new URLSearchParams({ companyWebsite: companyWebsite }).toString();
  const urlWithParams = `${fetchCompanyDetailHook}?${queryString}`;
  return await getRequest(urlWithParams);
};

export const fetchPrimaryCompany = async () => {
  return await getRequest(getPrimaryCompany);
};

export const addNewCompanyDetails = async (data) => {
  return await postRequest(addNewCompany, data);
};

export const getCompany = async (id) => {
  const route = `${API_BASE_URL}/company/detail/${id}`;
  return await getRequest(route);
};

export const getCompanies = async (filters) => {
  const queryString = new URLSearchParams(filters).toString();
  const urlWithParams = `${companyListing}?${queryString}`;
  return await getRequest(urlWithParams);
};

export const getOfferList = async (filters) => {
  const queryString = new URLSearchParams(filters).toString();
  const urlWithParams = `${offerList}?${queryString}`;
  return await getRequest(urlWithParams);
};

export const updateCompany = async (data, id) => {
  const route = `${API_BASE_URL}/company/update/${id}`;
  return await putRequest(route, data);
};

export const updateCompanyPrimaryMethod = async (data) => {
  const route = updateCompanyPrimary;

  return await postRequest(route, data);
};
