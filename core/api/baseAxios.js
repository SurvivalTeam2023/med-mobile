import axios from "axios";
import { HEADER_AUTHORIZATION, config } from "../../constants/config";
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
  if (token && req.headers);
  req.headers[HEADER_AUTHORIZATION] = `Bearer ${token}`;
  console.log("request_url", `${req.baseURL}${req.url}`);
  return req;
});

CallAPI.interceptors.response.use(async (res) => {
  return res;
});
CallAPIMulti.interceptors.request.use((req) => {
  const token = store?.getState().user.token;
  if (token && req.headers);
  req.headers[HEADER_AUTHORIZATION] = `Bearer ${token}`;
  return req;
});

CallAPIMulti.interceptors.response.use(async (res) => {
  return res;
});
