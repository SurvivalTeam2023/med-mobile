import { useMutation } from "react-query";
import { faceRegApi } from "../api/face.api";

export const useFaceRegApi = (fileUri) =>
  useMutation({
    mutationFn: (fileUri) => faceRegApi(fileUri),
  });
