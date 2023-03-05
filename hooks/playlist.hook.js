import { useMutation, useQuery } from "react-query";
import { createPlaylistAPI, getPlaylistAPI } from "../api/playlist.api";

export const useGetPlaylist = (payload) =>
  useQuery({
    queryKey: ["getPlaylist"],
    queryFn: async () => {
      const data = await getPlaylistAPI();
      return data;
    },
  });

export const useCreatePlaylistAPI = (payload) =>
  useMutation({
    mutationFn: (payload) => createPlaylistAPI(payload),
  });
