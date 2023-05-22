import { CallAPI } from "../core/api/baseAxios";
import { store } from "../core/store/store";

export const createHistoryApi = (payload) => {
  const { audioId } = payload;
  const url = "/history/create";
  return CallAPI.post(url, {
    audioId,
  });
};

export const getHistoryAPI = (payload) => {
  const userId = store.getState().user.id;
  const queryParam = `/` + `${userId}`;
  const url = "/history" + `${queryParam}`;
  return CallAPI.get(url);
};
