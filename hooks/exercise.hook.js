import { useQuery } from "react-query";
import {
  getExercisesListByMentalIdAPI,
  getExercisesListBySingleMentalIdAPI,
} from "../api/exercise";

export const useGetExercisesListByMentalIdAPI = (payload) =>
  useQuery({
    queryKey: ["getExercisesListByMentalIdAPI", payload],
    queryFn: async () => {
      const data = await getExercisesListByMentalIdAPI(payload);
      return data;
    },
    enabled: !!payload,
  });
export const useGetExercisesListBySingleMentalIdAPI = (payload) =>
  useQuery({
    queryKey: ["getExercisesListBySingleMentalIdAPI", payload],
    queryFn: async () => {
      const data = await getExercisesListBySingleMentalIdAPI(payload);
      return data;
    },
    enabled: !!payload,
  });
