import { createSlice } from "@reduxjs/toolkit";
import {
  parseTokenToEmail,
  parseTokenToId,
  parseTokenToRole,
  parseTokenToUsername,
  removeTokenFromStorage,
} from "../../utils/app.util";

const initialState = {
  isTriedLogin: false,
  username: null,
  user: null,
  token: null,
  audio: null,
  artist_role: null,
  id: null,
  email: null,
};
const reducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetState: () => ({ ...initialState }),
    storeUser: (state, { payload }) => {
      state.user = payload;
    },
    storeToken: (state, { payload }) => {
      state.username = parseTokenToUsername(payload);
      state.token = payload;
      state.artist_role = parseTokenToRole(payload);
      state.id = parseTokenToId(payload);
      state.email = parseTokenToEmail(payload);
    },
    removeTOken: (state, { payload }) => {
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
