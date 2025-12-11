import { useState, useEffect } from 'react';
import { blogService } from '../services/blog';
import { Blog } from '../types/blog';

export const useRecentBlogs = (currentBlogId?: string, limit: number = 3) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecentBlogs = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await blogService.getBlogs({ limit, page: 1 });

      if (response.success && response.data) {
        const filtered = currentBlogId
          ? response.data.filter((blog: Blog) => blog.id !== currentBlogId)
          : response.data;

        setBlogs(filtered.slice(0, limit));
      } else {
        setError(response.error?.message || 'Failed to fetch recent blogs');
        setBlogs([]);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentBlogs();
  }, [currentBlogId, limit]);

  return { blogs, loading, error, refetch: fetchRecentBlogs };
};
