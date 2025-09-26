import { createProductService } from "../services/product.service";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: createProductService,
    onSuccess: () => {
      toast.success("Product created successfully");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.errors?.[0]?.message ||
        "Failed to create category";
      console.log("🚀 ~ useCreateProduct ~ errorMessage:", errorMessage);

      toast.error(errorMessage);
    },
  });
};
