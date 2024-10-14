import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { postData } from "./axios";
interface UseGenericMutationParams<TData, TError, TVariables, TContext>
  extends Partial<UseMutationOptions<TData, TError, TVariables, TContext>> {
  endpoint: string;
}

const useGenericMutation = <TData, TError, TVariables, TContext = unknown>({
  endpoint,
  ...options
}: UseGenericMutationParams<TData, TError, TVariables, TContext>) => {
  const mutationFn = async (variables: TVariables): Promise<TData> => {
    return postData(endpoint, variables);
  };

  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn,
    ...options,
  });
};

export default useGenericMutation;
