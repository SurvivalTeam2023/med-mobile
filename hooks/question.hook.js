import { useQuery } from "react-query";
import { getQuestionBankApi, isValidQuiz } from "../api/question.api";

export const useGetQuestionBankApi = (payload) =>
  useQuery({
    queryKey: ["getQuestionBank"],
    queryFn: async () => {
      const data = await getQuestionBankApi();
      return data;
    },
  });
export const useIsValidQuiz = (payload) =>
  useQuery({
    queryKey: ["getValidQuiz"],
    queryFn: async () => {
      const data = await isValidQuiz();
      return data;
    },
    enabled: false,
  });
