import { useQuery } from "react-query";
import { getQuestionBankApi } from "../api/question.api";

export const useGetQuestionBankApi = (payload) =>
  useQuery({
    queryKey: ["getQuestionBank"],
    queryFn: async () => {
      const data = await getQuestionBankApi();
      return data;
    },
  });
