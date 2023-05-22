import { store } from "../core/store/store";
import { CallAPI, CallAPIMulti } from "../core/api/baseAxios";

export const getUserProfile = (payload) => {
  const userId = store.getState().user.user.user_db.id;
  const queryParam = `/` + `${userId}`;
  const url = "/user/getProfile" + `${queryParam}`;
  return CallAPI.get(url);
};

export const updateUserAvatar = (avatar) => {
  const userId = store.getState().user.user.user_db.id;
  const formData = new FormData();
  formData.append("file", {
    uri: avatar,
  });
  const url = "/user/" + `${userId}`;
  return CallAPIMulti.put(url, formData);
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
