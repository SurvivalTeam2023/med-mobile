import { useQuery, useMutation } from "react-query";
import {
  getUserDataByUsername,
  getUserProfileByUserId,
  updateUserAccountDetails,
  updateUserAvatar,
} from "../api/user.api";
import { store } from "../core/store/store";

export const useGetUserDataByUsername = (username) => {
  if (!username) return;
  const { ...rest } = useQuery({
    queryKey: ["getUsername", username],
    queryFn: async () => {
      return await getUserDataByUsername(username);
    },
    enabled: !!username,
  });
  return { ...rest };
};

export const useGetUserProfile = (userId) => {
  if (!userId) return;
  const { ...rest } = useQuery({
    queryKey: ["getUserProfile", userId],
    queryFn: async () => {
      return await getUserProfileByUserId(userId);
    },
    enabled: !!userId,
  });
  return { ...rest };
};

export const useUpdateUserAvatar = (payload) =>
  useMutation({
    mutationFn: (payload) => updateUserAvatar(payload),
  });

export const useUpdateUserAccountDetails = (payload) =>
  useMutation({
    mutationFn: (payload) => updateUserAccountDetails(payload),
  });
