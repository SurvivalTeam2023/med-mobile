import { CallAPI } from "../core/api/baseAxios";

export const chatGPTAPI = (prompt) => {
  const url = "/prompt";
  return CallAPI.post(url, {
    input: prompt,
  });
};
