import { api } from "../api/apiClient";

export const createProductService = async (body) => {
  const { data } = await api.post("/products", body);
  return data;
};

export const getProductsService = async (params = {}) => {
  const { data } = await api.get("/products", { params });
  return data;
};

export const deleteProductService = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};
