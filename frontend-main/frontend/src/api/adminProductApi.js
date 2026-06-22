import { apiClient } from "../lib/apiClient";

export async function getAdminProducts() {
  const { data } = await apiClient.get("/admin/products");
  return data;
}

export async function deleteAdminProduct(productId) {
  const { data } = await apiClient.delete(`/products/${productId}`);
  return data;
}

export async function updateAdminProduct({ productId, payload }) {
  const { data } = await apiClient.put(`/admin/products/${productId}`, payload);
  return data;
}
