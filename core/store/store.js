import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { userReducer } from "../../redux/auth/auth.slice";
import { favoriteReducer } from "../../redux/auth/favorite.slice";
import { playlistReducer } from "../../redux/auth/playlist.slice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    playlist: playlistReducer,
    favorite: favoriteReducer,
  },
});
export const useAppDispatch = () => useDispatch;
export const useAppSelecto = useSelector;
