import { USER_KEY_STORAGE } from "../constants/config";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const removeTokenFromStorage = () => {
  AsyncStorage.removeItem(USER_KEY_STORAGE);
};

export const parseTokenToUsername = (token) => {
  let token_decoded = jwtDecode(token);
  return token_decoded["preferred_username"];
};

export const formatQuestionData = (originRaw) => {
  const dataRaw = JSON.parse(JSON.stringify(originRaw));
  const dataFormat = dataRaw.map((item) => {
    return {
      id: item["question"].id,
      question: item["question"].question,
      status: item["question"].status,
      option: item["question"].option,
      selected: null,
    };
  });
  return dataFormat;
};
