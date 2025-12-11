// src/models/blog.ts
export interface Author {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  bio?: string;
  createdAt?: string;
}
export interface Comment {
  id: string;
  blogId: string;
  userId: string;
  username: string;
  avatar?: string;
  content: string;
  likes: number;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateCommentPayload {
  blogId: string;
  userId: string;
  content: string;
  author: string;
  parentId?: string | null;
}
export interface LikeCommentResponse {
  id: string;
  likes: number;
}


export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: Author | null;
  image?: string;
  tags: string[];
  likes: number;
  commentsCount: number;
  views: number;
  readTime: number;
  createdAt: string;
  updatedAt: string;
  userReaction?: string;
  isPublished?: boolean;
}

export interface commentPayload {
  id: string;
  content: string;
  author: {
    name: string;
    avatar?: string | null;
    id?: string;
  };
  likes: number;
  userReaction?: string;
  createdAt: string;
  updatedAt?: string;
  blogId?: string;
  replies?: Comment[];
  parentId?: string | null;
}

export interface CreateBlogPayload {
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  tags?: string[];
  image?: string;
  isPublished?: boolean;
}

export interface UpdateBlogPayload extends Partial<CreateBlogPayload> {
  id: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: {
    message: string;
    code: string;
  } | null;
  success: boolean;
  message?: string;
  statusCode?: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext?: boolean;
    hasPrev?: boolean;
  };
}

export interface BlogFilters {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  authorId?: string;
  tags?: string[];
}
