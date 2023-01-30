import { CallAPI } from "../core/api/baseAxios";
import queryString from "query-string";
import { store } from "../core/store/store";

export const getUserByNameApi = (payload) => {
  const userName = store.getState().user.username;
  // const paramValue = queryString.stringify({ username: userName });
  const queryParam = "/" + `${userName}`;
  const url = "/user" + `${queryParam}`;
  // const { username } = payload;
  return CallAPI.get(url, {});
};
