import { useMutation, useQuery } from "react-query";
import {
  createAudioForArtistApi,
  deleteAudioArtistAPI,
  getAudioForArtistAPI,
  getTracksAPI,
} from "../api/playlistTracks.api";

export const useGetTracksFromPlaylist = (payload) =>
  useQuery({
    queryKey: ["getAudio"],
    queryFn: async () => {
      const data = await getTracksAPI();
      return data;
    },
  });
export const useGetAudioForArtistAPI = (payload) =>
  useQuery({
    queryKey: ["getAudio"],
    queryFn: async () => {
      const data = await getAudioForArtistAPI();
      return data;
    },
  });
export const useCreateAudioForArtistAPI = (payload) =>
  useMutation({
    mutationFn: (payload) => createAudioForArtistApi(payload),
  });
export const useDeleteAudioArtistAPI = (payload) =>
  useMutation({
    mutationFn: (payload) => deleteAudioArtistAPI(payload),
  });
