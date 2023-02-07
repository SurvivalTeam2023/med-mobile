import { CallAPI } from "../core/api/baseAxios";
import { store } from "../core/store/store";

export const getFavoriteAPI = (payload) => {
  const userId = store.getState().user.user.user_db.id;
  const queryParam = `/` + `${userId}`;
  const url = "/Favorite" + `${queryParam}`;
  return CallAPI.get(url);
};
