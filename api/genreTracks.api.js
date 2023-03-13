import { CallAPI } from "../core/api/baseAxios";
import { store } from "../core/store/store";

export const getGenreTracksAPI = async (payload) => {
  const genreId = store.getState().genre.genreId;
  const queryParam = `/` + `${genreId}`;
  const url = "/audio_genre" + `${queryParam}`;
  return CallAPI.get(url);
};
