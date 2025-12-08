import { useEffect, useState } from "react";
import { useNotificationContext } from "../contexts/NotificationContext";
import { useParams } from "react-router-dom";
import { ProductPayload } from "../types";
import { GetProducts } from "../services/products";

interface ProductResponse {
  loading: boolean;
  data?: ProductPayload[];
}

export default function useProduct() {
  const id: string = useParams().id!;
  const { showError } = useNotificationContext();
  const [openBan, setOpenBan] = useState<boolean>(false);
  const [openActivate, setOpenActivate] = useState<boolean>(false);
  const [data, setData] = useState<ProductResponse>({
    loading: true,
  });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchData = async () => {
    setData({ loading: true });
    try {
      const response = await GetProducts();
      if (response.success) {
        setData({ 
          loading: false, 
          data: response.data 
        });
      } else {
        showError(response.message || 'Failed to fetch products');
        setData({ loading: false });
      }
    } catch (error: any) {
      showError(error?.message || 'Error fetching products');
      setData({ loading: false });
    }
  };

  const handleOpenBan = () => setOpenBan(true);
  const handleCloseBan = () => setOpenBan(false);
  const handleOpenActivate = () => setOpenActivate(true);
  const handleCloseActivate = () => setOpenActivate(false);

  return {
    data,
    handleCloseActivate,
    handleCloseBan,
    handleOpenActivate,
    handleOpenBan,
    openActivate,
    openBan,
    fetchData,
  };
}