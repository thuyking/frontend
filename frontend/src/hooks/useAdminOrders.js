import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteAdminOrder, getAdminOrders, updateAdminOrder } from "../api/adminOrderApi";

export const adminOrderQueryKeys = {
  all: ["admin-orders"],
};

export function useAdminOrders() {
  return useQuery({
    queryKey: adminOrderQueryKeys.all,
    queryFn: getAdminOrders,
  });
}

export function useUpdateAdminOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAdminOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminOrderQueryKeys.all });
    },
  });
}

export function useDeleteAdminOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAdminOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminOrderQueryKeys.all });
    },
  });
}
