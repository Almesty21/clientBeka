/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row, Spin, Tag, Button, Tooltip, Badge } from 'antd';
import { FiDownload, FiEye, FiLink, FiClock } from 'react-icons/fi';
import useProduct from '../../hooks/useProduct';
import { Link } from 'react-router-dom';
import { ProductPayload } from '../../types';
import { useState, useMemo } from 'react';

const Home: React.FC = () => {
  const { data: products = [], loading, fetchData } = useProduct(); // fixed destructuring

  const [showAll, setShowAll] = useState(false);

  // Filter recent products (last 30 days)
  const recentProducts = useMemo(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return products.filter((product: ProductPayload) => {
      if (!product.createdAt) return false;
      const productDate = new Date(product.createdAt.toString());
      return productDate >= thirtyDaysAgo;
    });
  }, [products]);

  const displayProducts = useMemo(() => {
    const productsToShow = showAll ? products : recentProducts;

    if (!showAll && recentProducts.length === 0 && products.length > 0) {
      return products.slice(0, Math.min(4, products.length));
    }

    return productsToShow;
  }, [showAll, products, recentProducts]);

  const isNewProduct = (createdAt: string | Date | undefined): boolean => {
    if (!createdAt) return false;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const productDate = new Date(createdAt.toString());
    return productDate >= sevenDaysAgo;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/default-product.png';
    target.alt = 'Default product image';
  };

  const handleExternalLinkClick = (url: string | undefined) => {
    if (url && url !== '#') window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadClick = (url: string | undefined) => {
    if (url && url !== '#') window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" tip="Loading products..." />
      </div>
    );
  }

  if (!loading && products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 text-6xl mb-4">🤖</div>
        <p className="text-gray-500 text-lg mb-4">No AI products found</p>
        <Button type="primary" onClick={() => fetchData?.()}>
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      {/* ... rest of your JSX unchanged ... */}
      {displayProducts.map((product: ProductPayload) => (
        <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
          <Badge.Ribbon
            text="NEW"
            color="red"
            style={{
              display: isNewProduct(product.createdAt) ? 'block' : 'none',
              fontSize: '12px',
              height: '20px',
            }}
          >
            <Card
              hoverable
              cover={
                <div className="relative h-48 overflow-hidden">
                  <img
                    alt={product.title}
                    src={product.image || '/default-product.png'}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={handleImageError}
                    loading="lazy"
                  />

                  {product.createdAt && (
                    <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      {new Date(product.createdAt.toString()).toLocaleDateString('en-US')}
                    </div>
                  )}
                </div>
              }
              className="h-full flex flex-col shadow-sm hover:shadow-md transition-shadow relative"
              bodyStyle={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* ... rest unchanged ... */}
            </Card>
          </Badge.Ribbon>
        </Col>
      ))}
    </div>
  );
};

export default Home;
