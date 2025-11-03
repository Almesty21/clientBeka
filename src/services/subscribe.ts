// newsletterService.ts
import { axiosInstance } from './apiConfig';

export interface SubscribePayload {
  email: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ✅ Send email / subscribe
export const sendEmail = async (payload: SubscribePayload): Promise<ApiResponse<SubscribePayload>> => {
  try {
    const response = await axiosInstance.post<ApiResponse<SubscribePayload>>('/subscribes', payload);
    return response.data;
  } catch (error: any) {
    console.error('Error creating subscribe:', error);
    throw new Error(error.response?.data?.message || 'Failed to subscribe');
  }
};

// ✅ Get all subscribes
export const GetSubscribes = async (): Promise<ApiResponse<SubscribePayload[]>> => {
  try {
    const response = await axiosInstance.get<ApiResponse<SubscribePayload[]>>('/subscribes');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching subscribes:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch subscribes');
  }
};
