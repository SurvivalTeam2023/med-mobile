import { CallAPI } from "../core/api/baseAxios";

export const getAudioListAPI = () => {
  const url = "/audio?status=ACTIVE";
  return CallAPI.get(url);
};
