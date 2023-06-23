import axios from "axios";
import { HEADER_AUTHORIZATION, config } from "../../constants/config";
import { store } from "../store/store";

const axiosInstance = axios.create({
  baseURL: config.SERVER_URL,
  withCredentials: false,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

const axiosMultiInstance = axios.create({
  baseURL: config.SERVER_URL,
  withCredentials: false,
  headers: {
    "Content-type":
      "multipart/form-data; boundary=<calculated when request is sent>",
    "Access-Control-Allow-Origin": "*",
  },
});

const requestInterceptor = (config) => {
  const token = store?.getState().user.token;
  if (token) {
    config.headers[HEADER_AUTHORIZATION] = `Bearer ${token}`;
  }
  console.debug("request_url:", `${config.baseURL}${config.url}`);
  return config;
};

const responseInterceptor = (response) => {
  return response.data;
};

const errorInterceptor = (error) => {
  console.error("Request failed:", error.toJSON());
  throw error;
};

axiosInstance.interceptors.request.use(requestInterceptor);
axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

axiosMultiInstance.interceptors.request.use(requestInterceptor);
axiosMultiInstance.interceptors.response.use(
  responseInterceptor,
  errorInterceptor
);

export const CallAPI = axiosInstance;
export const CallAPIMulti = axiosMultiInstance;
