import { CallAPI } from "../core/api/baseAxios";
import { store } from "../core/store/store";

export const getFavoriteGenreAPI = () => {
  const url = "/genreUser/userId";
  return CallAPI.get(url);
};

export const isFavoriteExisted = (payload) => {
  const url = "/genreUser";
  return CallAPI.get(url);
};

export const createFavoriteApi = (payload) => {
  const url = "/genreUser";
  const { genreId } = payload;
  return CallAPI.post(url, {
    genreId,
  });
};
