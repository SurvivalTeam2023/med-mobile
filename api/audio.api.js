import { CallAPI } from "../core/api/baseAxios";

export const getAudioListAPI = () => {
  const url = "/audio?status=ACTIVE";
  return CallAPI.get(url);
};

export const getRecentlyPlayHistoryAudioListAPI = () => {
  const url = "/history";
  return CallAPI.get(url);
};
export const likeAudioApi = (payload) => {
  const { audioId, isLiked } = payload;
  const url = "/audioPlaylist/likedAudio";
  return CallAPI.post(url, {
    audioId,
    isLiked,
  });
};
