// src/hooks/useProduct.ts
import { useState, useEffect } from "react";
import { ProductPayload } from "../types";
import { getProducts } from "../services/productService";

export default function useProduct() {
  const [data, setData] = useState<ProductPayload[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [openActivate, setOpenActivate] = useState(false);
  const [openBan, setOpenBan] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setData(res);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch");
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
