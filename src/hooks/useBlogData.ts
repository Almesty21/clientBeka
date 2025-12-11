import { useState, useEffect } from 'react';
import { GetBlogById } from '../services/blog';
import { Blog } from '../types/blog';
import { CommentFormData } from '../types/CommentForm';

interface UseBlogDataReturn {
  blog: Blog | null;
  loading: boolean;
  handleAddComment: (data: CommentFormData) => Promise<void>;
}

export const useBlogData = (id: string | undefined): UseBlogDataReturn => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlog = async (): Promise<void> => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await GetBlogById(id);

        if (response.success) {
          setBlog(response.data);
        } else {
          console.error('Error fetching blog:', response.message);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleAddComment = async (commentData: CommentFormData): Promise<void> => {
    if (!id || !commentData.content.trim()) return;

    console.log('Adding comment:', commentData);
    // TODO: Implement AddComment API
  };

  return {
    blog,
    loading,
    handleAddComment,
  };
};
