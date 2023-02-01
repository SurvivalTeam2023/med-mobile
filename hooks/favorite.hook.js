import { useQuery } from "react-query";
import { getPlaylistAPI } from "../api/playlist.api";

export const useGetFavorite = (payload) =>
  useQuery({
    queryKey: ["getFavorite"],
    queryFn: async () => {
      const data = await getFavoriteAPI();
      return data;
    },
  });
