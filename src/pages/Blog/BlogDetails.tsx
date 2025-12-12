// src/components/BlogDetail.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Input,
  Button,
  Form,
  List,
  Avatar,
  Layout,
  Spin,
  Alert,
  Card,
  Tag,
  Space,
  Dropdown,
  Row,
  Col,
  message
} from 'antd';
import { useBlog, useComments, useBlogActions } from '../../hooks/useBlogs';
import RecentBlogs from './RecentBlogs';
import { ShareAltOutlined, SmileOutlined, MessageOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const { Content } = Layout;

// TypeScript interfaces
interface Author {
  id: string;
  name?: string;
  firstName?: string;
  username?: string;
  avatar?: string;
  bio?: string;
}

interface Comment {
  id: string;
  content: string;
  author: Author;
  createdAt: string;
  likes?: number;
  replies?: Comment[];
}

interface CreateCommentPayload {
  content: string;
  blogId: string;
  author: string;
  parentId?: string;
  userId: string; // required
}

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [commentContent, setCommentContent] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | undefined>(undefined);
  const [replyContents, setReplyContents] = useState<{ [key: string]: string }>({});

  const isValidBlogId = id && id !== 'undefined' && id !== 'null';

  const { blog, loading: blogLoading, error: blogError, refetch: refetchBlog } = useBlog(isValidBlogId ? id : undefined);
  const { comments, loading: commentsLoading, addComment, likeComment } = useComments(isValidBlogId ? id : undefined);
  const { likeBlog } = useBlogActions();

  const reactionEmojis = [
    { emoji: '👍', type: 'like' },
    { emoji: '❤️', type: 'love' },
    { emoji: '😂', type: 'laugh' },
    { emoji: '😮', type: 'wow' },
    { emoji: '😢', type: 'sad' },
    { emoji: '😠', type: 'angry' }
  ];

  useEffect(() => {
    if (!isValidBlogId) {
      message.error('Invalid blog ID');
      navigate('/blogs');
    }
  }, [isValidBlogId, navigate]);

  const getAuthorName = (author: Author | null | undefined) =>
    author?.name || author?.firstName || author?.username || 'Unknown Author';

  const AuthorAvatar = ({ author, size = 'default' }: { author?: Author | null; size?: 'small' | 'default' | 'large' }) => {
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
    if (!commentContent.trim() || !isValidBlogId) {
      message.warning('Please enter a comment');
      return;
    }

    try {
      setSubmitting(true);
      const payload: CreateCommentPayload = {
        content: commentContent,
        blogId: id!,
        author: commentAuthor || 'Anonymous',
        userId: commentAuthor || 'anonymous'
      };
      await addComment(payload);
      setCommentContent('');
      setCommentAuthor('');
      message.success('Comment added successfully!');
    } catch (err) {
      console.error(err);
      message.error('Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddReply = async (commentId: string) => {
    const replyContent = replyContents[commentId]?.trim();
    if (!replyContent || !isValidBlogId) {
      message.warning('Please enter a reply');
      return;
    }

    try {
      const payload: CreateCommentPayload = {
        content: replyContent,
        blogId: id!,
        author: commentAuthor || 'Anonymous',
        parentId: commentId,
        userId: commentAuthor || 'anonymous'
      };
      await addComment(payload);
      setReplyContents(prev => ({ ...prev, [commentId]: '' }));
      setReplyingTo(undefined);
      message.success('Reply added successfully!');
    } catch (err) {
      console.error(err);
      message.error('Failed to add reply');
    }
  };

  const handleReaction = async (reactionType: string) => {
    if (!isValidBlogId) return message.error('Invalid blog ID');
    try {
      const success = await likeBlog(id!);
      if (success) {
        refetchBlog();
        message.success(`Reacted with ${reactionType}`);
      } else message.error('Failed to react to blog');
    } catch (err) {
      console.error(err);
      message.error('Failed to react to blog');
    }
  };

  const handleCommentReaction = async (commentId: string, reactionType: string) => {
    if (!commentId) return message.error('Invalid comment ID');
    try {
      const success = await likeComment(commentId);
      if (success) message.success(`Reacted to comment with ${reactionType}`);
      else message.error('Failed to react to comment');
    } catch (err) {
      console.error(err);
      message.error('Failed to react to comment');
    }
  };

  const handleShareBlog = () => {
    if (!blog) return;
    const blogUrl = window.location.href;
    navigator.clipboard?.writeText(blogUrl)
      .then(() => message.success('Blog link copied to clipboard!'))
      .catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = blogUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        message.success('Blog link copied to clipboard!');
      });
  };

  const formatDate = (date: string) => {
    try {
      return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return 'Invalid date';
    }
  };

  if (blogLoading) {
    return <div style={{ textAlign: 'center', padding: 100 }}><Spin size="large" /><Paragraph style={{ marginTop: 16 }}>Loading blog post...</Paragraph></div>;
  }

  if (blogError || !blog) {
    return (
      <div style={{ padding: 24 }}>
        <Alert
          message="Blog Not Found"
          description={blogError || 'The blog post you are looking for does not exist or has been removed.'}
          type="error"
          showIcon
          style={{ marginBottom: 24 }}
          action={<Button size="small" onClick={() => navigate('/blogs')}>Back to Blogs</Button>}
        />
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Content style={{ padding: 24 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Row gutter={[32, 32]}>
            <Col xs={24} lg={16}>
              <Card style={{ borderRadius: 12, marginBottom: 24 }}>
                <header style={{ marginBottom: 32 }}>
                  <div style={{ marginBottom: 16 }}>
                    <Tag color="blue">{blog.category || 'Uncategorized'}</Tag>
                    <span style={{ marginLeft: 16, color: '#666' }}>{blog.readTime || 0} min read • {formatDate(blog.createdAt)}</span>
                  </div>
                  <Title level={1} style={{ marginBottom: 16 }}>{blog.title || 'Untitled Blog'}</Title>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
                    <AuthorAvatar author={blog.author} size="large" />
                    <div style={{ marginLeft: 12 }}>
                      <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{getAuthorName(blog.author)}</div>
                      {blog.author?.bio && <div style={{ color: '#666', fontSize: '0.9rem' }}>{blog.author.bio}</div>}
                    </div>
                  </div>
                  <Space size="large" style={{ flexWrap: 'wrap', marginBottom: 24 }}>
                    <Dropdown menu={{ items: reactionEmojis.map(r => ({ key: r.type, label: <span onClick={() => handleReaction(r.type)}>{r.emoji}</span> })) }} placement="topLeft" trigger={['click']}>
                      <Button type="text" icon={<SmileOutlined />} size="large">{blog.likes || 0} Reactions</Button>
                    </Dropdown>
                    <Button type="text" icon={<MessageOutlined />} size="large">{comments.length} Comments</Button>
                    <Button type="text" icon={<EyeOutlined />} size="large">{blog.views || 0} Views</Button>
                    <Button type="text" icon={<ShareAltOutlined />} size="large" onClick={handleShareBlog}>Share</Button>
                  </Space>
                </header>

                {blog.image && <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: 8 }} />}

                <div className="blog-content" style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: 48 }} dangerouslySetInnerHTML={{ __html: blog.content || '<p>No content available</p>' }} />

                {blog.tags?.length > 0 && (
                  <div style={{ marginBottom: 32 }}>
                    <Title level={4}>Tags</Title>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {blog.tags.map(tag => <Tag key={tag} color="default">#{tag}</Tag>)}
                    </div>
                  </div>
                )}
              </Card>

              {/* Comments */}
              <Card title={`Comments (${comments.length})`} style={{ borderRadius: 12 }}>
                <Form onFinish={handleAddComment} style={{ marginBottom: 32 }}>
                  <Form.Item>
                    <Input value={commentAuthor} onChange={e => setCommentAuthor(e.target.value)} placeholder="Your name (optional)" style={{ marginBottom: 16 }} size="large" />
                    <TextArea rows={4} value={commentContent} onChange={e => setCommentContent(e.target.value)} placeholder="Share your thoughts..." size="large" maxLength={1000} showCount />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={submitting} disabled={!commentContent.trim() || !isValidBlogId} size="large">Post Comment</Button>
                  </Form.Item>
                </Form>

                {commentsLoading ? <Spin style={{ display: 'block', textAlign: 'center', padding: 40 }} /> : (
                  <List itemLayout="horizontal" dataSource={comments} locale={{ emptyText: 'No comments yet. Be the first to comment!' }}
                    renderItem={(comment: Comment) => (
                      <List.Item key={comment.id} style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
                        <List.Item.Meta
                          avatar={<AuthorAvatar author={comment.author} />}
                          title={
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <div>
                                <span style={{ fontWeight: 'bold', marginRight: 8 }}>{getAuthorName(comment.author)}</span>
                                <span style={{ color: '#666', fontSize: '0.8rem' }}>{formatDate(comment.createdAt)}</span>
                              </div>
                              <Dropdown menu={{ items: reactionEmojis.map(r => ({ key: r.type, label: <span onClick={() => handleCommentReaction(comment.id, r.type)}>{r.emoji}</span> })) }} placement="bottomRight" trigger={['click']} arrow>
                                <Button type="text" icon={<SmileOutlined />} size="small" onClick={e => e.stopPropagation()}>React</Button>
                              </Dropdown>
                            </div>
                          }
                          description={
                            <div>
                              <Paragraph style={{ marginBottom: 12, fontSize: '1rem' }}>{comment.content}</Paragraph>
                              <Space size="middle" style={{ marginBottom: 12 }}>
                                <span style={{ color: '#666', fontSize: '0.9rem' }}>{comment.likes || 0} likes</span>
                                <Button type="text" size="small" onClick={() => setReplyingTo(replyingTo === comment.id ? undefined : comment.id)}>Reply</Button>
                              </Space>

                              {replyingTo === comment.id && (
                                <div style={{ marginTop: 12 }}>
                                  <TextArea rows={2} value={replyContents[comment.id] || ''} onChange={e => setReplyContents(prev => ({ ...prev, [comment.id]: e.target.value }))} placeholder="Write a reply..." style={{ marginBottom: 8 }} />
                                  <Space>
                                    <Button type="primary" size="small" onClick={() => handleAddReply(comment.id)} disabled={!replyContents[comment.id]?.trim()}>Post Reply</Button>
                                    <Button size="small" onClick={() => setReplyingTo(undefined)}>Cancel</Button>
                                  </Space>
                                </div>
                              )}

                              {comment.replies?.length > 0 && (
                                <div style={{ marginTop: 16, paddingLeft: 16, borderLeft: '2px solid #f0f0f0' }}>
                                  {comment.replies.map((reply: Comment) => (
                                    <div key={reply.id} style={{ marginBottom: 12, padding: '8px 0' }}>
                                      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                        <AuthorAvatar author={reply.author} size="small" />
                                        <div style={{ flex: 1, marginLeft: 8 }}>
                                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{getAuthorName(reply.author)}</span>
                                            <span style={{ color: '#666', fontSize: '0.8rem' }}>{formatDate(reply.createdAt)}</span>
                                          </div>
                                          <Paragraph style={{ margin: 0, fontSize: '0.9rem' }}>{reply.content}</Paragraph>
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

            {/* Sidebar */}
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
