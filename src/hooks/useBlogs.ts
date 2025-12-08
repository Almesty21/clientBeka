// src/hooks/useBlogs.ts
import { useState, useEffect } from 'react';
import { blogService } from '../services/blog';
import {
  Blog,
  BlogFilters,
  PaginatedResponse,
  ApiResponse,
  Comment,
  CreateCommentPayload,
  CreateBlogPayload,
  UpdateBlogPayload,
} from '../types/blog';

// ------------------------------------
// Hook: useBlogs — Fetch all blogs with filters
// ------------------------------------
export const useBlogs = (filters: BlogFilters = {}) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });

  const fetchBlogs = async (overrideFilters?: BlogFilters) => {
    try {
      setLoading(true);
      setError(null);

      const finalFilters = { ...filters, ...overrideFilters };
      const response: PaginatedResponse<Blog[]> = await blogService.getBlogs(finalFilters);

      if (response.success && response.data) {
        setBlogs(response.data);
        if (response.pagination) {
          const { page, limit, total, totalPages } = response.pagination;
          setPagination({
            page,
            limit,
            total,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
          });
        }
      } else {
        throw new Error(response.error?.message || 'Failed to fetch blogs');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching blogs');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [filters.category, filters.search, filters.page, filters.limit]);

  return {
    blogs,
    loading,
    error,
    pagination,
    refetch: fetchBlogs,
    setBlogs,
  };
};

// ------------------------------------
// Hook: useBlog — Fetch single blog by ID
// ------------------------------------
export const useBlog = (id?: string) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlog = async (blogId?: string) => {
    const targetId = blogId || id;
    if (!targetId) {
      setError('Blog ID is required');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response: ApiResponse<Blog> = await blogService.getBlogById(targetId);
      if (response.success && response.data) {
        setBlog(response.data);
      } else {
        throw new Error(response.error?.message || 'Blog not found');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching the blog');
      setBlog(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchBlog();
    else {
      setLoading(false);
      setError('Blog ID is required');
    }
  }, [id]);

  const updateBlog = async (payload: UpdateBlogPayload) => {
    try {
      const response = await blogService.updateBlog(payload.id, payload);
      if (response.success && response.data) {
        setBlog(response.data);
        return true;
      }
      throw new Error(response.error?.message || 'Failed to update blog');
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  };

  const deleteBlog = async (blogId?: string) => {
    const targetId = blogId || id;
    if (!targetId) return false;

    try {
      const response = await blogService.deleteBlog(targetId);
      if (response.success) {
        setBlog(null);
        return true;
      }
      throw new Error(response.error?.message || 'Failed to delete blog');
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  };

  return {
    blog,
    loading,
    error,
    refetch: fetchBlog,
    updateBlog,
    deleteBlog,
  };
};

// ------------------------------------
// Hook: useComments — Handle blog comments
// ------------------------------------
export const useComments = (blogId?: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = async (id?: string) => {
    const targetId = id || blogId;
    if (!targetId) {
      setError('Blog ID is required');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await blogService.getComments(targetId);
      if (response.success && response.data) {
        setComments(response.data);
      } else {
        throw new Error(response.error?.message || 'Failed to fetch comments');
      }
    } catch (err: any) {
      setError(err.message);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (blogId) fetchComments();
    else {
      setLoading(false);
      setError('Blog ID is required');
    }
  }, [blogId]);

  const addComment = async (payload: CreateCommentPayload) => {
    try {
      const response = await blogService.createComment(payload);
      if (response.success && response.data) {
        setComments(prev => [response.data!, ...prev]);
        return response.data;
      }
      throw new Error(response.error?.message || 'Failed to add comment');
    } catch (err: any) {
      setError(err.message);
      throw err; // Re-throw to handle in component
    }
  };

  const likeComment = async (commentId: string) => {
    try {
      const response = await blogService.likeComment(commentId);
      if (response.success && response.data) {
        // Update the comment in the list
        setComments(prev => prev.map(comment => 
          comment.id === commentId 
            ? { ...comment, likes: response.data!.likes } 
            : comment
        ));
        return true;
      }
      throw new Error(response.error?.message || 'Failed to like comment');
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  };

  return {
    comments,
    loading,
    error,
    refetch: fetchComments,
    addComment,
    likeComment,
    setComments,
  };
};

// ------------------------------------
// Hook: useBlogActions — Like, create blog, etc.
// ------------------------------------
export const useBlogActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAction = async <T>(
    action: () => Promise<ApiResponse<T>>,
    errorMessage: string
  ): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await action();
      if (response.success && response.data) return response.data;
      throw new Error(response.error?.message || errorMessage);
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const likeBlog = async (blogId: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await blogService.likeBlog(blogId);
      if (response.success && response.data) {
        return true;
      }
      throw new Error(response.error?.message || 'Failed to like blog');
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const likeComment = async (commentId: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await blogService.likeComment(commentId);
      if (response.success && response.data) {
        return true;
      }
      throw new Error(response.error?.message || 'Failed to like comment');
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const createBlog = (payload: CreateBlogPayload) =>
    handleAction(() => blogService.createBlog(payload), 'Failed to create blog');

  return {
    loading,
    error,
    likeBlog,
    likeComment,
    createBlog,
    clearError: () => setError(null),
  };
};

// ------------------------------------
// Hook: useBlogManagement — CRUD operations (admin/editor)
// ------------------------------------
export const useBlogManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAction = async <T>(
    action: () => Promise<ApiResponse<T>>,
    errorMessage: string
  ): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await action();
      if (response.success && response.data) return response.data;
      throw new Error(response.error?.message || errorMessage);
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createBlog = (payload: CreateBlogPayload) =>
    handleAction(() => blogService.createBlog(payload), 'Failed to create blog');

  const updateBlog = (id: string, payload: UpdateBlogPayload) =>
    handleAction(() => blogService.updateBlog(id, payload), 'Failed to update blog');

  const deleteBlog = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await blogService.deleteBlog(id);
      if (response.success) return true;
      throw new Error(response.error?.message || 'Failed to delete blog');
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createBlog,
    updateBlog,
    deleteBlog,
    clearError: () => setError(null),
  };
};