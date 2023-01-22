import { useMutation } from "react-query";
import { getUserByNameApi } from "../api/user.api";

export const useGetUserByNameApi = (payload) =>
  useMutation({
    mutationFn: (payload) => getUserByNameApi(payload),
  });
