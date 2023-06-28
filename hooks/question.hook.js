import { useMutation, useQuery } from "react-query";
import {
  getQuestionBankApi,
  isValidQuiz,
  saveQuizResultApi,
  setQuizStatus,
} from "../api/question.api";

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
  });
export const useSetQuizStatus = (payload) =>
  useMutation({
    mutationFn: (payload) => setQuizStatus(payload),
  });
export const useSaveQuizResultApi = (payload) =>
  useMutation({
    mutationFn: (payload) => saveQuizResultApi(payload),
  });
