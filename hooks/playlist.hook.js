import { useQuery } from "react-query";
import { getPlaylistAPI } from "../api/playlist.api";

export const useGetPlaylist = (payload) =>
  useQuery({
    queryKey: ["getPlaylist"],
    queryFn: async () => {
      const data = await getPlaylistAPI();
      return data;
    },
  });
