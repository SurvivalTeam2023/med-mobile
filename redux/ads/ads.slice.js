import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trialTurnLeft: 7,
  subscriptionData: null,
};
const reducer = createSlice({
  name: "ads",
  initialState,
  reducers: {
    resetState: () => ({ ...initialState }),
    minuteOneTurn: (state, payload) => {
      state.trialTurnLeft = state.trialTurnLeft - 1;
    },
    setSubscription: (state, payload) => {
      console.log("store",payload);
      state.subscriptionData = payload.payload
    }
  },
});
export const adsAction = {
  ...reducer.actions,
};
export const adsReducer = reducer.reducer;
