import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genreId: [],
};

const favoriteSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {
    setGenreId: (state, action) => {
      state.genreId = action.payload;
    },
  },
});

export const { setGenreId } = favoriteSlice.actions;
export const favoriteReducer = favoriteSlice.reducer;
