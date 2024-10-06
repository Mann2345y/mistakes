import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchData } from "./axios";
import { queryClient } from "@/pages/_app";

const useGenericQuery = <T>(
  keys: string[],
  endpoint: string,
  options?: UseQueryOptions<T>
) => {
  return useQuery<T>(
    {
      queryKey: keys,
      queryFn: async () => {
        const { data } = await fetchData(endpoint);
        return data;
      },
      ...options,
    },
    queryClient
  );
};

export default useGenericQuery;
