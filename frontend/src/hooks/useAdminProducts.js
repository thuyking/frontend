import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteAdminProduct,
  getAdminProducts,
  updateAdminProduct,
} from "../api/adminProductApi";

const adminProductQueryKeys = {
  all: ["admin-products"],
};

export function useAdminProducts() {
  return useQuery({
    queryKey: adminProductQueryKeys.all,
    queryFn: getAdminProducts,
  });
}

export function useDeleteAdminProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAdminProduct,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: adminProductQueryKeys.all }),
  });
}

export function useUpdateAdminProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAdminProduct,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: adminProductQueryKeys.all }),
  });
}
