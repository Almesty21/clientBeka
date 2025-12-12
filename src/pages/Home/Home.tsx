/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row, Spin, Tag, Button, Tooltip, Badge } from 'antd';
import { FiDownload, FiEye, FiLink, FiClock } from 'react-icons/fi';
import useProduct from '../../hooks/useProduct';
import { Link } from 'react-router-dom';
import { ProductPayload } from '../../types';
import { useState, useMemo } from 'react';

const Home: React.FC = () => {
  // SAFELY destructure useProduct() response
  const productState = useProduct();
  
  const loading = productState?.data?.loading ?? false;
  const products: ProductPayload[] = productState?.data?.data ?? [];
  const fetchData = productState?.fetchData;

  const [showAll, setShowAll] = useState(false);

  // Filter recent products (last 30 days)
  const recentProducts = useMemo(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return products.filter((product: ProductPayload) => {
      if (!product.createdAt) return false;
      const productDate = new Date(product.createdAt);
      return productDate >= thirtyDaysAgo;
    });
  }, [products]);

  // Products to display based on toggle
  const displayProducts = useMemo(() => {
    const productsToShow = showAll ? products : recentProducts;

    if (!showAll && recentProducts.length === 0 && products.length > 0) {
      return products.slice(0, Math.min(4, products.length));
    }

    return productsToShow;
  }, [showAll, products, recentProducts]);

  // Check if product is new
  const isNewProduct = (createdAt: string | undefined): boolean => {
    if (!createdAt) return false;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const productDate = new Date(createdAt);
    return productDate >= sevenDaysAgo;
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  // Handle broken images
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/default-product.png';
    target.alt = 'Default product image';
  };

  // External link
  const handleExternalLinkClick = (url: string | undefined) => {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Download link
  const handleDownloadClick = (url: string | undefined) => {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {showAll ? 'All AI Products' : 'Featured AI Products'}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {showAll
              ? `Browse all ${products.length} products`
              : `Discover our ${displayProducts.length} featured products`}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-gray-500 text-sm">
            {displayProducts.length} product{displayProducts.length !== 1 ? 's' : ''}
          </span>

          {recentProducts.length > 0 && (
            <Button
              type={showAll ? 'default' : 'primary'}
              onClick={() => setShowAll(prev => !prev)}
              icon={<FiClock />}
            >
              {showAll ? 'Show Featured' : 'Show All Products'}
            </Button>
          )}
        </div>
      </div>

      {!showAll && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-2 rounded-full">
              <FiClock className="text-white" size={16} />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900">
                {recentProducts.length > 0 ? 'New & Recent Products' : 'Featured Products'}
              </h3>
              <p className="text-blue-700 text-sm">
                {recentProducts.length > 0
                  ? `Showing ${recentProducts.length} products added in the last 30 days`
                  : `Showing ${displayProducts.length} featured products from our collection`}
              </p>
            </div>
          </div>
        </div>
      )}

      <Row gutter={[24, 24]}>
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
                        {new Date(product.createdAt).toLocaleDateString('en-US')}
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
                <div className="flex flex-col justify-between h-full">
                  <div className="flex-grow">
                    <h3
                      className="text-lg font-bold mb-2 line-clamp-2 text-gray-800"
                      title={product.title}
                    >
                      {product.title}
                    </h3>

                    <p
                      className="text-gray-600 text-sm mb-3 line-clamp-3"
                      title={product.description}
                    >
                      {product.description || 'No description available'}
                    </p>

                    {product.price && (
                      <p className="text-sm text-green-600 font-semibold">
                        {formatPrice(product.price)}
                      </p>
                    )}
                  </div>

                  <div className="mt-auto">
                    {product.category && (
                      <Tag color="blue" className="mb-3">
                        {product.category}
                      </Tag>
                    )}

                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex flex-col gap-3">
                        <Link
                          to={`/products/${product._id}`}
                          className="text-blue-500 hover:text-blue-700 font-medium text-sm flex items-center justify-center gap-2 py-2"
                        >
                          <FiEye size={14} />
                          View Details
                        </Link>

                        <div className="flex justify-center gap-3">
                          <Tooltip title={product.link ? 'Visit Website' : 'Link not available'}>
                            <Button
                              type="link"
                              icon={<FiLink size={12} />}
                              onClick={() => handleExternalLinkClick(product.link)}
                              disabled={!product.link || product.link === '#'}
                              size="small"
                              className="text-gray-500 text-xs"
                            >
                              Visit Site
                            </Button>
                          </Tooltip>

                          <Tooltip
                            title={
                              product.downloadLink ? 'Download' : 'Download not available'
                            }
                          >
                            <Button
                              type="link"
                              icon={<FiDownload size={12} />}
                              onClick={() => handleDownloadClick(product.downloadLink)}
                              disabled={!product.downloadLink || product.downloadLink === '#'}
                              size="small"
                              className="text-gray-500 text-xs"
                            >
                              Download
                            </Button>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>

      {products.length > displayProducts.length && (
        <div className="text-center mt-8">
          <Button
            type="primary"
            onClick={() => setShowAll(prev => !prev)}
            icon={<FiClock />}
            size="large"
          >
            {showAll
              ? `Show Featured Products (${recentProducts.length > 0 ? recentProducts.length : 4
                } products)`
              : `Show All Products (${products.length} total)`}
          </Button>
        </div>
      )}

      {displayProducts.length === 0 && products.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No products match the current filter.</p>
          <Button type="link" onClick={() => setShowAll(true)}>
            Show all products
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;
