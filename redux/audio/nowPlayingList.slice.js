import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createHistoryApi } from "../../api/history.api";
const initialState = {
  playingList: [
    {
      id: 1,
      name: "Em của ngày hôm qua",
      url: "https://mp3-s1-zmp3.zmdcdn.me/6c15cefab4be5de004af/218878317877648665?authen=exp=1686840645~acl=/6c15cefab4be5de004af/*~hmac=a437548ce313e70ca44472a60e52f084&fs=MTY4NjY2Nzg0NTM4Nnx3ZWJWNnwwfDI3LjY0LjMwLjIzNQ",
      imgUrl:
        "https://public-med-bucket-v2.s3.ap-southeast-1.amazonaws.com/default_images/default_sound_cover.jpg",
      artist: "Sơn tùng MTP",
      isLoved: true,
    },
    {
      id: 2,
      name: "Bài gì đó của amee",
      url: "https://mp3-s1-zmp3.zmdcdn.me/13e3d26f9c2f75712c3e/6135008632595436642?authen=exp=1686934686~acl=/13e3d26f9c2f75712c3e/*~hmac=a3f7cf91d132e670a01cb8e17df9c0ed&fs=MTY4NjmUsIC2MTg4NjmUsIC4OHx3ZWJWNnwwfDI3LjY0LjMwLjIzNQ",
      imgUrl:
        "https://public-med-bucket-v2.s3.ap-southeast-1.amazonaws.com/default_images/default_sound_cover.jpg",
      artist: "Amee",
      isLoved: false,
    },
    {
      id: 4,
      name: "Con trai cưng của mẹ",
      url: "  https://mp3-s1-zmp3.zmdcdn.me/07adfb21ed61043f5d70/8890654532567428654?authen=exp=1686940410~acl=/07adfb21ed61043f5d70/*~hmac=2db65bb9beefc458a85980764767b5f3&fs=MTY4NjmUsIC2NzYxMDMwMnx3ZWJWNnwwfDI3LjY0LjMwLjIzNQ",
      imgUrl:
        "https://public-med-bucket-v2.s3.ap-southeast-1.amazonaws.com/default_images/default_sound_cover.jpg",
      artist: "Bray",
      isLoved: true,
    },
  ],
  currentPlaying: null,
  currentAction: null,
  actionValue: null,
  soundStatus: {},
  isLoading: true,
};

export const storeAudioListened = createAsyncThunk(
  "audio/storeAudioListened",
  async (audioId) => {
    if (!audioId) return;
    const response = await createHistoryApi(audioId)
      .then((res) => console.log("store_audio_listened_success"))
      .catch((err) => console.log("store_audio_error: " + err));
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
      console.log("storing_audio_listened....", action.payload);
      state.currentPlaying = action.payload["currentPlaying"];
      state.soundStatus = action.payload["soundStatus"];
      // storeAudioListened(action.payload["currentPlayingId"]);
    },
    triggerAudioPlayer: (state, action) => {
      state.currentAction = action.payload["currentAction"];
      state.actionValue = action.payload["actionValue"];
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
};
