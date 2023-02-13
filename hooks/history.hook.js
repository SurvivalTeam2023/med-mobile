import { useMutation } from "react-query";
import { createHistoryApi } from "../api/history.api";

export const useCreateHisoryApi = (payload) =>
  useMutation({
    mutationFn: (payload) => createHistoryApi(payload),
  });
