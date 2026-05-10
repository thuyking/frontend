import { useForm, type SubmitHandler } from "react-hook-form";
import { useCreateTodo, useDeleteTodo } from "../server/maintains";
import { useTodo, useTodosIds } from "../server/queries";
import type { Todo } from "../server/api";

export function Todos() {
  const todosIdsQuery = useTodosIds();
  const todoQuery = useTodo(todosIdsQuery.data ?? []);
  const createTodoMutation = useCreateTodo();
  const deleteTodoMutation = useDeleteTodo();
  const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    return createTodoMutation.mutate(data);
  };
  function handleDeleteTodo(id: number) {
    return deleteTodoMutation.mutate(id);
  }
  const { register, handleSubmit } = useForm<Todo>();
  return (
    <>
      <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
        <h4>New Todo:</h4>
        <input placeholder="Title" {...register("title")} />
        <input placeholder="Description" {...register("description")} />
        <input type="submit" />
      </form>
      {todoQuery.map((query) => {
        if (query.isPending) return <p>Loading...</p>;
        if (query.isError) return <p>Error</p>;
        if (!query.data) return null;

        return (
          <div key={query.data?.id}>
            <p>Id: {query.data?.id}</p>
            <p>Title: {query.data?.title}</p>
            <p>Description: {query.data?.description}</p>
            <button
              onClick={() => {
                handleDeleteTodo(query.data!.id!);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
}
