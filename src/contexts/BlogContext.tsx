// src/contexts/BlogContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { Blog } from '../types/blog';

const BlogContext = createContext<Blog| undefined>(undefined);

interface BlogProviderProps {
  children: ReactNode;
  value: Blog;
}

export const BlogProvider: React.FC<BlogProviderProps> = ({ children, value }) => {
  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlogContext must be used within a BlogProvider');
  }
  return context;
};