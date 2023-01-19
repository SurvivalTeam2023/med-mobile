import { useQuery } from "react-query";
import { getUserByNameApi } from "../api/user.api";

export const useGetUserByNameApi = (payload) => {
  const { data: userData, ...rest } = useQuery({
    queryKey: ["getUsername", payload],
    queryFn: async (payload) => {
      const data = await getUserByNameApi(payload);
      return data;
    },
  });
  return { userData, ...rest };
};
