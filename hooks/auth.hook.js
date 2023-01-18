import { useMutation, useQuery } from "react-query";
import {getRefreshTokenApi, getUserByNameApi, loginApi, loginWithGoogleApi, registerUserApi } from "../api/auth.api";


export const useLogin = (payload) =>
  useMutation({
    mutationFn: (payload) => loginApi(payload),
  });
export const useLoginWithGmail = (payload) =>
  useMutation({
    mutationFn: (payload) => loginWithGoogleApi(payload),
  });

export const useRegisterUser = (payload) =>
  useMutation({
    mutationFn: (payload) => registerUserApi(payload),
  });

export const useRefreshToken = (payload) =>
  useMutation({
    mutationFn: (payload) => getRefreshTokenApi(payload),
  });

export const useGetUserByNameApi = (payload) =>
useQuery({
  queryKey: ['getUsername'],
  queryFn: async (payload) => {
    const data = await getUserByNameApi(payload)
    return data
  },
})


