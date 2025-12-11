// src/components/BlogDetail.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Input, Button, Form, List, Avatar, Layout, Spin, Alert, Card, Tag, Space, Dropdown, Row, Col, message } from 'antd';
import { useBlog, useComments, useBlogActions } from '../../hooks/useBlogs';
import RecentBlogs from './RecentBlogs';
import { ShareAltOutlined, SmileOutlined, MessageOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const { Content } = Layout;
interface Comment {
  id: string;
  content: string;
  author: any;
  createdAt: string;
  likes?: number;
  replies?: Comment[];
}

const comments: Comment[] = ...;

// Define the comment payload interface locally
interface CreateCommentPayload {
  content: string;
  blogId: string;
  author: string;
  parentId?: string;
}

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [commentContent, setCommentContent] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | undefined>(undefined);
  const [replyContents, setReplyContents] = useState<{ [key: string]: string | undefined }>({});


  // Validate blog ID before using hooks
  const isValidBlogId = id && id !== 'undefined' && id !== 'null';

  // Use hooks only when id is valid
  const { blog, loading: blogLoading, error: blogError, refetch: refetchBlog } = useBlog(isValidBlogId ? id : undefined);
  const { comments, loading: commentsLoading, addComment, likeComment } = useComments(isValidBlogId ? id : undefined);
  const { likeBlog } = useBlogActions();

  // Reaction emojis
  const reactionEmojis = [
    { emoji: '👍', type: 'like' },
    { emoji: '❤️', type: 'love' },
    { emoji: '😂', type: 'laugh' },
    { emoji: '😮', type: 'wow' },
    { emoji: '😢', type: 'sad' },
    { emoji: '😠', type: 'angry' }
  ];

  // Redirect if invalid ID
  useEffect(() => {
    if (!isValidBlogId) {
      message.error('Invalid blog ID');
      navigate('/blogs');
    }
  }, [isValidBlogId, navigate]);

  const getAuthorName = (author: any) => {
    if (!author) return 'Unknown Author';
    return author.name || author.firstName || author.username || 'Unknown Author';
  };

  const AuthorAvatar = ({ author, size = "default" }: { author: any; size?: "small" | "default" | "large" }) => {
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

  const handleAddComment = async () => {
    if (!commentContent.trim() || !id) {
      message.warning('Please enter a comment');
      return;
    }

    if (!isValidBlogId) {
      message.error('Invalid blog ID');
      return;
    }

    try {
      setSubmitting(true);
      
      const commentPayload: CreateCommentPayload = {
        content: commentContent,
        blogId: id,
        authorName: commentAuthor || 'Anonymous',
      };
      
      await addComment(commentPayload);
      setCommentContent('');
      setCommentAuthor('');
      message.success('Comment added successfully!');
    } catch (error) {
      console.error('Error adding comment:', error);
      message.error('Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReaction = async (reactionType: string) => {
    if (!id || !isValidBlogId) {
      message.error('Invalid blog ID');
      return;
    }

    try {
      const success = await likeBlog(id);
      if (success) {
        refetchBlog();
        message.success(`Reacted with ${reactionType}`);
      } else {
        message.error('Failed to react to blog');
      }
    } catch (error) {
      console.error('Error reacting to blog:', error);
      message.error('Failed to react to blog');
    }
  };

  const handleCommentReaction = async (commentId: string, reactionType: string) => {
    if (!commentId) {
      message.error('Invalid comment ID');
      return;
    }

    try {
      const success = await likeComment(commentId);
      if (success) {
        message.success(`Reacted to comment with ${reactionType}`);
      } else {
        message.error('Failed to react to comment');
      }
    } catch (error) {
      console.error('Error reacting to comment:', error);
      message.error('Failed to react to comment');
    }
  };

  const handleAddReply = async (commentId: string) => {
    const replyContent = replyContents[commentId]?.trim();
    if (!replyContent) {
      message.warning('Please enter a reply');
      return;
    }

    try {
      const replyPayload: CreateCommentPayload = {
        content: replyContent,
        blogId: id!,
        author: commentAuthor || 'Anonymous',
        parentId: commentId,
      };
      
      await addComment(replyPayload);
      setReplyContents(prev => ({ ...prev, [commentId]: '' }));
      setReplyingTo(undefined);
      message.success('Reply added successfully!');
    } catch (error) {
      console.error('Error adding reply:', error);
      message.error('Failed to add reply');
    }
  };

  const handleShareBlog = () => {
    if (!blog) return;
    
    const blogUrl = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(blogUrl)
        .then(() => {
          message.success('Blog link copied to clipboard!');
        })
        .catch(() => {
          const textArea = document.createElement('textarea');
          textArea.value = blogUrl;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          message.success('Blog link copied to clipboard!');
        });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = blogUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      message.success('Blog link copied to clipboard!');
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid date';
    }
  };

  // Safe data getters with fallbacks
  const getBlogCategory = () => blog?.category || 'Uncategorized';
  const getBlogTitle = () => blog?.title || 'Untitled Blog';
  const getBlogContent = () => blog?.content || '<p>No content available</p>';
  const getBlogImage = () => blog?.image || null;
  const getBlogTags = () => blog?.tags || [];
  const getBlogStats = () => ({
    likes: blog?.likes || 0,
    commentsCount: comments.length || 0,
    views: blog?.views || 0,
    readTime: blog?.readTime || 0
  });

  const getBlogReactionMenu = () => ({
    items: reactionEmojis.map((reaction) => ({
      key: reaction.type,
      label: (
        <span 
          style={{ fontSize: '1.2rem' }}
          onClick={() => handleReaction(reaction.type)}
        >
          {reaction.emoji}
        </span>
      )
    }))
  });

  const getCommentReactionMenu = (commentId: string) => ({
    items: reactionEmojis.map((reaction) => ({
      key: reaction.type,
      label: (
        <span 
          style={{ fontSize: '1.2rem' }}
          onClick={() => handleCommentReaction(commentId, reaction.type)}
        >
          {reaction.emoji}
        </span>
      )
    }))
  });

  // Show loading state
  if (blogLoading) {
    return (
      <div style={{ textAlign: 'center', padding: 100 }}>
        <Spin size="large" />
        <Paragraph style={{ marginTop: 16 }}>Loading blog post...</Paragraph>
      </div>
    );
  }

  // Show error state
  if (blogError || !blog) {
    return (
      <div style={{ padding: 24 }}>
        <Alert
          message="Blog Not Found"
          description={blogError || 'The blog post you are looking for does not exist or has been removed.'}
          type="error"
          showIcon
          style={{ marginBottom: 24 }}
          action={
            <Button size="small" onClick={() => navigate('/blogs')}>
              Back to Blogs
            </Button>
          }
        />
        <Card>
          <div style={{ textAlign: 'center', padding: 40 }}>
            <Title level={3}>Blog Not Available</Title>
            <Paragraph>
              The blog post you're trying to access is not available. This could be because:
            </Paragraph>
            <ul style={{ textAlign: 'left', maxWidth: 400, margin: '0 auto' }}>
              <li>The blog has been deleted</li>
              <li>The URL is incorrect</li>
              <li>There was a temporary error</li>
            </ul>
            <Button 
              type="primary" 
              onClick={() => navigate('/blogs')}
              style={{ marginTop: 16 }}
            >
              Browse All Blogs
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const stats = getBlogStats();

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Content style={{ padding: 24 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Row gutter={[32, 32]}>
            {/* Main Blog Content */}
            <Col xs={24} lg={16}>
              <Card 
                style={{ 
                  borderRadius: 12,
                  marginBottom: 24
                }}
                styles={{
                  body: { padding: 32 }
                }}
              >
                {/* Blog Header */}
                <header style={{ marginBottom: 32 }}>
                  <div style={{ marginBottom: 16 }}>
                    <Tag color="blue" style={{ fontSize: '1rem', padding: '4px 12px' }}>
                      {getBlogCategory()}
                    </Tag>
                    <span style={{ marginLeft: 16, color: '#666' }}>
                      {stats.readTime} min read • {formatDate(blog.createdAt)}
                    </span>
                  </div>

                  <Title level={1} style={{ marginBottom: 16, fontSize: '2.5rem', lineHeight: 1.2 }}>
                    {getBlogTitle()}
                  </Title>

                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
                    <AuthorAvatar author={blog.author} size="large" />
                    <div style={{ marginLeft: 12 }}>
                      <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                        {getAuthorName(blog.author)}
                      </div>
                      {blog.author?.bio && (
                        <div style={{ color: '#666', fontSize: '0.9rem' }}>
                          {blog.author.bio}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Blog Stats */}
                  <div style={{ display: 'flex', gap: 24, marginBottom: 24, flexWrap: 'wrap' }}>
                    <Space size="large">
                      <Dropdown 
                        menu={getBlogReactionMenu()} 
                        placement="topLeft"
                        trigger={['click']}
                        disabled={!isValidBlogId}
                      >
                        <Button 
                          type="text" 
                          icon={<SmileOutlined />}
                          size="large"
                        >
                          {stats.likes} Reactions
                        </Button>
                      </Dropdown>
                      
                      <Button 
                        type="text" 
                        icon={<MessageOutlined />}
                        size="large"
                      >
                        {stats.commentsCount} Comments
                      </Button>
                      
                      <Button 
                        type="text" 
                        icon={<EyeOutlined />}
                        size="large"
                      >
                        {stats.views} Views
                      </Button>

                      <Button 
                        type="text" 
                        icon={<ShareAltOutlined />}
                        size="large"
                        onClick={handleShareBlog}
                      >
                        Share
                      </Button>
                    </Space>
                  </div>
                </header>

                {/* Blog Image */}
                {getBlogImage() && (
                  <div style={{ marginBottom: 32 }}>
                    <img 
                      src={getBlogImage()} 
                      alt={getBlogTitle()}
                      style={{
                        width: '100%',
                        height: '400px',
                        objectFit: 'cover',
                        borderRadius: 8
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {/* Blog Content */}
                <div 
                  className="blog-content"
                  style={{
                    fontSize: '1.1rem',
                    lineHeight: 1.7,
                    marginBottom: 48
                  }}
                  dangerouslySetInnerHTML={{ __html: getBlogContent() }}
                />

                {/* Tags */}
                {getBlogTags().length > 0 && (
                  <div style={{ marginBottom: 32 }}>
                    <Title level={4}>Tags</Title>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {getBlogTags().map(tag => (
                        <Tag key={tag} color="default" style={{ fontSize: '0.9rem', padding: '4px 8px' }}>
                          #{tag}
                        </Tag>
                      ))}
                    </div>
                  </div>
                )}
              </Card>

              {/* Comments Section */}
              <Card 
                title={`Comments (${comments.length})`}
                style={{ borderRadius: 12 }}
                styles={{
                  body: { padding: 24 }
                }}
              >
                {/* Add Comment Form */}
                <Form
                  onFinish={handleAddComment}
                  style={{ marginBottom: 32 }}
                >
                  <Form.Item>
                    <Input
                      value={commentAuthor}
                      onChange={(e) => setCommentAuthor(e.target.value)}
                      placeholder="Your name (optional)"
                      style={{ marginBottom: 16 }}
                      size="large"
                    />
                    <TextArea
                      rows={4}
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      placeholder="Share your thoughts..."
                      size="large"
                      maxLength={1000}
                      showCount
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      loading={submitting}
                      disabled={!commentContent.trim() || !isValidBlogId}
                      size="large"
                    >
                      Post Comment
                    </Button>
                  </Form.Item>
                </Form>

                {/* Comment List */}
                {commentsLoading ? (
                  <div style={{ textAlign: 'center', padding: 40 }}>
                    <Spin />
                    <Paragraph style={{ marginTop: 16 }}>Loading comments...</Paragraph>
                  </div>
                ) : (
                  <List
                    className="comment-list"
                    itemLayout="horizontal"
                    dataSource={comments}
                    locale={{ emptyText: 'No comments yet. Be the first to comment!' }}
                    renderItem={comment => (
                      <List.Item 
                        key={comment.id}
                        style={{ 
                          padding: '16px 0',
                          borderBottom: '1px solid #f0f0f0'
                        }}
                      >
                        <List.Item.Meta
                          avatar={
                            <AuthorAvatar author={comment.author} size="default" />
                          }
                          title={
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                              <div>
                                <span style={{ fontWeight: 'bold', marginRight: 8 }}>
                                  {getAuthorName(comment.author)}
                                </span>
                                <span style={{ color: '#666', fontSize: '0.8rem' }}>
                                  {formatDate(comment.createdAt)}
                                </span>
                              </div>
                              <Dropdown 
                                menu={getCommentReactionMenu(comment.id)} 
                                placement="bottomRight"
                                trigger={['click']}
                                arrow
                              >
                                <Button 
                                  type="text" 
                                  icon={<SmileOutlined />}
                                  size="small"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  React
                                </Button>
                              </Dropdown>
                            </div>
                          }
                          description={
                            <div>
                              <Paragraph style={{ marginBottom: 12, fontSize: '1rem' }}>
                                {comment.content}
                              </Paragraph>
                              
                              {/* Comment Reactions and Actions */}
                              <Space size="middle" style={{ marginBottom: 12 }}>
                                <span style={{ color: '#666', fontSize: '0.9rem' }}>
                                  {comment.likes || 0} likes
                                </span>
                                <Button 
                                  type="text" 
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setReplyingTo(replyingTo === comment.id ? null : comment.id);
                                  }}
                                >
                                  Reply
                                </Button>
                              </Space>

                              {/* Reply Form */}
                              {replyingTo === comment.id && (
                                <div style={{ marginTop: 12 }}>
                                  <TextArea
                                    rows={2}
                                    value={replyContents[comment.id] || ''}
                                    onChange={(e) => setReplyContents(prev => ({ 
                                      ...prev, 
                                      [comment.id]: e.target.value 
                                    }))}
                                    placeholder="Write a reply..."
                                    style={{ marginBottom: 8 }}
                                  />
                                  
                                  <Space>
                                    <Button 
                                      type="primary" 
                                      size="small"
                                      onClick={() => handleAddReply(comment.id)}
                                      disabled={!replyContents[comment.id]?.trim()}
                                    >
                                      Post Reply
                                    </Button>
                                    <Button 
                                      size="small"
                                      onClick={() => setReplyingTo(null)}
                                    >
                                      Cancel
                                    </Button>
                                  </Space>
                                </div>
                              )}

                              {/* Nested Replies */}
                              {comment.replies && comment.replies.length > 0 && (
                                <div style={{ marginTop: 16, paddingLeft: 16, borderLeft: '2px solid #f0f0f0' }}>
                                  {comment.replies.map((reply:Comment) => (
                                    <div key={reply.id} style={{ marginBottom: 12, padding: '8px 0' }}>
                                      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                        <AuthorAvatar author={reply.author} size="small" />
                                        <div style={{ flex: 1, marginLeft: 8 }}>
                                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                                              {getAuthorName(reply.author)}
                                            </span>
                                            <span style={{ color: '#666', fontSize: '0.8rem' }}>
                                              {formatDate(reply.createdAt)}
                                            </span>
                                          </div>
                                          <Paragraph style={{ margin: 0, fontSize: '0.9rem' }}>
                                            {reply.content}
                                          </Paragraph>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                )}
              </Card>
            </Col>

            {/* Sidebar - Recent Articles */}
            <Col xs={24} lg={8}>
              <div style={{ position: 'sticky', top: 24 }}>
                <RecentBlogs currentBlogId={blog.id} />
              </div>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default BlogDetail;
