import React, { createContext, useContext, ReactNode } from 'react';
import { ProductPayload } from '../types';
import useProduct from '../hooks/useProduct';

interface ProductsContextType {
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

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

interface ProductsProviderProps {
  children: ReactNode;
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
  const ctx = useProduct();

  return (
    <ProductsContext.Provider value={ctx}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProductsContext must be used within a ProductsProvider');
  }
  return context;
};
