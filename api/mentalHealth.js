import { CallAPI } from "../core/api/baseAxios";

export const getMentalHealthList = () => {
  const url = "/mentalHealth?status=ACTIVE";
  return CallAPI.get(url);
};
