import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const toggleCart = async (productId: string) => {
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) {
    throw new Error("Failed to update cart");
  }

  return res.json();
};

export const useToggleCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleCart,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      if (data.isInCart) {
        toast.success("Product added to cart.");
      } else {
        toast.success("Product removed from cart.");
      }
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    },
  });
};
