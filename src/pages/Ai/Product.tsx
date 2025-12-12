// src/pages/Ai/Product.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row, Spin, Tag, Button, Tooltip } from 'antd';
import { FiExternalLink, FiDownload, FiEye } from 'react-icons/fi';
import useProduct from '../../hooks/useProduct';
import { Link } from 'react-router-dom';
import { ProductPayload } from '../../types';

const ProductPage: React.FC = () => {
  const { products, loading, fetchData } = useProduct(); // Destructure properly

  // Format price with localization
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

  // Handle external link clicks
  const handleExternalLink = (url: string | undefined, event?: React.MouseEvent) => {
    if (!url || url === '#') {
      event?.preventDefault();
      return false;
    }
    return true;
  };

  // Handle download link clicks
  const handleDownload = (url: string | undefined, event?: React.MouseEvent) => {
    if (!url || url === '#') {
      event?.preventDefault();
      return false;
    }
    return true;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" tip="Loading products..." />
      </div>
    );
  }

  if (!loading && (!products || products.length === 0)) {
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

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">AI Products</h2>
        <span className="text-gray-500 text-sm">
          {products.length} product{products.length !== 1 ? 's' : ''}
        </span>
      </div>

      <Row gutter={[24, 24]}>
        {products.map((product: ProductPayload) => (
          <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
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
                </div>
              }
              actions={[
                <Tooltip key="external-link" title={product.link ? 'Visit Website' : 'Link not available'}>
                  <Link
                    to={product.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center p-2 ${
                      product.link ? 'text-gray-500 hover:text-blue-600 cursor-pointer' : 'text-gray-300 cursor-not-allowed'
                    }`}
                    onClick={(e) => !handleExternalLink(product.link, e) && e.preventDefault()}
                  >
                    <span>
                      <FiExternalLink size={18} /> Visit Site
                    </span>
                  </Link>
                </Tooltip>,
                <Tooltip key="download" title={product.downloadLink ? 'Download' : 'Download not available'}>
                  <Link
                    to={product.downloadLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center p-2 ${
                      product.downloadLink ? 'text-gray-500 hover:text-green-600 cursor-pointer' : 'text-gray-300 cursor-not-allowed'
                    }`}
                    onClick={(e) => !handleDownload(product.downloadLink, e) && e.preventDefault()}
                  >
                    <span>
                      <FiDownload size={18} /> Download
                    </span>
                  </Link>
                </Tooltip>,
              ]}
              className="h-full flex flex-col shadow-sm hover:shadow-md transition-shadow"
              bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              <div className="flex flex-col justify-between h-full">
                <div className="flex-grow">
                  <h3
                    className="text-lg font-bold mb-2 line-clamp-2 text-gray-800"
                    title={product.title}
                  >
                    {product.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-3" title={product.description}>
                    {product.description || 'No description available'}
                  </p>

                  <div className="mb-3">
                    {product.price && (
                      <p className="text-sm text-green-600 font-semibold">{formatPrice(product.price)}</p>
                    )}
                  </div>
                </div>

                <div className="mt-auto">
                  {product.category && (
                    <Tag color="blue" className="mb-3">
                      {product.category}
                    </Tag>
                  )}

                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex flex-col gap-2">
                      <Link
                        to={`/products/${product._id}`}
                        className="text-blue-500 hover:text-blue-700 font-medium text-sm flex items-center justify-center gap-2"
                      >
                        <FiEye size={14} />
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductPage;
