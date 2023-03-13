import { useQuery } from "react-query";
import { getGenreTracksAPI } from "../api/genreTracks.api";

export const useGetTracksFromGenre = (payload) =>
  useQuery({
    queryKey: ["getAudio"],
    queryFn: async () => {
      const data = await getGenreTracksAPI();
      return data;
    },
  });
