import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trialTurnLeft: 5,
};
const reducer = createSlice({
  name: "ads",
  initialState,
  reducers: {
    resetState: () => ({ ...initialState }),
    minuteOneTurn: (state, payload) => {
      state.trialTurnLeft = state.trialTurnLeft - 1;
    },
  },
});
export const adsAction = {
  ...reducer.actions,
};
export const adsReducer = reducer.reducer;
