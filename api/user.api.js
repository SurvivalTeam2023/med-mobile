import { CallAPI } from "../core/api/baseAxios";
import { parse, stringify } from "qs";

export const getUserByNameApi = (payload) => {
  const { username } = payload;
  const url = `/user/`;
  return CallAPI.get(url, {
    params: username,
    serialize: (params) => qs.stringify(params, { arrayFormat: "brackets" }),
  });
};
