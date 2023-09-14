import { useMutation, useQuery } from "react-query";
import {
  getMentalHealthList,
  getSelectedMentalHealthList,
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
export const useGetSelectedMentalHealthListAPI = (payload) => {
  return useQuery({
    queryKey: ["getSelectedMentalHealth"],
    queryFn: async () => {
      const data = await getSelectedMentalHealthList();
      return data;
    },
  });
};

export const useSelectUserMentalHealthAPI = (payload) =>
  useMutation({
    mutationFn: (payload) => selectUserMentalHealth(payload),
  });
