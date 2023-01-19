import { CallAPI } from "../core/api/baseAxios";

export const getUserByNameApi = (payload) => {
  const url = "/user/";
  const { username } = payload;
  return CallAPI.get(url, {
    params: username,
  });
};
