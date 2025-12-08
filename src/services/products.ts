import { axiosInstance } from './apiConfig';
import { ApiResponse, ProductPayload } from '../types';


const BASE_URL = '/Ai';

// Enhanced error handler
const handleApiError = (error: any): never => {
  console.error('API Error Details:', {
    status: error.response?.status,
    data: error.response?.data,
    message: error.message
  });

  if (error.response?.data?.message) {
    throw new Error(error.response.data.message);
  }
  
  if (error.response?.status === 404) {
    throw new Error('API endpoint not found. Please check the server URL.');
  }
  
  if (error.response?.status === 500) {
    throw new Error('Server error. Please try again later.');
  }
  
  if (error.code === 'NETWORK_ERROR') {
    throw new Error('Network error. Please check your connection.');
  }

  throw new Error(error.message || 'An unexpected error occurred');
};

// ✅ Get all products with better error handling
export const GetProducts = async (filters?: Record<string, any>): Promise<ApiResponse<ProductPayload[]>> => {
  try {
    console.log('Fetching products from:', BASE_URL);
    const response = await axiosInstance.get<ApiResponse<ProductPayload[]>>(BASE_URL, { 
      params: filters,
      timeout: 10000 // 10 second timeout
    });
    
    console.log('API Response:', response.data);
    return response.data;
  } catch (error: any) {
    throw handleApiError(error);
  }
};

// ✅ Add a new product
export const AddProduct = async (payload: ProductPayload): Promise<ApiResponse<ProductPayload>> => {
  try {
    const response = await axiosInstance.post<ApiResponse<ProductPayload>>(BASE_URL, payload);
    return response.data;
  } catch (error: any) {
    throw handleApiError(error);
  }
};

// ✅ Get product by ID
export const GetProductById = async (id: string): Promise<ApiResponse<ProductPayload>> => {
  try {
    const response = await axiosInstance.get<ApiResponse<ProductPayload>>(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    throw handleApiError(error);
  }
};

// ✅ Edit a product
export const EditProduct = async (id: string, payload: Partial<ProductPayload>): Promise<ApiResponse<ProductPayload>> => {
  try {
    const response = await axiosInstance.put<ApiResponse<ProductPayload>>(`${BASE_URL}/${id}`, payload);
    return response.data;
  } catch (error: any) {
    throw handleApiError(error);
  }
};

// ✅ Delete a product
export const DeleteProduct = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const response = await axiosInstance.delete<ApiResponse<null>>(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    throw handleApiError(error);
  }
};