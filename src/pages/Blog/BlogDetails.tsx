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

// Use shared types
import type { Comment, Author } from '../../types/blog';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
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

  const getAuthorName = (author?: Author | null) => author?.name || author?.firstName || author?.username || 'Anonymous';

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
        userId: commentAuthor || 'anonymous'
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
        userId: commentAuthor || 'anonymous'
      });
      setReplyContents(prev => ({ ...prev, [commentId]: '' }));
      setReplyingTo(undefined);
      message.success('Reply added successfully!');
    } catch {
      message.error('Failed to add reply');
    }
  };

  const handleReaction = async (reactionType: string) => {
    if (!
