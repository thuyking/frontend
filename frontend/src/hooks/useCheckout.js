import { useMutation } from "@tanstack/react-query";
import {
  createCheckoutApi,
  finalizeCheckoutApi,
  payCheckoutApi,
} from "../api/checkoutApi";

export function useCreateCheckout() {
  return useMutation({
    mutationFn: createCheckoutApi,
  });
}

export function usePayCheckout() {
  return useMutation({
    mutationFn: payCheckoutApi,
  });
}

export function useFinalizeCheckout() {
  return useMutation({
    mutationFn: finalizeCheckoutApi,
  });
}
