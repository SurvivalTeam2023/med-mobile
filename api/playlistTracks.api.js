import { CallAPI } from "../core/api/baseAxios";
import { store } from "../core/store/store";

export const getTracksAPI = async (payload) => {
  const playlistId = store.getState().playlist.playlistId;
  const queryParam = `playlistId=` + `${playlistId}`;
  const url = "/audio?status=ACTIVE&" + `${queryParam}`;
  return CallAPI.get(url);
};
export const getAudioForArtistAPI = async (payload) => {
  const playlistId = store.getState().playlist.playlistId;
  const artistId = store.getState().user.user.user_db.id;
  const queryParam =
    `playlistId=` + `${playlistId}` + `&artistId=` + `${artistId}`;
  const url = "/audio?status=ACTIVE&" + `${queryParam}`;
  return CallAPI.get(url);
};
export const createAudioForArtistApi = (payload) => {
  const { name, imageUrl, status, length, playlistId, genreId } = payload;
  const url = "/audio";
  return CallAPI.post(url, {
    name,
    imageUrl,
    status,
    length,
    playlistId,
    genreId,
  });
};
