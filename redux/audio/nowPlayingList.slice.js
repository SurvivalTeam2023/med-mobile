import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createHistoryApi } from "../../api/history.api";
const initialState = {
  playingList: [],
  currentPlayingId: null,
  isLoading: true,
};

export const storeAudioListened = createAsyncThunk(
  "audio/storeAudioListened",
  async (audioId) => {
    const response = await createHistoryApi(audioId).catch((err) =>
      console.log("store_audio_listend: " + err)
    );
    return response;
  }
);
const reducer = createSlice({
  name: "nowPlayingList",
  initialState,
  reducers: {
    setNowPLayingList: (state, action) => {
      state.playingList = markAudioListen(action.payload);
    },
    setCurrentPlayingAudio: (state, action) => {
      state.currentPlayingId = action.payload;
      setAudioPlayed(playingList, action.payload);
      storeAudioListened(action.payload);
    },
  },
});
const markAudioListen = (listAudio) => {
  return listAudio.map((audio) => (audio.isPlayed = true));
};
const setAudioPlayed = (listAudioPlaying, currentPlayingAudioId) => {
  return listAudioPlaying.map((audio) => {
    if (audio.id == currentPlayingAudioId) {
      audio.isPlayed = true;
    }
  });
};
export const imageAction = {
  ...reducer.actions,
};
export const nowPlayingListReducer = reducer.reducer;
