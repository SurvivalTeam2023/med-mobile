import { useMutation, useQuery } from "react-query";
import {
  getMentalHealthList,
  selectUserMentalHealth,
} from "../api/mentalHealth";

export const useGetMentalHealthListAPI = (payload) => {
  return useQuery({
    queryKey: ["getMentalHealth"],
    queryFn: async () => {
      const data = await getMentalHealthList();
      return data;
    },
  });
};

export const useSelectUserMentalHealthAPI = (payload) =>
  useMutation({
    mutationFn: (payload) => selectUserMentalHealth(payload),
  });
