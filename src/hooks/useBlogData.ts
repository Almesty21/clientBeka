// src/hooks/useBlogData.ts
import { useState, useEffect } from 'react';
import { GetBlogById } from '../services/blog';
import { Blog } from '../types/blog';
import { CommentFormData } from '../types/CommentForm';

export const useBlogData = (id: string | undefined): Blog => {
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

    try {
      // Note: You'll need to implement AddComment in your services
      // const response = await AddComment(id, commentData);
      // if (response.success) {
      //   const updatedBlog = await GetBlogById(id);
      //   setBlog(updatedBlog.data);
      // }
      
      // Temporary implementation using your existing API_URLS
      // This should be replaced with proper service calls
      console.log('Adding comment:', commentData);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return {
    blog,
    loading,
    handleAddComment,
  };
};