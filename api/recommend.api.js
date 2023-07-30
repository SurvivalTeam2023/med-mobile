import { CallAPI } from "../core/api/baseAxios";

export const getRecommendAudioByQuizResultAPI = () => {
  const url = "/recommendation/mental";
  return CallAPI.get(url);
};
