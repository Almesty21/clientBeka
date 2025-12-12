import { useState, useEffect } from "react";
import { ProductPayload } from "../types";
import { getProducts } from "../services/products";

interface UseProductReturn {
  data: ProductPayload[];
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

export default function useProduct(): UseProductReturn {
  const [data, setData] = useState<ProductPayload[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const products = await getProducts();
      setData(products);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch products");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    fetchData,
  };
}
