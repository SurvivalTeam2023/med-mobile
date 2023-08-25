import { useQuery } from "react-query";
import { getMentalHealthList } from "../api/mentalHealth";

export const useGetMentalHealthListAPI = (payload) => {
  return useQuery({
    queryKey: ["getMentalHealth"],
    queryFn: async () => {
      const data = await getMentalHealthList();
      return data;
    },
  });
};
