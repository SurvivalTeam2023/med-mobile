import { useQuery } from "react-query";
import { getFavoriteTracksAPI } from "../api/favoriteTracks.api";
import { getAudioListAPI } from "../api/audio.api";

export const useGetAudioListAPI = (payload) =>
  useQuery({
    queryKey: ["getAudioList"],
    queryFn: async () => {
      const data = await getAudioListAPI();
      return data["items"];
    },
  });
