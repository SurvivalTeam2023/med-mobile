import { CallAPI } from "../core/api/baseAxios";

export const getSubscriptionType = (payload) => {
  const url = "/subscriptionTypes";
  return CallAPI.get(url);
};

export const createSubscriptionApi = (payload) => {
  const url = "/subscriptions";
  const { userId } = payload;
  return CallAPI.post(url, {
    userId,
    subcriptionTypeId,
  });
};
