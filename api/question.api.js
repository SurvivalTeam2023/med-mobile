import { CallAPI } from "../core/api/baseAxios";

export const getQuestionBankApi = (payload) => {
  const url = "/questionBank";
  return CallAPI.post(url);
};
