import { useQuery } from "react-query";
import {
  getAudioListAPI,
  getAudioListByNameAPI,
  getRecentlyPlayHistoryAudioListAPI,
} from "../api/audio.api";

export const useGetAudioListAPI = (payload) =>
  useQuery({
    queryKey: ["getAudioList"],
    queryFn: async () => {
      const data = await getAudioListAPI();
      return data["items"];
    },
  });
export const useGetAudioListByNameAPI = (payload) =>
  useQuery({
    queryKey: ["getAudioListByName"],
    queryFn: async () => {
      const data = await getAudioListByNameAPI(payload);
      return data["items"];
    },
    enabled: !!payload,
  });
export const useGetRecentlyPlayHistoryAudioListAPI = (payload) =>
  useQuery({
    queryKey: ["getRecentlyPlay"],
    queryFn: async () => {
      const data = await getRecentlyPlayHistoryAudioListAPI();
      return data;
    },
  });
