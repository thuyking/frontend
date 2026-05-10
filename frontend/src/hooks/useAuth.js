import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfileApi, loginApi, registerApi } from "../api/authApi";

export function useLogin() {
  return useMutation({
    mutationFn: loginApi,
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: registerApi,
  });
}

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfileApi,
  });
}
