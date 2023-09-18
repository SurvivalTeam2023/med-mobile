import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedId: null,
};
const reducer = createSlice({
  name: "mentalHealth",
  initialState,
  reducers: {
    resetState: () => ({ ...initialState }),
    setSelectMentalHealth: (state, payload) => {
      state.selectedId = payload.payload;
    },
  },
});
export const mentalHealthAction = {
  ...reducer.actions,
};
export const mentalHealthReducer = reducer.reducer;
