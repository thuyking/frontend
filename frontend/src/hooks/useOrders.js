import { useQuery } from "@tanstack/react-query";
import { getMyOrders, getOrderById } from "../api/orderApi";

export function useMyOrders() {
  return useQuery({
    queryKey: ["my-orders"],
    queryFn: getMyOrders,
  });
}

export function useOrderDetail(orderId) {
  return useQuery({
    queryKey: ["order-detail", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: Boolean(orderId),
  });
}
