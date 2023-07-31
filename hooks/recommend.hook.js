import { useQuery } from "react-query";
import { getRecommendAudioByQuizResultAPI } from "../api/recommend.api";

export const useGetRecommendAudioByQuizResultAPI = (payload) =>
  useQuery({
    queryKey: ["getRecommendAudioByQuizResult"],
    queryFn: async () => {
      const data = await getRecommendAudioByQuizResultAPI();
      return data;
    },
  });
