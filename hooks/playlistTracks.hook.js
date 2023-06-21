import { useMutation, useQuery } from "react-query";
import {
  createAudioForArtistApi,
  deleteAudioArtistAPI,
  getAudioByIdForArtistAPI,
  getAudioForArtistAPI,
  getAudioForLikedTracksAPI,
  getTracksAPI,
  updateAudioForArtistApi,
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
    queryKey: ["getAudioForArtist"],
    queryFn: async () => {
      const data = await getAudioForArtistAPI();
      if (data !== null) {
        return data;
      } else {
        console.log("Can not get audio List from API");
      }
    },
  });
export const useGetAudioByIdForArtistAPI = (payload) =>
  useQuery({
    queryKey: ["getAudioById"],
    queryFn: async () => {
      const data = await getAudioByIdForArtistAPI();
      if (!data) return;
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
export const useUpdateAudioArtistAPI = (payload) =>
  useMutation({
    mutationFn: (payload) => updateAudioForArtistApi(payload),
  });

export const useGetAudioForLikedTracksAPI = (payload) =>
  useQuery({
    queryKey: ["getAudio"],
    queryFn: async () => {
      const data = await getAudioForLikedTracksAPI();
      return data;
    },
  });
