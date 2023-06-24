import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  playingList: [],
  currentPlaying: {
    currentAudioIndex: 0,
    soundStatus: {},
  },
  audioAction: "",
  audioActionValue: "",
  currentAction: null,
  isLoading: true,
};
const reducer = createSlice({
  name: "nowPlayingList",
  initialState,
  reducers: {
    setNowPLayingList: (state, action) => {
      state.playingList = markAudioListen(action.payload);
    },
    setCurrentPlayingAudio: (state, action) => {
      state.currentPlaying = action.payload;
    },
    triggerAudioPlayer: (state, action) => {
      state.audioAction = action.payload["audioAction"];
      state.audioActionValue = action.payload["audioActionVaue"];
    },
  },
});
const markAudioListen = (listAudio) => {
  return listAudio.map((audio) => (audio.isPlayed = true));
};
export const nowPlayingAction = {
  ...reducer.actions,
};
export const nowPlayingListReducer = reducer.reducer;

export const ACTION_TYPE = {
  START: "START",
  PAUSE: "PAUSE",
  NEXT_SONG: "NEXT_SONG",
  PREV_SONG: "PREV_SONG",
  MINOR_10_SEC: "MINOR_10_SEC",
  ADD_10_SEC: "ADD_10_SEC",
  CHANGE_SONG_TIMELINE: "CHANGE_SONG_TIMELINE",
  PLAY_SONG_INDEX: "PLAY_SONG_INDEX",
};
