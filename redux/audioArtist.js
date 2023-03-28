import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  audioArtistId: null,
};

const reducer = createSlice({
  name: "audioArtist",
  initialState,
  reducers: {
    setAudioArtistId: (state, action) => {
      state.audioArtistId = action.payload;
    },
  },
});

export const audioArtistAction = {
  ...reducer.actions,
};
export const audioArtistReducer = reducer.reducer;
