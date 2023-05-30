import { store } from "../core/store/store";
import { CallAPI, CallAPIMulti } from "../core/api/baseAxios";

export const getUserProfile = (payload) => {
  const userId = store.getState().user.user.user_db.id;
  const queryParam = `/` + `${userId}`;
  const url = "/user/getProfile" + `${queryParam}`;
  return CallAPI.get(url);
};

export const updateUserAvatar = (form) => {
  const userId = store.getState().user.user.user_db.id;
  const url = "/user/" + `${userId}`;
  return CallAPIMulti.put(url, form);
};

// export const updateUserAvatar = (payload) => {
//   const queryParam = `/` + `${userId}`;
//   const url = "/user" + `${queryParam}`;
//   const { userId, planId, startDate } = payload;
//   return CallAPI.put(url, payload, {
//     userId,
//     planId,
//     startDate,
//   });
// };
