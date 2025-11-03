// src/services/blogService.ts
import { axiosInstance } from "./apiConfig";
import { 
  Blog, 
  CreateBlogPayload, 
  UpdateBlogPayload,
  ApiResponse,
  PaginatedResponse,
  Comment,
  CreateCommentPayload
} from "../models/blog";

export const blogService = {
  // Create a new blog
  async createBlog(payload: CreateBlogPayload): Promise<ApiResponse<Blog>> {
    try {
      console.log("📝 Creating blog:", payload);
      
      const response = await axiosInstance.post(`/Blog`, payload);
      
      console.log("🔍 Blog creation response:", {
        status: response.status,
        data: response.data
      });
      
      // Handle different response formats
      if (response.data && typeof response.data === 'object') {
        if ('success' in response.data) {
          return response.data;
        }
        
        return {
          data: response.data,
          error: null,
          success: true,
          message: 'Blog created successfully',
          statusCode: response.status
        };
      }
      
      return {
        data: null,
        error: null,
        success: true,
        message: 'Blog created successfully',
        statusCode: response.status
      };
      
    } catch (error: any) {
      console.error("❌ Create blog failed:", {
        message: error.message,
        responseStatus: error.response?.status,
        responseData: error.response?.data
      });
      
      let errorMessage = "Failed to create blog";
      
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data.error) {
          errorMessage = error.response.data.error;
        }
      }
      
      return {
        data: null,
        error: {
          message: errorMessage,
          code: error.response?.status?.toString() || 'NETWORK_ERROR'
        },
        success: false,
        statusCode: error.response?.status || 0,
        message: errorMessage
      };
    }
  },

  // Get all blogs with pagination and filtering
  async getBlogs(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
  }): Promise<PaginatedResponse<Blog[]>> {
    try {
      console.log("📚 Fetching blogs with params:", params);
      
      const response = await axiosInstance.get(`/Blog`, { params });
      
      console.log("🔍 Blogs fetch response:", {
        status: response.status,
        data: response.data
      });
      
      if (response.data && typeof response.data === 'object') {
        if ('success' in response.data) {
          return response.data;
        }
        
        return {
          data: response.data,
          error: null,
          success: true,
          message: 'Blogs fetched successfully',
          statusCode: response.status,
          pagination: {
            page: params?.page || 1,
            limit: params?.limit || 10,
            total: Array.isArray(response.data) ? response.data.length : 0,
            totalPages: 1
          }
        };
      }
      
      return {
        data: [],
        error: null,
        success: true,
        message: 'Blogs fetched successfully',
        statusCode: response.status,
        pagination: {
          page: params?.page || 1,
          limit: params?.limit || 10,
          total: 0,
          totalPages: 0
        }
      };
      
    } catch (error: any) {
      console.error("❌ Get blogs failed:", error.message);
      
      let errorMessage = "Failed to fetch blogs";
      
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }
      
      return {
        data: [],
        error: {
          message: errorMessage,
          code: error.response?.status?.toString() || 'NETWORK_ERROR'
        },
        success: false,
        statusCode: error.response?.status || 0,
        message: errorMessage,
        pagination: {
          page: params?.page || 1,
          limit: params?.limit || 10,
          total: 0,
          totalPages: 0
        }
      };
    }
  },

  // Get single blog by ID
  async getBlogById(id: string): Promise<ApiResponse<Blog>> {
    try {
      console.log("📖 Fetching blog:", id);
      
      const response = await axiosInstance.get(`/Blog/${id}`);
      
      console.log("🔍 Blog fetch response:", {
        status: response.status,
        data: response.data
      });
      
      if (response.data && typeof response.data === 'object') {
        if ('success' in response.data) {
          return response.data;
        }
        
        return {
          data: response.data,
          error: null,
          success: true,
          message: 'Blog fetched successfully',
          statusCode: response.status
        };
      }
      
      return {
        data: null,
        error: null,
        success: true,
        message: 'Blog fetched successfully',
        statusCode: response.status
      };
      
    } catch (error: any) {
      console.error("❌ Get blog failed:", error.message);
      
      let errorMessage = "Failed to fetch blog";
      
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }
      
      return {
        data: null,
        error: {
          message: errorMessage,
          code: error.response?.status?.toString() || 'NETWORK_ERROR'
        },
        success: false,
        statusCode: error.response?.status || 0,
        message: errorMessage
      };
    }
  },

  // Update blog
  async updateBlog(id: string, payload: UpdateBlogPayload): Promise<ApiResponse<Blog>> {
    try {
      console.log("✏️ Updating blog:", { id, payload });
      
      const response = await axiosInstance.put(`/Blog/${id}`, payload);
      
      console.log("🔍 Blog update response:", {
        status: response.status,
        data: response.data
      });
      
      if (response.data && typeof response.data === 'object') {
        if ('success' in response.data) {
          return response.data;
        }
        
        return {
          data: response.data,
          error: null,
          success: true,
          message: 'Blog updated successfully',
          statusCode: response.status
        };
      }
      
      return {
        data: null,
        error: null,
        success: true,
        message: 'Blog updated successfully',
        statusCode: response.status
      };
      
    } catch (error: any) {
      console.error("❌ Update blog failed:", error.message);
      
      let errorMessage = "Failed to update blog";
      
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }
      
      return {
        data: null,
        error: {
          message: errorMessage,
          code: error.response?.status?.toString() || 'NETWORK_ERROR'
        },
        success: false,
        statusCode: error.response?.status || 0,
        message: errorMessage
      };
    }
  },

  // Delete blog
  async deleteBlog(id: string): Promise<ApiResponse<void>> {
    try {
      console.log("🗑️ Deleting blog:", id);
      
      const response = await axiosInstance.delete(`/Blog/${id}`);
      
      console.log("🔍 Blog delete response:", {
        status: response.status,
        data: response.data
      });
      
      if (response.data && typeof response.data === 'object') {
        if ('success' in response.data) {
          return response.data;
        }
      }
      
      return {
        data: null,
        error: null,
        success: true,
        message: 'Blog deleted successfully',
        statusCode: response.status
      };
      
    } catch (error: any) {
      console.error("❌ Delete blog failed:", error.message);
      
      let errorMessage = "Failed to delete blog";
      
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }
      
      return {
        data: null,
        error: {
          message: errorMessage,
          code: error.response?.status?.toString() || 'NETWORK_ERROR'
        },
        success: false,
        statusCode: error.response?.status || 0,
        message: errorMessage
      };
    }
  },

  // Get comments for a blog
  async getComments(blogId: string): Promise<ApiResponse<Comment[]>> {
    try {
      console.log("💬 Fetching comments for blog:", blogId);
      
      const response = await axiosInstance.get(`/Blog/${blogId}/comments`);
      
      console.log("🔍 Comments fetch response:", {
        status: response.status,
        data: response.data
      });
      
      if (response.data && typeof response.data === 'object') {
        if ('success' in response.data) {
          return response.data;
        }
        
        return {
          data: response.data,
          error: null,
          success: true,
          message: 'Comments fetched successfully',
          statusCode: response.status
        };
      }
      
      return {
        data: [],
        error: null,
        success: true,
        message: 'Comments fetched successfully',
        statusCode: response.status
      };
      
    } catch (error: any) {
      console.error("❌ Get comments failed:", error.message);
      
      let errorMessage = "Failed to fetch comments";
      
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }
      
      return {
        data: [],
        error: {
          message: errorMessage,
          code: error.response?.status?.toString() || 'NETWORK_ERROR'
        },
        success: false,
        statusCode: error.response?.status || 0,
        message: errorMessage
      };
    }
  },

  // Create comment
  async createComment(payload: CreateCommentPayload): Promise<ApiResponse<Comment>> {
    try {
      console.log("💬 Creating comment:", payload);
      
      const response = await axiosInstance.post(`/Comment`, payload);
      
      console.log("🔍 Comment creation response:", {
        status: response.status,
        data: response.data
      });
      
      if (response.data && typeof response.data === 'object') {
        if ('success' in response.data) {
          return response.data;
        }
        
        return {
          data: response.data,
          error: null,
          success: true,
          message: 'Comment created successfully',
          statusCode: response.status
        };
      }
      
      return {
        data: null,
        error: null,
        success: true,
        message: 'Comment created successfully',
        statusCode: response.status
      };
      
    } catch (error: any) {
      console.error("❌ Create comment failed:", error.message);
      
      let errorMessage = "Failed to create comment";
      
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }
      
      return {
        data: null,
        error: {
          message: errorMessage,
          code: error.response?.status?.toString() || 'NETWORK_ERROR'
        },
        success: false,
        statusCode: error.response?.status || 0,
        message: errorMessage
      };
    }
  },

  // Like blog
  async likeBlog(blogId: string): Promise<ApiResponse<{ likes: number }>> {
    try {
      console.log("👍 Liking blog:", blogId);
      
      const response = await axiosInstance.post(`/Blog/${blogId}/like`);
      
      console.log("🔍 Blog like response:", {
        status: response.status,
        data: response.data
      });
      
      if (response.data && typeof response.data === 'object') {
        if ('success' in response.data) {
          return response.data;
        }
        
        return {
          data: response.data,
          error: null,
          success: true,
          message: 'Blog liked successfully',
          statusCode: response.status
        };
      }
      
      return {
        data: { likes: 0 },
        error: null,
        success: true,
        message: 'Blog liked successfully',
        statusCode: response.status
      };
      
    } catch (error: any) {
      console.error("❌ Like blog failed:", error.message);
      
      let errorMessage = "Failed to like blog";
      
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }
      
      return {
        data: null,
        error: {
          message: errorMessage,
          code: error.response?.status?.toString() || 'NETWORK_ERROR'
        },
        success: false,
        statusCode: error.response?.status || 0,
        message: errorMessage
      };
    }
  },

  // Like comment
  async likeComment(commentId: string): Promise<ApiResponse<{ likes: number }>> {
    try {
      console.log("👍 Liking comment:", commentId);
      
      const response = await axiosInstance.post(`/Comment/${commentId}/like`);
      
      console.log("🔍 Comment like response:", {
        status: response.status,
        data: response.data
      });
      
      if (response.data && typeof response.data === 'object') {
        if ('success' in response.data) {
          return response.data;
        }
        
        return {
          data: response.data,
          error: null,
          success: true,
          message: 'Comment liked successfully',
          statusCode: response.status
        };
      }
      
      return {
        data: { likes: 0 },
        error: null,
        success: true,
        message: 'Comment liked successfully',
        statusCode: response.status
      };
      
    } catch (error: any) {
      console.error("❌ Like comment failed:", error.message);
      
      let errorMessage = "Failed to like comment";
      
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }
      
      return {
        data: null,
        error: {
          message: errorMessage,
          code: error.response?.status?.toString() || 'NETWORK_ERROR'
        },
        success: false,
        statusCode: error.response?.status || 0,
        message: errorMessage
      };
    }
  }
};