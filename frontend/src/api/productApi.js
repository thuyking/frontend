import { apiClient } from "../lib/apiClient";

export async function getProducts(params = {}) {
  const { data } = await apiClient.get("/products", { params });
  return data;
}

export async function getBestSeller() {
  const { data } = await apiClient.get("/products/best-seller");
  return data;
}

export async function getNewArrivals() {
  const { data } = await apiClient.get("/products/new-arrivals");
  return data;
}

export async function getProductById(productId) {
  const { data } = await apiClient.get(`/products/${productId}`);
  return data;
}

export async function getSimilarProducts(productId) {
  const { data } = await apiClient.get(`/products/similar/${productId}`);
  return data;
}
