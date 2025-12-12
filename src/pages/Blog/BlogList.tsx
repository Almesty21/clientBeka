// src/components/BlogList.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Typography, Button, Card, Tag, Space, Spin, Alert, Row, Col, Grid, Dropdown, Avatar } from 'antd';
import { useBlogs, useBlogActions } from '../../hooks/useBlogs';
import { LikeOutlined, MessageOutlined, ShareAltOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import { Blog, Author } from 'types/blog';

const { Title, Paragraph } = Typography;
const { Content, Sider } = Layout;
const { useBreakpoint } = Grid;

const BlogList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();
  const screens = useBreakpoint();

  const { blogs, loading, error, refetch } = useBlogs({ 
    category: selectedCategory || undefined 
  });
  const { likeBlog } = useBlogActions();

  const categories = React.useMemo(() => {
    if (!blogs) return [];
    return Array.from(new Set(blogs.map(blog => blog.category))).filter(Boolean);
  }, [blogs]);

  const getGridConfig = () => {
    if (screens.xxl) return { span: 6 };
    if (screens.xl) return { span: 8 };
    if (screens.lg) return { span: 12 };
    return { span: 24 };
  };

  const reactionEmojis = [
    { emoji: '👍', type: 'like' },
    { emoji: '❤️', type: 'love' },
    { emoji: '😂', type: 'laugh' },
    { emoji: '😮', type: 'wow' },
    { emoji: '😢', type: 'sad' },
    { emoji: '😠', type: 'angry' }
  ];

  const handleReaction = async (blogId: string, reactionType: string) => {
    try {
      await likeBlog(blogId);
      refetch();
    } catch (error) {
      console.error('Error reacting to blog:', error);
    }
  };

  const handleCardClick = (blogId: string) => {
    navigate(`/blog/${blogId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getAuthorName = (author: Author | null) => author?.name || 'Unknown Author';

  const AuthorAvatar = ({ author, size = "small" }: { author: Author | null; size?: "small" | "large" }) => {
    const avatarSrc = author?.avatar;
    const authorName = getAuthorName(author);
    return (
      <Avatar 
        size={size} 
        src={avatarSrc}
        icon={!avatarSrc ? <UserOutlined /> : undefined}
      >
        {!avatarSrc ? authorName.charAt(0).toUpperCase() : undefined}
      </Avatar>
    );
  };

  const getReactionMenu = (blogId: string) => ({
    items: reactionEmojis.map((reaction) => ({
      key: reaction.type,
      label: (
        <span style={{ fontSize: '1.2rem' }} onClick={() => handleReaction(blogId, reaction.type)}>
          {reaction.emoji}
        </span>
      )
    }))
  });

  const renderBlogCard = (blog: Blog, index: number) => (
    <Col key={`blog-${blog.id}-${index}`} {...getGridConfig()}>
      <Card 
        style={{ 
          height: '100%',
          borderRadius: 12,
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
        hoverable
        onClick={() => handleCardClick(blog.id)}
      >
        {/* Blog Image */}
        {blog.image && (
          <div style={{ height: 200, overflow: 'hidden' }}>
            <img 
              src={blog.image} 
              alt={blog.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            />
          </div>
        )}

        {/* Blog Content */}
        <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Space direction="vertical" style={{ width: '100%', flex: 1 }} size="small">
            <div>
              <Tag color="blue">{blog.category}</Tag>
              <span style={{ marginLeft: 8, color: '#666', fontSize: '0.8rem' }}>
                {formatDate(blog.createdAt)}
              </span>
            </div>

            <Title 
              level={3} 
              style={{ 
                margin: 0, 
                fontSize: '1.2rem',
                lineHeight: 1.3,
                height: '2.6em',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}
            >
              <Link 
                to={`/blog/${blog.id}`}
                style={{ color: 'inherit', textDecoration: 'none' }}
                onClick={(e) => e.stopPropagation()}
              >
                {blog.title}
              </Link>
            </Title>

            <Paragraph 
              style={{ 
                margin: 0,
                fontSize: '0.9rem',
                color: '#666',
                lineHeight: 1.5,
                flex: 1,
                height: '4.5em',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical'
              }}
            >
              {blog.excerpt}
            </Paragraph>

            {/* Author and Stats */}
            <Space size="small" style={{ width: '100%', justifyContent: 'space-between', marginTop: 'auto' }}>
              <Space size="small">
                <AuthorAvatar author={blog.author} />
                <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>
                  {getAuthorName(blog.author)}
                </span>
              </Space>

              <Space size="middle">
                <Space size="small">
                  <LikeOutlined style={{ fontSize: '0.8rem' }} />
                  <span style={{ fontSize: '0.8rem' }}>{blog.likes}</span>
                </Space>
                <Space size="small">
                  <MessageOutlined style={{ fontSize: '0.8rem' }} />
                  <span style={{ fontSize: '0.8rem' }}>{blog.commentsCount}</span>
                </Space>
              </Space>
            </Space>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <Space wrap size={[4, 4]}>
                  {blog.tags.slice(0, 2).map((tag, tagIndex) => (
                   <Tag 
                     key={`tag-${blog.id}-${tag}-${tagIndex}`} 
                     color="default" 
                     style={{ fontSize: '0.75rem', padding: '0 4px' }}
                   >
                      #{tag}
                   </Tag>
                  ))}
                  {blog.tags.length > 2 && (
                    <Tag
                      key={`more-tags-${blog.id}`}
                      style={{ fontSize: '0.75rem', padding: '0 4px' }}
                    >
                      +{blog.tags.length - 2}
                    </Tag>
                  )}
                </Space>
              </div>
            )}
          </Space>

          {/* Actions */}
          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <Link to={`/blog/${blog.id}`} onClick={(e) => e.stopPropagation()}>
              <Button type="primary" size="middle" block>Read More</Button>
            </Link>
            <Space style={{ marginTop: 8, width: '100%', justifyContent: 'space-between' }}>
              <Dropdown menu={getReactionMenu(blog.id)} placement="topLeft" trigger={['click']}>
                <Button type="text" icon={<SmileOutlined />} size="middle" onClick={(e) => e.stopPropagation()}>
                  React
                </Button>
              </Dropdown>
              <Button 
                type="text" 
                icon={<ShareAltOutlined />} 
                size="middle"
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(`${window.location.origin}/blog/${blog.id}`);
                }}
              >
                Share
              </Button>
            </Space>
          </div>
        </div>
      </Card>
    </Col>
  );

  if (loading) {
    return <div style={{ textAlign: 'center', padding: 100 }}><Spin size="large" /></div>;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon style={{ margin: 24 }} />;
  }

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Content style={{ padding: 24 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 24 }}>
            <div style={{ flex: 1 }}>
              <Title level={1} style={{ marginBottom: 32, textAlign: 'center' }}>Latest Blog Posts</Title>

              {(!blogs || blogs.length === 0) ? (
                <Card style={{ textAlign: 'center', padding: 40 }}>
                  <Title level={3} style={{ color: '#666' }}>No blog posts found</Title>
                  <Paragraph style={{ color: '#999' }}>
                    {selectedCategory ? `No posts found in category "${selectedCategory}"` : 'No blog posts available yet'}
                  </Paragraph>
                  <Button type="primary" onClick={() => setSelectedCategory(null)} style={{ marginTop: 16 }}>
                    View All Posts
                  </Button>
                </Card>
              ) : (
                <Row key={`blog-row-${blogs.length}-${selectedCategory || 'all'}`} gutter={[24, 24]}>
                  {blogs.map((blog, index) => renderBlogCard(blog, index))}
                </Row>
              )}
            </div>

            <Sider width={300} style={{ background: 'transparent' }}>
              <Card title="Categories" style={{ position: 'sticky', top: 24 }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Button type={selectedCategory === null ? 'primary' : 'text'} onClick={() => setSelectedCategory(null)} block style={{ textAlign: 'left' }}>All Categories</Button>
                  {categories.map((category, index) => (
                    <Button key={`category-${category}-${index}`} type={selectedCategory === category ? 'primary' : 'text'} onClick={() => setSelectedCategory(category)} block style={{ textAlign: 'left' }}>
                      {category}
                    </Button>
                  ))}
                </Space>

                <div style={{ marginTop: 32, padding: 16, background: '#f0f0f0', borderRadius: 8 }}>
                  <Title level={5}>Blog Stats</Title>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Total Posts:</span><strong>{blogs?.length || 0}</strong></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Categories:</span><strong>{categories.length}</strong></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Active Category:</span><strong>{selectedCategory || 'All'}</strong></div>
                  </Space>
                </div>
              </Card>
            </Sider>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default BlogList;
