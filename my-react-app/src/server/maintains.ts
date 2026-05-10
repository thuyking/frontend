import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createProject,
  createToDo,
  deleteTodo,
  type Project,
  type Todo,
} from "./api";

export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Todo) => {
      return createToDo(data);
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
      }
    },
  });
}
export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => {
      return deleteTodo(id);
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      }
    },
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Project) => {
      return createProject(data);
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        queryClient.invalidateQueries({ queryKey: ["Projects"] });
      }
    },
  });
}
