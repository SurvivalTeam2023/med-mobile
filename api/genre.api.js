import { CallAPI } from "../core/api/baseAxios";

export const getGenreListApi = (payload) => {
    const url = "/genres";
    return CallAPI.get(url);
  };