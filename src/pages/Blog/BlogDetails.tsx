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
  message,
  Row,
  Col,
} from 'antd';
import { useBlog, useComments, useBlogActions } from '../../hooks/useBlogs';
import RecentBlogs from './RecentBlogs';
import { UserOutlined } from '@ant-design/icons';

// Types
import type { Comment, Author } from '../../types/blog';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

interface CreateCommentPayload {
  content: string;
  blogId: string;
  author: string;
  parentId?: string;
  userId: string;
}

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [commentContent, setCommentContent] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | undefined>(undefined);
  const [replyContents, setReplyContents] = useState<Record<string, string>>({});

  const isValidBlogId = Boolean(id && id !== 'undefined' && id !== 'null');

  const { blog, loading: blogLoading, error: blogError, refetch: refetchBlog } = useBlog(isValidBlogId ? id : undefined);
  const { comments, loading: commentsLoading, addComment, likeComment } = useComments(isValidBlogId ? id : undefined);
  const { likeBlog } = useBlogActions();

  useEffect(() => {
    if (!isValidBlogId) {
      message.error('Invalid blog ID');
      navigate('/blogs');
    }
  }, [isValidBlogId, navigate]);

  const getAuthorName = (author?: Author | null) =>
    author?.name || author?.firstName || author?.username || 'Anonymous';

  const AuthorAvatar = ({ author, size = 'default' }: { author?: Author | null; size?: 'small' | 'default' | 'large' }) => {
    const avatarSrc = author?.avatar;
    const authorName = getAuthorName(author);
    return (
      <Avatar size={size} src={avatarSrc} icon={!avatarSrc ? <UserOutlined /> : undefined}>
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
      await addComment({
        content: commentContent.trim(),
        blogId: id!,
        author: commentAuthor || 'Anonymous',
        userId: commentAuthor || 'anonymous',
      });
      setCommentContent('');
      setCommentAuthor('');
      message.success('Comment added successfully!');
    } catch {
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
      await addComment({
        content: replyContent,
        blogId: id!,
        author: commentAuthor || 'Anonymous',
        parentId: commentId,
        userId: commentAuthor || 'anonymous',
      });
      setReplyContents(prev => ({ ...prev, [commentId]: '' }));
      setReplyingTo(undefined);
      message.success('Reply added successfully!');
    } catch {
      message.error('Failed to add reply');
    }
  };

  const handleReaction = async (reactionType: string) => {
    if (!isValidBlogId) return;
    try {
      const success = await likeBlog(id!);
      if (success) {
        refetchBlog();
        message.success(`Reacted with ${reactionType}`);
      } else message.error('Failed to react to blog');
    } catch {
      message.error('Failed to react to blog');
    }
  };

  const handleCommentReaction = async (commentId: string, reactionType: string) => {
    if (!commentId) return;
    try {
      const success = await likeComment(commentId);
      if (success) message.success(`Reacted to comment with ${reactionType}`);
      else message.error('Failed to react to comment');
    } catch {
      message.error('Failed to react to comment');
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  if (blogLoading) return <Spin style={{ display: 'block', margin: 100 }} />;
  if (blogError || !blog) return <Alert message="Blog Not Found" type="error" />;

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Content style={{ padding: 24 }}>
        <Row gutter={[32, 32]}>
          <Col xs={24} lg={16}>
            <Card style={{ borderRadius: 12, marginBottom: 24 }}>
              <Title level={1}>{blog.title}</Title>
              {blog.author && <AuthorAvatar author={blog.author} size="large" />}

              <List
                itemLayout="horizontal"
                dataSource={comments}
                renderItem={comment => (
                  <List.Item key={comment.id}>
                    <List.Item.Meta
                      avatar={<AuthorAvatar author={comment.author} />}
                      title={getAuthorName(comment.author)}
                      description={comment.content}
                    />
                    {comment.replies?.length > 0 && (
                      <div style={{ paddingLeft: 16 }}>
                        {comment.replies.map(reply => (
                          <Paragraph key={reply.id}>
                            <b>{getAuthorName(reply.author)}:</b> {reply.content}
                          </Paragraph>
                        ))}
                      </div>
                    )}
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <RecentBlogs currentBlogId={blog.id} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default BlogDetail;
