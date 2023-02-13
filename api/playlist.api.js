import { CallAPI } from "../core/api/baseAxios";
import { store } from "../core/store/store";

export const getPlaylistAPI = (payload) => {
  const userId = store.getState().user.user.user_db.id;
  const queryParam = `?userId=` + `${userId}`;
  const url = "/playlist" + `${queryParam}`;
  return CallAPI.get(url);
};
