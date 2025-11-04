import { postRequest, putRequest, getRequest, delRequest } from "../request";
// import { store } from "../../store";
import {
  deleteWebscanCampaign,
  deleteWebscanQuizWithTypeForm,
  fetchQuizResults,
    generateEmails,
getQuiz,
    initiateQuizWithTypeForm,
    initiateWebscanQuizWithTypeForm,
regenerateQuizHooks} from "../apiroutes";

// const getAuthHeaders = () => {
//   const state = store.getState();
//   console.log(state.auth);
//   const companyId = state.auth.companyDetails?.id || null;
//   console.log(companyId);

//   return { companyId };
// };

export const getQuizHandler = async (data) => {
    const route = `${getQuiz}`;  
    return await postRequest(route, data);
};

export const regenerateQuizHandler = async (data) => {
    const route = `${regenerateQuizHooks}`;  
    return await postRequest(route, data);
};

export const createQuizWithTypeForm = async (quizPayload) => {
    const route = `${initiateQuizWithTypeForm}`;  
    return await postRequest(route, quizPayload);
  };

  export const createWebscanQuizWithTypeForm = async (quizPayload) => {
    const route = `${initiateWebscanQuizWithTypeForm}`;  
    return await postRequest(route, quizPayload);
  };

  export const cascadeWebscanQuizWithTypeForm = async (id) => {
    const route = `${deleteWebscanCampaign}/${id}`;
    return await delRequest(route);
  };

  export const generateEmailsForSubmission = async (quizPayload) => {
    const route = `${generateEmails}`;  
    return await postRequest(route, quizPayload);
  };

  export const getQuizResults = async (quizPayload) => {
    const route = `${fetchQuizResults}`;  
    return await postRequest(route, quizPayload);
  };

