import { useQuery } from "react-query";
import { getRecenlyAPI } from "../api/recently.api";

export const useGetRecently = (payload) =>
  useQuery({
    queryKey: ["getRecently"],
    queryFn: async () => {
      const data = await getRecenlyAPI();
      return data;
    },
  });
