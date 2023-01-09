import { CallAPI } from "../core/api/baseAxios";

export const loginApi = async (payload) => {
  const { username, password } = payload;
  const url = "/auth/token";
  return await CallAPI.post(url, {
    username,
    password,
  });
};

export const registerUserApi = async () => {
  const url = "/user/user";
  return await CallAPI.post(url, data);
};

export const getRefreshTokenApi = async (payload) => {
  const { refreshToken } = payload;
  const url = "/update-token";
  return await CallAPI.post(url, {
    refresh_token: refreshToken,
  });
};
