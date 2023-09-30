import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { userReducer } from "../../redux/auth/auth.slice";
import { favoriteReducer } from "../../redux/other/favorite.slice";
import { genreArtistReducer } from "../../redux/other/genreArtist.slice";
import { playlistReducer } from "../../redux/other/playlist.slice";
import { questionReducer } from "../../redux/other/question.slice";
import { genreReducer } from "../../redux/other/genre.slice";
import { imageReducer } from "../../redux/other/image.slice";
import { nowPlayingListReducer } from "../../redux/audio/nowPlayingList.slice";
import { audioArtistReducer } from "../../redux/audio/audioArtist";
import { mentalHealthReducer } from "../../redux/mentalHealth/mentalhealth.slice";
import { adsReducer } from "../../redux/ads/ads.slice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    playlist: playlistReducer,
    question: questionReducer,
    favorite: favoriteReducer,
    genreArtist: genreArtistReducer,
    audioArtist: audioArtistReducer,
    genre: genreReducer,
    image: imageReducer,
    nowPlayingList: nowPlayingListReducer,
    mentalHealth: mentalHealthReducer,
    ads: adsReducer,
  },
});
