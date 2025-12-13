/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row, Spin, Tag, Button, Tooltip, Badge } from 'antd';
import { FiDownload, FiEye, FiLink, FiClock } from 'react-icons/fi';
import useProduct from '../../hooks/useProduct';
import { Link } from 'react-router-dom';
import { ProductPayload } from '../../types';
import { useState, useMemo } from 'react';

const Products: React.FC = () => {
  // ✅ CORRECT DESTRUCTURING
  const {
    data: products = [],
    loading,
    fetchData,
  } = useProduct();

  const [showAll, setShowAll] = useState(false);

  /* -------------------- FILTER RECENT PRODUCTS -------------------- */
  const recentProducts = useMemo(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return products.filter((product) => {
      if (!product.createdAt) return false;
      return new Date(product.createdAt) >= thirtyDaysAgo;
    });
  }, [products]);

  /* -------------------- DISPLAY LOGIC -------------------- */
  const displayProducts = useMemo(() => {
    if (showAll) return products;

    if (recentProducts.length === 0 && products.length > 0) {
      return products.slice(0, Math.min(4, products.length));
    }

    return recentProducts;
  }, [showAll, products, recentProducts]);

  /* -------------------- HELPERS -------------------- */
  const isNewProduct = (createdAt?: string) => {
    if (!createdAt) return false;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return new Date(createdAt) >= sevenDaysAgo;
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.src = '/default-product.png';
    target.alt = 'Default product image';
  };

  const openExternal = (url?: string) => {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  /* -------------------- LOADING STATE -------------------- */
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" tip="Loading products..." />
      </div>
    );
  }

  /* -------------------- EMPTY STATE -------------------- */
  if (!loading && products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 text-6xl mb-4">🤖</div>
        <p className="text-gray-500 text-lg mb-4">No AI products found</p>
        <Button type="primary" onClick={fetchData}>
          Refresh
        </Button>
      </div>
    );
  }

  /* -------------------- MAIN UI -------------------- */
  return (
    <div className="p-4 md:p-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {showAll ? 'All AI Products' : 'Featured AI Products'}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {showAll
              ? `Browse all ${products.length} products`
              : `Discover ${displayProducts.length} featured products`}
          </p>
        </div>

        {products.length > 4 && (
          <Button
            type={showAll ? 'default' : 'primary'}
            icon={<FiClock />}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Featured' : 'Show All'}
          </Button>
        )}
      </div>

      {/* PRODUCTS GRID */}
      <Row gutter={[24, 24]}>
        {displayProducts.map((product: ProductPayload) => (
          <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
            <Badge.Ribbon
              text="NEW"
              color="red"
              style={{
                display: isNewProduct(product.createdAt) ? 'block' : 'none',
              }}
            >
              <Card
                hoverable
                className="h-full flex flex-col"
                cover={
                  <img
                    src={product.image || '/default-product.png'}
                    alt={product.title}
                    className="h-48 w-full object-cover"
                    onError={handleImageError}
                  />
                }
              >
                <h3 className="font-bold text-lg line-clamp-2">
                  {product.title}
                </h3>

                <p className="text-gray-600 text-sm line-clamp-3 mt-2">
                  {product.description || 'No description available'}
                </p>

                {product.price && (
                  <p className="text-green-600 font-semibold mt-2">
                    {formatPrice(product.price)}
                  </p>
                )}

                {product.category && (
                  <Tag color="blue" className="mt-3">
                    {product.category}
                  </Tag>
                )}

                <div className="mt-4 space-y-2">
                  <Link
                    to={`/products/${product._id}`}
                    className="flex justify-center items-center gap-2 text-blue-600"
                  >
                    <FiEye /> View Details
                  </Link>

                  <div className="flex justify-center gap-3">
                    <Tooltip title="Visit Website">
                      <Button
                        type="link"
                        icon={<FiLink />}
                        onClick={() => openExternal(product.link)}
                        disabled={!product.link}
                      />
                    </Tooltip>

                    <Tooltip title="Download">
                      <Button
                        type="link"
                        icon={<FiDownload />}
                        onClick={() => openExternal(product.downloadLink)}
                        disabled={!product.downloadLink}
                      />
                    </Tooltip>
                  </div>
                </div>
              </Card>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Products;
