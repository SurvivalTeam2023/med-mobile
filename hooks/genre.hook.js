import { useMutation } from "react-query";
import { getGenreListApi } from "../api/genre.api";


export const useGetGenreList = (payload) =>
  useMutation({
    mutationFn: (payload) => getGenreListApi(payload),
  });