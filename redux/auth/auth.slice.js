import { createSlice } from "@reduxjs/toolkit";
import {
  parseTokenToRole,
  parseTokenToUsername,
  removeTokenFromStorage,
} from "../../utils/app.util";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TOKEN_KEY_STORAGE, USER_KEY_STORAGE} from "../../constants/config";

const storeTokenToLocal = async (payload) => {
  try{
   await AsyncStorage.setItem(TOKEN_KEY_STORAGE, JSON.stringify(payload))
  }catch(error){
    console.log("store_token_error: ", error)
  }
}
const storeUserToLocal = async (payload) => {
  try{
    await AsyncStorage.setItem(USER_KEY_STORAGE, JSON.stringify(payload))
  }catch(error){
    console.log("store_token_error: ", error)
  }
}
const initialState = {
  isTriedLogin: false,
  username: null,
  user: null,
  token: null,
  audio: null,
  artist_role: null,
};
const reducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetState: () => ({ ...initialState }),
    storeUser: (state, { payload }) => {
      state.user = payload;
      storeUserToLocal(payload).then(r => console.log("store_user_local_success"))
    },
    storeToken: (state, { payload }) => {
      state.username = parseTokenToUsername(payload);
      state.token = payload;
      state.artist_role = parseTokenToRole(payload);
      storeTokenToLocal(payload).then(r => console.log("store_token_local_success"))
    },
    storeTokenWithoutLocal: (state, { payload }) => {
      state.username = parseTokenToUsername(payload);
      state.token = payload;
      state.artist_role = parseTokenToRole(payload);
    },
    removeToken: (state, { payload }) => {
      removeTokenFromStorage();
      state.token = null;
    },
    storeAudio: (state, { payload }) => {
      state.audio = payload;
    },
  },
});
export const userAction = {
  ...reducer.actions,
};
export const userReducer = reducer.reducer;
