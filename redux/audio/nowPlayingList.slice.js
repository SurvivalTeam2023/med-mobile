import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createHistoryApi } from "../../api/history.api";
const initialState = {
  playingList: [
    {
      id: 1,
      name: "Để tôi yêu em bằng giai điệu này",
      url: `
      https://mp3-s1-zmp3.zmdcdn.me/f287de658b25627b3b34/8327559501153248912?authen=exp=1687493239~acl=/f287de658b25627b3b34/*~hmac=8b79b179c453418dbd3c00c79fbef671&fs=MTY4NzMyMDQzOTkxNnx3ZWJWNnwwfDU4LjE4Ni4zNS4xOTY
      `,
      imgUrl:
        "https://public-med-bucket-v2.s3.ap-southeast-1.amazonaws.com/default_images/default_sound_cover.jpg",
      artist: "Min",
      isLoved: true,
    },
    {
      id: 2,
      name: "Đưa em về nhà",
      url: `
      https://mp3-s1-zmp3.zmdcdn.me/c69d176bcd2b24757d3a/6248877578785156536?authen=exp=1687493261~acl=/c69d176bcd2b24757d3a/*~hmac=6fb3b8a632ab277c49fdb6f85bc717e2&fs=MTY4NzMyMDQ2MTQ4OHx3ZWJWNnwwfDE0LjIzMC4xMjAdUngNTM
      `,
      imgUrl:
        "https://public-med-bucket-v2.s3.ap-southeast-1.amazonaws.com/default_images/default_sound_cover.jpg",
      artist: "Grey D, Chillies",
      isLoved: true,
    },
    {
      id: 3,
      name: "Rồi ta sẽ cùng nắm pháo hoa cùng nhau",
      url: `
      https://mp3-s1-zmp3.zmdcdn.me/771bee192258cb069249/8338433242614992920?authen=exp=1687493469~acl=/771bee192258cb069249/*~hmac=3b77262e3273f6d8cec29ca885ee3a36&fs=MTY4NzMyMDY2OTQ0Nnx3ZWJWNnwxMDYxNjY3NjAyfDEdUngNTIdUngMTg2Ljg0
      `,
      imgUrl:
        "https://public-med-bucket-v2.s3.ap-southeast-1.amazonaws.com/default_images/default_sound_cover.jpg",
      artist: "Junn D, O.lew",
      isLoved: true,
    },
  ],
  currentPlaying: {
    currentAudioIndex: 0,
    soundStatus: {},
  },
  audioAction: "",
  audioActionValue: "",
  currentAction: null,
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
