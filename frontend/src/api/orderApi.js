import { apiClient } from "../lib/apiClient";

export async function getMyOrders() {
  const { data } = await apiClient.get("/order/my-order");
  return data;
}

export async function getOrderById(orderId) {
  const { data } = await apiClient.get(`/order/${orderId}`);
  return data;
}
