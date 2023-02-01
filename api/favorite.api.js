import { CallAPI } from "../core/api/baseAxios";

export const getFavoriteAPI = (payload) => {
  const url = "/favorite";
  return CallAPI.get(url);
};
