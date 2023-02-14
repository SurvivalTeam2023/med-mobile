import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playlistId: null,
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setPlaylistId: (state, action) => {
      state.playlistId = action.payload;
    },
  },
});

export const { setPlaylistId } = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
