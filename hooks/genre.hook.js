import {  useMutation, useQuery } from "react-query";
import { getGenreListApi } from "../api/genre.api";

export const useGetGenreList = (payload) =>
useQuery({
  queryKey: ['getGenreList'],
  queryFn: async () => {
    const data = await getGenreListApi()
    return data
  },
})

