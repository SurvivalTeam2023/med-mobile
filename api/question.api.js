import { CallAPI } from "../core/api/baseAxios";
import { store } from "../core/store/store";

export const getQuestionBankApi = (payload) => {
  const url = "/questionBank";
  return CallAPI.post(url);
};
export const saveQuizResultApi = (payload) => {
  const { questionBankId, status, optionId } = payload;
  const url = "/result";
  return CallAPI.post(url, payload);
};

export const isValidQuiz = (payload) => {
  const url = "/questionBank";
  return CallAPI.get(url);
};

export const getFinishedQuiz = (payload) => {
  const url = "/questionBank/user";
  return CallAPI.get(url);
};

export const setQuizStatus = (payload) => {
  const questionBankId = store.getState().question.questionBankId;
  const queryParam = `/` + `${questionBankId}`;
  const url = "/questionBank" + `${queryParam}`;
  return CallAPI.patch(url);
};
