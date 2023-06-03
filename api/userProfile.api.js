import { store } from "../core/store/store";
import { CallAPI, CallAPIMulti } from "../core/api/baseAxios";

export const getUserProfile = (payload) => {
  const user = store.getState()?.user?.user;
  const userId = user?.user_db?.id;
  const queryParam = `/` + `${userId}`;
  const url = "/user/getProfile" + `${queryParam}`;
  return CallAPI.get(url);
};

export const updateUserAvatar = (form) => {
  const userId = store.getState().user.user.user_db.id;
  const url = "/user/" + `${userId}`;
  return CallAPIMulti.put(url, form);
};
