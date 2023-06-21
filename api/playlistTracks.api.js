import { CallAPI } from "../core/api/baseAxios";
import { store } from "../core/store/store";
import { getUserFromDb } from "../utils/app.util";

export const getTracksAPI = async (payload) => {
  const playlistId = store.getState().playlist.playlistId;
  const queryParam = `playlistId=` + `${playlistId}`;
  const url = "/audio?status=ACTIVE&" + `${queryParam}`;
  return CallAPI.get(url);
};
export const getAudioForArtistAPI = async () => {
  const playlistId = store.getState().playlist.playlistId;
  const artist = store.getState()?.user?.user;
  const artistId = artist?.user_db?.id;
  const queryParam =
    `playlistId=` + `${playlistId}` + `&artistId=` + `${artistId}`;
  const url = "/audio?status=ACTIVE&" + `${queryParam}`;
  return CallAPI.get(url);
};
export const getAudioByIdForArtistAPI = async (payload) => {
  const audioArtistId = store.getState().audioArtist.audioArtistId;
  const queryParam = `${audioArtistId}`;
  if (!audioArtistId) return;
  const url = "/audio/" + `${queryParam}`;
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
export const updateAudioForArtistApi = (payload) => {
  const { name } = payload;
  const audioArtistId = store.getState().audioArtist.audioArtistId;
  const queryParam = `${audioArtistId}`;
  const url = "/audio/" + `${queryParam}`;
  return CallAPI.put(url, {
    name,
  });
};

export const deleteAudioArtistAPI = (payload) => {
  const audioId = store.getState().audioArtist.audioArtistId;
  const url = "/audio/" + `${audioId}`;
  return CallAPI.delete(url);
};

export const getAudioForLikedTracksAPI = async (payload) => {
  const userId = getUserFromDb().id;
  const queryParam = `&authorId=` + `${userId}` + `&playListType=LIKED`;
  const url = "/playlist?" + `${queryParam}`;
  return CallAPI.get(url);
};
