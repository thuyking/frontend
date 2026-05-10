import axios from "axios";

const BASE_URL = "http://localhost:8080";
const axiosInstance = axios.create({ baseURL: BASE_URL });
export type Todo = {
  checked: boolean;
  title: string;
  description: string;
  id?: number;
};
export type Project = {
  id?: number;
  name: string;
};
export async function getTodoIds() {
  return (await axiosInstance.get<Todo[]>("todos")).data.map((todo) => {
    return todo.id;
  });
}

export async function getTodo(id: number) {
  return (await axiosInstance.get<Todo>(`todos/${id}`)).data;
}

export async function createToDo(data: Todo) {
  return await axiosInstance.post<Todo>("todos", data);
}

export async function deleteTodo(id: number) {
  return await axiosInstance.delete(`todos/${id}`);
}

export async function getProject(page: number = 1) {
  return (await axiosInstance.get<Project[]>(`projects?_page=${page}&_limit=3`))
    .data;
}

export async function createProject(data: Project) {
  return await axiosInstance.post("projects", data);
}
