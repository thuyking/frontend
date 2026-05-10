import { apiClient } from "../lib/apiClient";

export async function loginApi(payload) {
  const { data } = await apiClient.post("/users/login", payload);
  return data;
}

export async function registerApi(payload) {
  const { data } = await apiClient.post("/users/register", payload);
  return data;
}

export async function getProfileApi() {
  const { data } = await apiClient.get("/users/profile");
  return data;
}
