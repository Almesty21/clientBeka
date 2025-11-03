export interface ApiResponse<T = any> {
  data: T | null;
  error: {
    message: string;
    code: string;
  } | null;
  success: boolean;
  message: string;
  statusCode: number;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'inactive' | 'banned';
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: 'admin' | 'user' | 'moderator';
}

export interface UpdateUserPayload {
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: 'admin' | 'user' | 'moderator';
  status?: 'active' | 'inactive' | 'banned';
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  status: 'active' | 'inactive' | 'out_of_stock';
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
}

export interface UpdateProductPayload {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  stock?: number;
  images?: string[];
  status?: 'active' | 'inactive' | 'out_of_stock';
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  products: OrderProduct[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: ShippingAddress;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  createdAt: string;
  updatedAt: string;
}

export interface OrderProduct {
  productId: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CreateOrderPayload {
  products: OrderProduct[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
}

export interface UpdateOrderPayload {
  status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded';
  trackingNumber?: string;
}

// Auth Types
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryPayload {
  name: string;
  description: string;
  image: string;
}

export interface UpdateCategoryPayload {
  name?: string;
  description?: string;
  image?: string;
  status?: 'active' | 'inactive';
}