import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genreId: null,
};

const reducer = createSlice({
  name: "genre",
  initialState,
  reducers: {
    setGenreId: (state, action) => {
      state.genreId = action.payload;
    },
  },
});

export const genreAction = {
  ...reducer.actions,
};
export const genreReducer = reducer.reducer;
