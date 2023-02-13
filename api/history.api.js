import { CallAPI } from "../core/api/baseAxios";

export const createHistoryApi = (payload) => {
  const { audioId } = payload;
  const url = "/history/create";
  return CallAPI.post(url, {
    audioId,
  });
};
