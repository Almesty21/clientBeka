// src/hooks/useProduct.ts
import { useState, useEffect } from "react";
import { ProductPayload } from "../types";
import { GetProducts  } from "../services/products";

export interface UseProductReturn {
  data: ProductPayload[];
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;

  openActivate: boolean;
  openBan: boolean;
  handleOpenActivate: () => void;
  handleCloseActivate: () => void;
  handleOpenBan: () => void;
  handleCloseBan: () => void;
}

export default function useProduct(): UseProductReturn {
  const [data, setData] = useState<ProductPayload[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [openActivate, setOpenActivate] = useState(false);
  const [openBan, setOpenBan] = useState(false);

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

    openActivate,
    openBan,
    handleOpenActivate: () => setOpenActivate(true),
    handleCloseActivate: () => setOpenActivate(false),
    handleOpenBan: () => setOpenBan(true),
    handleCloseBan: () => setOpenBan(false),
  };
}
