import { CallAPI } from "../core/api/baseAxios";
import { store } from "../core/store/store";

export const getFavoriteTracksAPI = async (payload) => {
  const genreId = store.getState().favorite.genreId;
  const queryParam = `/` + `${genreId}`;
  const url = "/audio_genre" + `${queryParam}`;
  return CallAPI.get(url);
};
