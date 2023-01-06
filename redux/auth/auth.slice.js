import { createSlice } from "@reduxjs/toolkit";
import { removeTokenFromStorage } from "../../utils/app.util";

const initialState = {
  isTriedLogin: false,
  user: null,
  token: null,
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
      state.token = payload;
    },
    removeTOken: (state, { payload }) => {
      removeTokenFromStorage();
      state.token = null;
    },
  },
});
export const userAction = {
  ...reducer.actions,
};
export const userReducer = reducer.reducer;
