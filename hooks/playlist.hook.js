import { useMutation, useQuery } from "react-query";
import {
  createPlaylistAPI,
  deletePlaylistAPI,
  getPlaylistAPI,
  updatePlaylistforArtistAPI,
} from "../api/playlist.api";

export const useGetPlaylist = (payload) =>
  useQuery({
    queryKey: ["getPlaylist", payload],
    queryFn: async () => {
      const data = await getPlaylistAPI(payload);
      return data["items"];
    },
  });

export const useCreatePlaylistAPI = (payload) =>
  useMutation({
    mutationFn: (payload) => createPlaylistAPI(payload),
  });

export const useUpdatePlaylistForArtistAPI = (payload) =>
  useMutation({
    mutationFn: (payload) => updatePlaylistforArtistAPI(payload),
  });

export const useDeletePlaylistAPI = (payload) =>
  useMutation({
    mutationFn: (payload) => deletePlaylistAPI(payload),
  });
