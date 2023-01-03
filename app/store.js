import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./userSlice";
import logger from "redux-logger";

const rootReducer = {
  auth: authReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
