import { CallAPI } from "../core/api/baseAxios";
import { store } from "../core/store/store";

export const getFavoriteTracksAPI = async (payload) => {
  const genreId = store.getState().favorite.genreId;
  console.log("genreId la gi vay bro?", genreId);
  const queryParam = `/` + `${genreId}`;
  const url = "/audio_genre" + `${queryParam}`;
  console.log("url la gi vay bro?", url);
  return CallAPI.get(url);
};
