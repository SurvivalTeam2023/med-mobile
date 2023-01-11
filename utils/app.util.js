import { USER_KEY_STORAGE } from "../constants/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const removeTokenFromStorage = () => {
  AsyncStorage.removeItem(USER_KEY_STORAGE);
};
