import axios from "axios";
import {
  HEADER_AUTHORIZATION,
  TOKEN_KEY_STORAGE,
  config,
} from "../../constants/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../store/store";

export const CallAPI = axios.create({
  baseURL: config.SERVER_URL,
  withCredentials: false,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
export const CallAPIMulti = axios.create({
  baseURL: config.SERVER_URL,
  withCredentials: false,
  headers: {
    "Content-type":
      "multipart/form-data; boundary=<calculated when request is sent>",
    "Access-Control-Allow-Origin": "*",
  },
});

CallAPI.interceptors.request.use((req) => {
  const token = store?.getState().user.token;

  // AsyncStorage.getItem(TOKEN_KEY_STORAGE);
  if (token && req.headers);
  req.headers[HEADER_AUTHORIZATION] = `Bearer ${token}`;
  //trace log
  console.log("Starting Request", JSON.stringify(req, null, 2));
  return req;
});

CallAPI.interceptors.response.use(async (res) => {
  // const { status } = res;

  //trace log
  console.log("Response:", JSON.stringify(res, null, 2));
  return res;
});
CallAPIMulti.interceptors.request.use((req) => {
  const token = store?.getState().user.token;

  // AsyncStorage.getItem(TOKEN_KEY_STORAGE);
  if (token && req.headers);
  req.headers[HEADER_AUTHORIZATION] = `Bearer ${token}`;
  //trace log
  console.log("Starting Request from APIMulti", JSON.stringify(req, null, 2));
  return req;
});

CallAPIMulti.interceptors.response.use(async (res) => {
  // const { status } = res;

  //trace log
  console.log("Response from APIMulti:", JSON.stringify(res, null, 2));
  return res;
});
