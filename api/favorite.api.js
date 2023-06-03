import { CallAPI } from "../core/api/baseAxios";
import { store } from "../core/store/store";

export const getFavoriteAPI = (payload) => {
  const user = store.getState()?.user?.user;
  const userId = user?.user_db?.id;
  const queryParam = `/` + `${userId}`;
  const url = "/favorite" + `${queryParam}`;
  return CallAPI.get(url);
};

export const isFavoriteExisted = (payload) => {
  const url = "/favorite";
  return CallAPI.get(url);
};

export const createFavoriteApi = (payload) => {
  const url = "/favorite";
  const { genreId } = payload;
  return CallAPI.post(url, {
    genreId,
  });
};
