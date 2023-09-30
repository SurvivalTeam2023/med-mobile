import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idSelected: null,
  dataSelected: null,
  forceRender: null,
};
const reducer = createSlice({
  name: "mentalHealth",
  initialState,
  reducers: {
    resetState: () => ({ ...initialState }),
    setSelectMentalHealth: (state, payload) => {
      const { id, data } = payload.payload;
      state.idSelected = id;
      state.dataSelected = data;
    },
    setForceRender: (state, payload) => {
      state.forceRender = Math.random();
    },
  },
});
export const mentalHealthAction = {
  ...reducer.actions,
};
export const mentalHealthReducer = reducer.reducer;
