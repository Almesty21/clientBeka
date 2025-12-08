// src/hooks/useRecentBlogs.ts
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
      
      const response = await blogService.getBlogs({
        limit,
        page: 1
      });
      
      if (response.success && response.data) {
        // Filter out current blog if provided
        const filteredBlogs = currentBlogId 
          ? response.data.filter(blog => blog.id !== currentBlogId)
          : response.data;
        
        // Ensure we have the correct number of blogs
        const finalBlogs = filteredBlogs.slice(0, limit);
        setBlogs(finalBlogs);
      } else {
        setError(response.error?.message || 'Failed to fetch recent blogs');
        setBlogs([]);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching recent blogs');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentBlogs();
  }, [currentBlogId, limit]);

  const refetch = () => fetchRecentBlogs();

  return {
    blogs,
    loading,
    error,
    refetch
  };
};

// src/hooks/useBlogCategories.ts
import { useState, useEffect } from 'react';
import { useBlogs } from './useBlogs';

export const useBlogCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { blogs, loading: blogsLoading, error: blogsError } = useBlogs({ limit: 1000 });

  useEffect(() => {
    if (!blogsLoading) {
      setLoading(false);
      
      if (blogsError) {
        setError(blogsError);
        return;
      }

      // Extract unique categories from blogs
      const uniqueCategories = Array.from(
        new Set(blogs.map(blog => blog.category).filter(Boolean))
      ) as string[];
      
      setCategories(uniqueCategories);
    }
  }, [blogs, blogsLoading, blogsError]);

  return {
    categories,
    loading,
    error
  };
};

// src/hooks/useBlogSearch.ts
import { useState, useCallback } from 'react';
import { useBlogs } from './useBlogs';
import { BlogFilters } from '../types/blog';

export const useBlogSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<BlogFilters>({});
  
  const { blogs, loading, error, refetch } = useBlogs({
    search: searchQuery,
    ...filters
  });

  const search = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const updateFilters = useCallback((newFilters: BlogFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setFilters({});
  }, []);

  return {
    blogs,
    loading,
    error,
    search,
    searchQuery,
    filters,
    updateFilters,
    clearSearch,
    refetch
  };
};