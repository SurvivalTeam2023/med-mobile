import { CallAPI } from "../core/api/baseAxios";

export const getPlaylistAPI = (payload) => {
  const url = "/playlist";
  return CallAPI.get(url);
};
