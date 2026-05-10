import { apiClient } from "../lib/apiClient";

export async function getAdminOrders() {
  const { data } = await apiClient.get("/admin/orders");
  return data;
}

export async function updateAdminOrder({ orderId, payload }) {
  const { data } = await apiClient.put(`/admin/orders/${orderId}`, payload);
  return data;
}

export async function deleteAdminOrder(orderId) {
  const { data } = await apiClient.delete(`/admin/orders/${orderId}`);
  return data;
}
