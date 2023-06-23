import { CallAPI } from "../core/api/baseAxios";

export const getUserDataByUsername = (username) => {
  const queryUrl = `/user/${username}`;
  return CallAPI.get(queryUrl);
};

export const getUserProfileByUserId = (userId) => {
  const queryUrl = `/user/getProfile/${userId}`;
  return CallAPI.get(queryUrl);
};

export const updateUserAvatar = (form) => {
  const url = "/user";
  return CallAPIMulti.put(url, form);
};

export const updateUserAccountDetails = (form) => {
  const url = "/user";
  return CallAPIMulti.put(url, form);
};
