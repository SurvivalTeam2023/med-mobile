import { useQuery, useMutation } from "react-query";
import { getFavoriteAPI, createFavoriteApi } from "../api/favorite.api";

export const useGetFavorite = (payload) =>
  useQuery({
    queryKey: ["getFavorite"],
    queryFn: async () => {
      const data = await getFavoriteAPI();
      return data;
    },
  });

export const useCreateFavoriteApi = () =>
  useMutation({
    mutationFn: (payload) => createFavoriteApi(payload),
  });
