import { useQuery } from "react-query";
import { getFavoriteAPI } from "../api/favorite.api";

export const useGetFavorite = (payload) =>
  useQuery({
    queryKey: ["getFavorite"],
    queryFn: async () => {
      const data = await getFavoriteAPI();
      return data;
    },
  });
