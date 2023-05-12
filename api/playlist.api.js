import { CallAPI } from "../core/api/baseAxios";
import { store } from "../core/store/store";

export const getPlaylistAPI = (payload) => {
  console.log("dmmm", store.getState().user.user.user_keycloak.id);
  const userId = store.getState().user.user.user_db.id;
  const queryParam = `?authorId=` + `${userId}`;
  const url = "/playlist" + `${queryParam}`;
  return CallAPI.get(url);
};

export const deletePlaylistAPI = (payload) => {
  const playlistId = store.getState().playlist.playlistId;
  const url = "/playlist/" + `${playlistId}`;
  return CallAPI.delete(url);
};

export const createPlaylistAPI = (payload) => {
  const { name, imageUrl, status, description } = payload;
  const url = "/playlist";
  return CallAPI.post(url, {
    name,
    imageUrl,
    status,
    description,
  });
};
