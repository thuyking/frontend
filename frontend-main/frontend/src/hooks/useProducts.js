import { useQuery } from "@tanstack/react-query";
import {
  getBestSeller,
  getNewArrivals,
  getProductById,
  getProducts,
  getSimilarProducts,
} from "../api/productApi";

export function useProducts(params) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
  });
}

export function useBestSeller() {
  return useQuery({
    queryKey: ["best-seller"],
    queryFn: getBestSeller,
  });
}

export function useNewArrivals() {
  return useQuery({
    queryKey: ["new-arrivals"],
    queryFn: getNewArrivals,
  });
}

export function useProductDetail(productId) {
  return useQuery({
    queryKey: ["product-detail", productId],
    queryFn: () => getProductById(productId),
    enabled: Boolean(productId),
  });
}

export function useSimilarProducts(productId) {
  return useQuery({
    queryKey: ["similar-products", productId],
    queryFn: () => getSimilarProducts(productId),
    enabled: Boolean(productId),
  });
}
