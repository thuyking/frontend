import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAdminUser,
  deleteAdminUser,
  getAdminUsers,
  updateAdminUser,
} from "../api/adminUserApi";

const adminUserQueryKeys = {
  all: ["admin-users"],
};

export function useAdminUsers() {
  return useQuery({
    queryKey: adminUserQueryKeys.all,
    queryFn: getAdminUsers,
  });
}

export function useCreateAdminUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAdminUser,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: adminUserQueryKeys.all }),
  });
}

export function useUpdateAdminUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAdminUser,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: adminUserQueryKeys.all }),
  });
}

export function useDeleteAdminUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAdminUser,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: adminUserQueryKeys.all }),
  });
}
