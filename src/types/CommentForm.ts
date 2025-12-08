// src/types/blog.ts

export interface CommentFormData {
  author: string;
  content: string;
  parentId?: string; // For nested replies
  mentions?: string[]; // For @mentions
}

export interface Comment {
  _id: string;
  author: string;
  authorId?: string; // Link to user account if available
  content: string;
  createdAt: string;
  updatedAt?: string;
  editedAt?: string; // When comment was last edited
  likes: number;
  dislikes: number;
  isEdited?: boolean;
  isVerified?: boolean; // If author is verified
  avatar?: string; // Author avatar URL
  parentId?: string; // For nested comments (replies)
  replies?: Comment[]; // Nested replies
  // Social media features
  userReaction?: 'like' | 'dislike' | null; // Current user's reaction
  replyCount?: number; // Number of replies
  isPinned?: boolean; // Pinned comments
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  authorId?: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  likes: number;
  featuredImage?: string;
  excerpt?: string;
  // Additional social media fields
  commentCount?: number;
  likeCount?: number;
  shareCount?: number;
  isPublished?: boolean;
  readTime?: number; // in minutes
}

export interface CreateBlogPayload {
  title: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  excerpt?: string;
}

export interface UpdateBlogPayload {
  title?: string;
  content?: string;
  category?: string;
  tags?: string[];
  featuredImage?: string;
  excerpt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  statusCode?: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  message?: string;
}

// Additional types for enhanced comment system
export interface CommentReaction {
  commentId: string;
  userId: string;
  reaction: 'like' | 'dislike';
  createdAt: string;
}

export interface CommentFilters {
  sortBy?: 'newest' | 'oldest' | 'popular';
  includeReplies?: boolean;
  page?: number;
  limit?: number;
}

export interface CommentStats {
  totalComments: number;
  totalLikes: number;
  totalReplies: number;
  userCommentCount?: number;
}