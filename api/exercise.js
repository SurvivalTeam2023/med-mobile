import { CallAPI } from "../core/api/baseAxios";

export const getExercisesListByMentalIdAPI = (mentalStringList) => {
  const url = "/exercise/mental/id?ids=" + `${mentalStringList}`;
  return CallAPI.get(url);
};
export const getExercisesListBySingleMentalIdAPI = (mentalStringList) => {
  const url = "/exercise?mentalHealthId=" + `${mentalStringList}`;
  return CallAPI.get(url);
};
