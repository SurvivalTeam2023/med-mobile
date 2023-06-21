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
  const url = "/user";
  return CallAPIMulti.put(url, form);
};

export const updateUserAccountDetails = (form) => {
  const url = "/user";
  return CallAPIMulti.put(url, form);
};
