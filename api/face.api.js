import FormData from "form-data";
import { CallAPIMulti } from "../core/api/baseAxios";

export const faceRegApi = (fileUri) => {
  const url = "/face";
  const formData = new FormData();
  formData.append("file", {
    uri: fileUri,
    name: "image.jpeg",
    type: "image/jpeg",
  });
  return CallAPIMulti.post(url, formData);
};
