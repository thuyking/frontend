import { apiClient } from "../lib/apiClient";

export async function createCheckoutApi(payload) {
  const { data } = await apiClient.post("/checkout", payload);
  return data;
}

export async function payCheckoutApi({ checkoutId, payload }) {
  const { data } = await apiClient.put(`/checkout/${checkoutId}/pay`, payload);
  return data;
}

export async function finalizeCheckoutApi(checkoutId) {
  const { data } = await apiClient.post(`/checkout/${checkoutId}/finalize`);
  return data;
}
