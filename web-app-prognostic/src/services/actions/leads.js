import { postRequest, putRequest, getRequest, delRequest } from "../request";
import { store } from "../../store";
import {
    addLeadDetails,
    updateLeadDetails,
    deleteLead,
    listLeads,
    getLeadDetail,
    getHomePageData,
} from "../apiroutes";

const getAuthHeaders = () => {
    const state = store.getState();
    const companyId = state.auth.companyDetails?.id || null;
    return { companyId };
};

export const getLeadsList = async (params) => {
    const queryParams = new URLSearchParams(params).toString();
    const route = `${listLeads}?${queryParams}`;
    return await getRequest(route, {
        headers: getAuthHeaders(),
    });
};

export const getHomePageStats = async (id) => {
    const route = `${getHomePageData}?companyId=${id}`;
    return await getRequest(route, {
        headers: getAuthHeaders(),
    });
};

export const addLead = async (data) => {
    return await postRequest(addLeadDetails, data, {
        headers: getAuthHeaders(),
    });
};

export const getLeadDetailById = async (id) => {
    const route = getLeadDetail.replace("{id}", id);
    return await getRequest(route, {
        headers: getAuthHeaders(),
    });
};

export const updateLead = async (id, data) => {
    const route = updateLeadDetails.replace("{id}", id);
    return await putRequest(route, data, {
        headers: getAuthHeaders(),
    });
};

export const deleteLeadById = async (id) => {
    const route = deleteLead.replace("{id}", id);
    return await delRequest(route, {
        headers: getAuthHeaders(),
    });
};
