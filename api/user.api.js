import { CallAPI } from "../core/api/baseAxios";
import { store } from "../core/store/store";

export const getUserByNameApi = (payload) => {
  const userName = store.getState().user.username;
  const queryParam = "/" + `${userName}`;
  const url = "/user" + `${queryParam}`;
  return CallAPI.get(url);
};
