import { apiClient } from "../lib/apiClient";

export async function uploadImageApi(file) {
  const formData = new FormData();
  formData.append("image", file);

  const { data } = await apiClient.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}
