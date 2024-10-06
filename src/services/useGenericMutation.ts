import {
  useMutation,
  UseMutationOptions,
  MutationFunction,
} from "@tanstack/react-query";
import { postData } from "./axios";
import { queryClient } from "@/pages/_app";

const getToken = () => {
  return localStorage.getItem("authToken");
};

interface UseGenericMutationParams<TData, TError, TVariables, TContext>
  extends Partial<UseMutationOptions<TData, TError, TVariables, TContext>> {
  endpoint: string;
  mutationFn?: MutationFunction<TData, TVariables>;
}

const useGenericMutation = <TData, TError, TVariables, TContext = unknown>({
  endpoint,

  mutationFn = (variables: TVariables) =>
    postData(endpoint, variables, getToken()),
  ...options
}: UseGenericMutationParams<TData, TError, TVariables, TContext>) => {
  return useMutation<TData, TError, TVariables, TContext>(
    {
      mutationFn,
      ...options,
    },
    queryClient
  );
};

export default useGenericMutation;
