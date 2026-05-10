import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToCartApi,
  getCartApi,
  removeCartItemApi,
  updateCartItemApi,
} from "../api/cartApi";

const cartQueryKey = ["cart"];

export function useCart() {
  return useQuery({
    queryKey: cartQueryKey,
    queryFn: getCartApi,
    retry: false,
  });
}

function useCartMutation(mutationFn) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: cartQueryKey }),
  });
}

export function useAddToCart() {
  return useCartMutation(addToCartApi);
}

export function useUpdateCartItem() {
  return useCartMutation(updateCartItemApi);
}

export function useRemoveCartItem() {
  return useCartMutation(removeCartItemApi);
}
