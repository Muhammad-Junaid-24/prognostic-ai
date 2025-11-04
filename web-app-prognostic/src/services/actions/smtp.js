import { postRequest, getRequest } from "../request";
import { store } from "../../store";
import {
    addOrUpdateSMTPEmail,
    addSMTPConfig,
    getSMTPConfig,
} from "../apiroutes";

const getAuthHeaders = () => {
    const state = store.getState();
    const companyId = state.auth.companyDetails?.id || null;
    return { companyId };
};

export const addSMTPConfiguration = async (data) => {
    return await postRequest(addSMTPConfig, data, {
        headers: getAuthHeaders(),
    });
};

export const addUpdateSMTPEmail = async (companyId, smtpEmail) => {
    return await postRequest(addOrUpdateSMTPEmail.replace('{companyId}', companyId), smtpEmail, {
        headers: getAuthHeaders(),
    });
};

export const getSMTPConfiguration = async () => {
    const state = store.getState();
    const companyId = state.auth.companyDetails?.id;
    const route = getSMTPConfig.replace("{id}", companyId);
    return await getRequest(route, {
        headers: getAuthHeaders(),
    });
};
