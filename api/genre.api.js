import queryString from "query-string";
import { CallAPI } from "../core/api/baseAxios";

export const getGenreListApi = (payload) => {
  const requestUrl = queryString.stringifyUrl({
    url: "/genres?status=ACTIVE",
    query: payload,
  });
  return CallAPI.get(requestUrl);
};
