import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { userReducer } from "../../redux/auth/auth.slice";
import { playlistReducer } from "../../redux/auth/playlist.slice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    playlist: playlistReducer,
  },
});
export const useAppDispatch = () => useDispatch;
export const useAppSelecto = useSelector;
