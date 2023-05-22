import { CallAPI } from "../core/api/baseAxios";
import { store } from "../core/store/store";

export const getArtistTotalFollowerApi = (payload) => {
  const artistId = store.getState().user.id;
  const queryParam = `/` + `${artistId}`;
  const url = "/followedArtist" + `${queryParam}`;
  return CallAPI.get(url);
};
