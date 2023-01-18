import axios from "axios";
import { TOKEN_KEY_STORAGE, config } from "../../constants/config";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CallAPI = axios.create({
  baseURL: config.SERVER_URL,
  withCredentials: false,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

CallAPI.interceptors.request.use((req) => {
  const token =
    useSelector((state) => state?.token) ||
    AsyncStorage.getItem(TOKEN_KEY_STORAGE);
  if (token && req.headers);
  req.headers[KEYS.HEADER_AUTHORIZATION] = `Bearer ${token}`;
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
