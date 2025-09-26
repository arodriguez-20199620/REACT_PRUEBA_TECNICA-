import { api } from "../api/apiClient";

export const createProductService = async (body) => {
  const { data } = await api.post("/products", body);
  return data;
};
