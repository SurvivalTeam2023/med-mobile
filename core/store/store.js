import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { userReducer } from "../../redux/auth/auth.slice";
import { favoriteReducer } from "../../redux/auth/favorite.slice";
import { genreArtistReducer } from "../../redux/auth/genreArtist.slice";
import { playlistReducer } from "../../redux/auth/playlist.slice";
import { questionReducer } from "../../redux/auth/question.slice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    playlist: playlistReducer,
    question: questionReducer,
    favorite: favoriteReducer,
    genreArtist: genreArtistReducer,
  },
});
export const useAppDispatch = () => useDispatch;
export const useAppSelecto = useSelector;
