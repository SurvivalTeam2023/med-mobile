import { CallAPI } from "../core/api/baseAxios";


export const getSubscriptionType = (payload) => {
    const url = "/subscriptionTypes";
    return CallAPI.get(url);
};