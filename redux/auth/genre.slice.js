import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genreId: null,
  genreTrack: null,
  isLoading: true,
};

const reducer = createSlice({
  name: "genre",
  initialState,
  reducers: {
    setGenreId: (state, action) => {
      state.genreId = action.payload;
    },
    setGenreTrack: (state, action) => {
      state.genreTrack = action.payload;
      console.log(action.payload);
      state.isLoading = false;
    },
  },
});

export const genreAction = {
  ...reducer.actions,
};
export const genreReducer = reducer.reducer;
