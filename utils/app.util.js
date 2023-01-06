import { USER_KEY_STORAGE } from "../constants/config";

export const removeTokenFromStorage = () => {
  SyncStorage.remove(USER_KEY_STORAGE);
};
