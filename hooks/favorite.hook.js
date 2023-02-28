import { useQuery, useMutation } from "react-query";
import {
  getFavoriteAPI,
  createFavoriteApi,
  isFavoriteExisted,
} from "../api/favorite.api";

export const useGetFavorite = (payload) =>
  useQuery({
    queryKey: ["getFavorite"],
    queryFn: async () => {
      const data = await getFavoriteAPI();
      return data;
    },
  });

export const useIsFavoriteExisted = (payload) =>
  useQuery({
    queryKey: ["isFavoriteExisted"],
    queryFn: async () => {
      const data = await isFavoriteExisted();
      return data;
    },
    enabled: false,
  });

export const useCreateFavoriteApi = () =>
  useMutation({
    mutationFn: (payload) => createFavoriteApi(payload),
  });
