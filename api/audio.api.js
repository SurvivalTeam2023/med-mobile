import { CallAPI } from "../core/api/baseAxios";

export const getAudioListAPI = () => {
  const url = "/audio?status=ACTIVE";
  return CallAPI.get(url);
};
export const getAudioListByNameAPI = (audioName) => {
  const url = "/audio?name=" + `${audioName}` + "&status=ACTIVE";
  return CallAPI.get(url);
};

export const getRecentlyPlayHistoryAudioListAPI = () => {
  const url = "/history";
  return CallAPI.get(url);
};
