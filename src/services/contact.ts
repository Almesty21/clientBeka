// src/services/contact.ts
import { axiosInstance } from "./apiConfig";
import { ContactPayload, ApiResponse, ContactResponse } from "../types/contact";

export const CreateContact = async (
  payload: ContactPayload
): Promise<ApiResponse<ContactResponse>> => {
  try {
    console.log("📨 Sending contact data:", payload);
    
    const response = await axiosInstance.post(
      `/Contact`,
      payload
    );
    
    console.log("🔍 Raw API Response:", {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data,
      dataType: typeof response.data
    });
    
    // Handle different response formats
    if (response.data && typeof response.data === 'object') {
      // If backend returns our expected format
      if ('success' in response.data) {
        return response.data;
      }
      
      // If backend returns just the contact object
      return {
        data: response.data,
        error: null,
        success: true,
        message: 'Message sent successfully',
        statusCode: response.status
      };
    }
    
    // If backend returns simple success
    return {
      data: null,
      error: null,
      success: true,
      message: 'Message sent successfully',
      statusCode: response.status
    };
    
  } catch (error: any) {
    console.error("❌ Create contact failed - Complete error details:", {
      message: error.message,
      code: error.code,
      responseExists: !!error.response,
      responseStatus: error.response?.status,
      responseData: error.response?.data,
      responseDataType: typeof error.response?.data,
      requestExists: !!error.request
    });
    
    let errorMessage = "Failed to create contact";
    
    // Extract error message from different possible locations
    if (error.response?.data) {
      console.log('🔍 Examining response data structure:', error.response.data);
      
      if (typeof error.response.data === 'string') {
        errorMessage = error.response.data;
      } else if (error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.response.data.error) {
        errorMessage = error.response.data.error;
      } else if (error.response.data.details) {
        errorMessage = error.response.data.details;
      } else if (Array.isArray(error.response.data)) {
        errorMessage = error.response.data.join(', ');
      } else {
        // Show the entire response data if we can't extract a message
        errorMessage = JSON.stringify(error.response.data);
      }
    } else if (error.request) {
      errorMessage = "No response received from server. Please check if the backend is running.";
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    // Create a proper error response
    const errorResponse: ApiResponse<ContactResponse> = {
      data: null,
      error: {
        message: errorMessage,
        code: error.response?.status?.toString() || 'NETWORK_ERROR',
        details: error.response?.data
      },
      success: false,
      statusCode: error.response?.status || 0,
      message: errorMessage
    };
    
    return errorResponse;
  }
};
