import { useCallback, useEffect, useState } from "react";

const API_BASE = "https://fakestoreapi.com";

export function useProducts() {
  const [state, setState] = useState({
    products: [],
    status: "loading",
    error: "",
  });

  const fetchProducts = useCallback(async () => {
    setState((current) => ({ ...current, status: "loading", error: "" }));

    try {
      const response = await fetch(`${API_BASE}/products`);

      if (!response.ok) {
        throw new Error(`Fake Store API returned ${response.status}`);
      }

      const products = await response.json();
      setState({ products, status: "success", error: "" });
    } catch (error) {
      setState({
        products: [],
        status: "error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { ...state, refetch: fetchProducts };
}
