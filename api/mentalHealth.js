import { CallAPI } from "../core/api/baseAxios";

export const getMentalHealthList = () => {
  const url = "/mentalHealth?status=ACTIVE";
  return CallAPI.get(url);
};
export const getSelectedMentalHealthList = () => {
  const url = "/mentalHealthDegreeLog";
  return CallAPI.get(url);
};
export const selectUserMentalHealth = (payload) => {
  const url = "/mentalHealth/user";
  const { mentalHealthId } = payload;
  return CallAPI.post(url, { mentalHealthId });
};
