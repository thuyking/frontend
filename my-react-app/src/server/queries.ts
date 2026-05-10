import { keepPreviousData, useQueries, useQuery } from "@tanstack/react-query";
import { getProject, getTodo, getTodoIds } from "./api";

export function useTodosIds() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodoIds,
    enabled: true,
  });
}

export function useTodo(ids: (number | undefined)[]) {
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ["todos", id],
        queryFn: () => getTodo(id!),
        enabled: true,
      };
    }),
  });
}

export function useGetProject(page: number) {
  return useQuery({
    queryKey: ["Projects", page],
    queryFn: () => getProject(page),
    placeholderData: keepPreviousData,
  });
}
