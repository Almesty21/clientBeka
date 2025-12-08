import { Typography, List, Avatar, Card, Spin } from 'antd';
import { CalendarOutlined, EyeOutlined } from '@ant-design/icons';
import { useBlogs } from '../../hooks/useBlogs';
import { Link } from 'react-router-dom';

const { Text } = Typography;

interface RecentBlogsProps {
  currentBlogId?: string;
  limit?: number;
  showImages?: boolean;
}

const RecentBlogs: React.FC<RecentBlogsProps> = ({ 
  currentBlogId, 
  limit = 5,
  showImages = true
}) => {
  // Fixed: Added proper error handling and increased limit for filtering
  const { blogs, loading, error } = useBlogs({ limit: limit + 1 });

  // Fixed: Added safe array handling and null checks
  const recentBlogs = (blogs || [])
    .filter(blog => blog?.id !== currentBlogId)
    .slice(0, limit);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric' // Added year for better context
      });
    } catch (error:any) {
      return 'Invalid date';
    }
  };

  // Fixed: Added error state handling
  if (error) {
    return (
      <Card title="Recent Blogs" style={{ marginBottom: 24 }}>
        <div style={{ textAlign: 'center', padding: 20, color: '#ff4d4f' }}>
          Failed to load recent blogs
        </div>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card title="Recent Blogs" style={{ marginBottom: 24 }}>
        <div style={{ textAlign: 'center', padding: 20 }}>
          <Spin size="small" />
        </div>
      </Card>
    );
  }

  // Fixed: Added empty state handling
  if (!recentBlogs.length) {
    return (
      <Card title="Recent Blogs" style={{ marginBottom: 24 }}>
        <div style={{ textAlign: 'center', padding: 20, color: '#999' }}>
          No recent blogs available
        </div>
      </Card>
    );
  }

  return (
    <Card 
      title="Recent Articles" // Fixed: Consistent title
      style={{ marginBottom: 24 }}
      bodyStyle={{ padding: '16px 0' }}
    >
      <List
        dataSource={recentBlogs}
        locale={{ emptyText: 'No recent articles' }} // Fixed: Consistent text
        renderItem={(blog) => (
          <List.Item 
            key={blog.id}
            style={{ 
              padding: '12px 16px',
              borderBottom: '1px solid #f0f0f0',
              alignItems: 'flex-start' // Fixed: Better alignment
            }}
          >
            <div style={{ display: 'flex', gap: 12, width: '100%' }}>
              {/* Article Image */}
              {showImages && blog.image && (
                <Avatar 
                  shape="square" 
                  src={blog.image}
                  size={48}
                  style={{ 
                    minWidth: 48,
                    borderRadius: 6,
                    objectFit: 'cover' // Fixed: Better image display
                  }}
                />
              )}
              
              {/* Article Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Article Title */}
                <Link 
                  to={`/blog/${blog.id}`}
                  style={{ 
                    display: 'block',
                    fontWeight: 500,
                    lineHeight: 1.4,
                    marginBottom: 6,
                    color: '#1890ff',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}
                  className="recent-article-title"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#40a9ff'; // Hover effect
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#1890ff';
                  }}
                >
                  {/* Fixed: Better title truncation */}
                  {blog.title?.length > 60 
                    ? `${blog.title.substring(0, 60)}...` 
                    : blog.title || 'Untitled Article'
                  }
                </Link>

                {/* Article Meta */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '11px',
                  color: '#666',
                  flexWrap: 'wrap' // Fixed: Better responsive behavior
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <CalendarOutlined />
                    <span>{formatDate(blog.createdAt)}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <EyeOutlined />
                    <span>{blog.views || 0}</span> {/* Fixed: Default value */}
                  </div>
                </div>

                {/* Category Tag */}
                {blog.category && (
                  <div style={{ marginTop: 6 }}>
                    <Text 
                      type="secondary" 
                      style={{ 
                        fontSize: '10px',
                        background: '#f0f0f0',
                        padding: '2px 6px', // Fixed: Better padding
                        borderRadius: 3,
                        display: 'inline-block'
                      }}
                    >
                      {blog.category}
                    </Text>
                  </div>
                )}
              </div>
            </div>
          </List.Item>
        )}
      />

      {/* View All Link */}
      {recentBlogs.length > 0 && (
        <div style={{ 
          padding: '12px 16px 4px',
          textAlign: 'center',
          borderTop: '1px solid #f0f0f0',
          marginTop: 8 // Fixed: Added spacing
        }}>
          <Link 
            to="/blog"
            style={{ 
              color: '#1890ff',
              fontSize: '14px',
              textDecoration: 'none',
              fontWeight: 500
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#40a9ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#1890ff';
            }}
          >
            View All Blogs →
          </Link>
        </div>
      )}
    </Card>
  );
};

export default RecentBlogs;