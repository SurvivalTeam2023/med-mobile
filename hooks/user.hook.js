import { useQuery } from "react-query";
import { getUserByNameApi } from "../api/user.api";
import { getUserProfile } from "../api/userProfile.api";

export const useGetUserByNameApi = (payload) => {
  const { data: userData, ...rest } = useQuery({
    queryKey: ["getUsername", payload],
    queryFn: async (payload) => {
      const data = await getUserByNameApi(payload);
      return data;
    },
    enabled: false,
  });
  return { userData, ...rest };
};

export const useGetUserProfile = (payload) =>
  useQuery({
    queryKey: ["getUserProfile"],
    queryFn: async () => {
      const data = await getUserProfile();
      return data;
    },
  });
