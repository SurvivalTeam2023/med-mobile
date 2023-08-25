import { CallAPI } from "../core/api/baseAxios";

export const getAudioListAPI = () => {
  const url = "/audio?status=ACTIVE";
  return CallAPI.get(url);
};
export const getAudioRecommendByMentalIdAPI = (mentalId) => {
  const url = "/recommendation/mental/" + `${mentalId}`;
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
export const likeAudioAPI = (payload) => {
  const { audioId, isLiked } = payload;
  const url = "/audioUser";
  return CallAPI.post(url, { audioId, isLiked });
};
