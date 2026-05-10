import { apiClient } from "../lib/apiClient";
import { getGuestId, getUserId } from "../lib/session";

function withSession(payload = {}) {
  return {
    ...payload,
    guestId: getGuestId(),
    userId: getUserId(),
  };
}

export async function getCartApi() {
  const { data } = await apiClient.get("/cart", {
    params: withSession(),
  });
  return data;
}

export async function addToCartApi(payload) {
  const { data } = await apiClient.post("/cart", withSession(payload));
  return data;
}

export async function updateCartItemApi(payload) {
  const { data } = await apiClient.put("/cart", withSession(payload));
  return data;
}

export async function removeCartItemApi(payload) {
  const { data } = await apiClient.delete("/cart", {
    data: withSession(payload),
  });
  return data;
}
