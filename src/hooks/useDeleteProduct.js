import { deleteProductService } from "../services/product.service";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProductService,
    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.errors?.[0]?.message ||
        "Failed to delete product";
      console.log("🚀 ~ useDeleteProduct ~ errorMessage:", errorMessage);
      toast.error(errorMessage);
    },
  });
};
