import { CallAPI } from "../core/api/baseAxios";
import { store } from "../core/store/store";

export const getTracksAPI = async (payload) => {
  const playlistId = store.getState().playlist.playlistId;
  const queryParam = `playlistId=` + `${playlistId}`;
  const url = "/audio?status=ACTIVE&" + `${queryParam}`;
  return CallAPI.get(url);
};
