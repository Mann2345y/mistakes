import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchData } from "./axios";
import { queryClient } from "@/pages/_app";

const buildUrlWithParams = (
  endpoint: string,
  pathParams: Record<string, any> = {},
  queryParams?: Record<string, any>
) => {
  let url = endpoint;
  Object.keys(pathParams).forEach((key) => {
    url = url.replace(`:${key}`, pathParams[key]);
  });

  if (queryParams) {
    const queryString = new URLSearchParams(queryParams).toString();
    url += `?${queryString}`;
  }

  return url;
};

const useGenericQuery = <T>(
  keys: (string | number)[],
  endpoint: string,
  options?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn"> & {
    pathParams?: Record<string, any>;
    queryParams?: Record<string, any>;
  }
) => {
  return useQuery<T>(
    {
      queryKey: keys,
      queryFn: async () => {
        const finalEndpoint = buildUrlWithParams(
          endpoint,
          options?.pathParams,
          options?.queryParams
        );
        const response = await fetchData(finalEndpoint);
        return response?.data ?? {};
      },
      ...options,
    },
    queryClient
  );
};

export default useGenericQuery;
