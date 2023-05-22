import { store } from "../core/store/store";
import { CallAPI } from "../core/api/baseAxios";

export const getUserProfile = (payload) => {
  const userId = store.getState().user.user.user_db.id;
  const queryParam = `/` + `${userId}`;
  const url = "/user/getProfile" + `${queryParam}`;
  return CallAPI.get(url);
};