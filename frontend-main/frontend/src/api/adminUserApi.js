import { apiClient } from "../lib/apiClient";

export async function getAdminUsers() {
  const { data } = await apiClient.get("/admin/users");
  return data;
}

export async function createAdminUser(payload) {
  const { data } = await apiClient.post("/admin/users", payload);
  return data;
}

export async function updateAdminUser({ userId, payload }) {
  const { data } = await apiClient.put(`/admin/users/${userId}`, payload);
  return data;
}

export async function deleteAdminUser(userId) {
  const { data } = await apiClient.delete(`/admin/users/${userId}`);
  return data;
}
