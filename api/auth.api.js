import { CallAPI } from "core/api";

export const getTokenApi = () => {
  const url = "/auth/token";
  return CallAPI.post(url, {
    username,
    password,
  });
};

export const registerUserApi = () => {
  const url = "/user/user";
  return CallAPI.post(url, data);
};

export const getRefreshTokenApi = () => {
  const url = "/update-token";
  return CallAPI.post(url, {
    refresh_token: refreshToken,
  });
};
