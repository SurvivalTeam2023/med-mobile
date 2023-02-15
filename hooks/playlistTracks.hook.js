import { useQuery } from "react-query";
import { getTracksAPI } from "../api/playlistTracks.api";

export const useGetTracksFromPlaylist = (payload) =>
  useQuery({
    queryKey: ["getAudio"],
    queryFn: async () => {
      const data = await getTracksAPI();
      return data;
    },
  });
