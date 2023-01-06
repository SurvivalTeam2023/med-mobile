import axios from "axios";
import { config } from "../../constants/config";

export const CallAPI = axios.create({
  baseURL: config.SERVER_URL,
  withCredentials: false,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

CallAPI.interceptors.request.use((req) => {
  const token = store?.getState().user.token?.access_token;
  if (token && req.headers)
    req.headers[KEYS.HEADER_AUTHORIZATION] = `Bearer ${token}`;

  return req;
});

CallAPI.interceptors.response.use(async (res) => {
  const { status } = res;
  //   if (status === 401) {
  // const response = await getRefreshTokenApi(
  //   store.getState().user.token?.refresh_token || ""
  // );
  // if (response?.status === 401) {
  //   //TODO: logout user
  //   return res;
  // }

  // if (response) {
  //   saveAuthKeyIntoLocalStorage(response.data);
  //   store.dispatch(userActions.setToken(response.data));
  // }
  //   }
  return res;
});
