import {
  useMutation,
  UseMutationOptions,
  MutationFunction,
} from "@tanstack/react-query";
import { postData } from "./axios";
import { queryClient } from "@/pages/_app";

interface UseGenericMutationParams<TData, TError, TVariables, TContext>
  extends Partial<UseMutationOptions<TData, TError, TVariables, TContext>> {
  endpoint: string;
  mutationFn?: MutationFunction<TData, TVariables>;
}

const useGenericMutation = <TData, TError, TVariables, TContext = unknown>({
  endpoint,
  mutationFn = async (variables: TVariables) => {
    try {
      return await postData(endpoint, variables);
    } catch (error) {
      throw error;
    }
  },
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
