import { store } from "../core/store/store";
import { CallAPI } from "../core/api/baseAxios";

export const getUserProfile = (payload) => {
  const userId = store.getState().user.user.user_db.id;
  const queryParam = `/` + `${userId}`;
  const url = "/user/getProfile" + `${queryParam}`;
  return CallAPI.get(url);
};

export const updateUserAvatar = (payload, image) => {
  const userId = store.getState().user.user.user_db.id;
  const formData  = new FormData();
  formData.append('image', {
    uri: image,
    name: 'image.jpg',
    type: 'image/jpeg',
  });
  const queryParam = `/` + `${userId}`;
  const url = "/user" + `${queryParam}`;
  return CallAPI.put(url, formData, {
    headers:{
      'Content-Type': 'multipart/form-data',
    }
  });
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
