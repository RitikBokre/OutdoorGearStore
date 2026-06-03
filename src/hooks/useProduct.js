import { useCallback, useEffect, useState } from "react";

const API_BASE = "https://fakestoreapi.com";

export function useProduct(productId) {
  const [state, setState] = useState({
    product: null,
    status: "loading",
    error: "",
  });

  const fetchProduct = useCallback(async () => {
    setState((current) => ({ ...current, status: "loading", error: "" }));

    try {
      const response = await fetch(`${API_BASE}/products/${productId}`);

      if (!response.ok) {
        throw new Error(`Fake Store API returned ${response.status}`);
      }

      const product = await response.json();
      setState({ product, status: "success", error: "" });
    } catch (error) {
      setState({
        product: null,
        status: "error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return { ...state, refetch: fetchProduct };
}
