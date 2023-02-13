import { CallAPI } from "../core/api/baseAxios";
import { store } from "../core/store/store";

export const getRecenlyAPI = (payload) => {
  const userId = store.getState().user.user.user_db.id;
  const queryParam = `?userId=` + `${userId}`;
  const url = "/recenly" + `${queryParam}`;
  return CallAPI.get(url);
};
