import { USER_KEY_STORAGE } from "../constants/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const removeTokenFromStorage = () => {
  AsyncStorage.removeItem(USER_KEY_STORAGE);
};

export const parseTokenToUsername = (token) => {
  let token_decoded = jwtDecode(token);
  return token_decoded["preferred_username"];
};
