import { useMutation, useQuery } from "react-query";
import {
  createPlaylistAPI,
  deletePlaylistAPI,
  getPlaylistAPI,
  getPlaylistByIdAPI,
  getPlaylistforUserAPI,
  updatePlaylistforArtistAPI,
} from "../api/playlist.api";

export const useGetPlaylist = (payload) =>
  useQuery({
    queryKey: ["getPlaylist"],
    queryFn: async () => {
      const data = await getPlaylistAPI();
      return data;
    },
  });
export const useGetPlaylistByIdAPI = (payload) =>
  useQuery({
    queryKey: ["getPlaylistById"],
    queryFn: async () => {
      const data = await getPlaylistByIdAPI();
      return data;
    },
    enabled: false,
  });

export const useGetPlaylistForUser = (payload) =>
  useQuery({
    queryKey: ["getPlaylist"],
    queryFn: async () => {
      const data = await getPlaylistforUserAPI();
      return data;
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
