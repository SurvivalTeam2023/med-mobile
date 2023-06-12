import { createSlice } from "@reduxjs/toolkit";
import {
  parseTokenToRole,
  parseTokenToUsername,
  removeTokenFromStorage,
} from "../../utils/app.util";
import {
  removeAllDataFromLocal,
  storeTokenToLocal,
  storeUserToLocal,
} from "../../utils/app.local_handler";

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
      storeUserToLocal(payload).then((r) =>
        console.log("store_user_local_success")
      );
    },
    storeUserWithoutLocal: (state, { payload }) => {
      state.audio = null;
      state.user = payload;
    },
    storeToken: (state, { payload }) => {
      state.username = parseTokenToUsername(payload);
      state.token = payload;
      state.artist_role = parseTokenToRole(payload);
      storeTokenToLocal(payload).then((r) =>
        console.log("store_token_local_success")
      );
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
    logout: () => {
      console.log("ALl Data removed");
      removeAllDataFromLocal();
    },
  },
});
export const userAction = {
  ...reducer.actions,
};
export const userReducer = reducer.reducer;
