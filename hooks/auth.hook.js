import { useQuery, useMutation } from "react-query";
import { getRefreshTokenApi, loginApi, registerUserApi } from "../api/auth.api";

export const useLogin = (payload) =>
  useMutation({
    mutationFn: (payload) => loginApi(payload),
  });

export const useRegisterUser = (payload) =>
  useMutation({
    mutationFn: (payload) => registerUserApi(payload),
  });

export const useRefreshToken = (payload) =>
  useMutation({
    mutationFn: (payload) => getRefreshTokenApi(payload),
  });
