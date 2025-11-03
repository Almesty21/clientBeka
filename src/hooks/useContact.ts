// src/hooks/useContact.ts
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ContactPayload, ApiResponse, ContactResponse } from "../models/contact";
import { CreateContact } from "../services/contact";

export const useContactReg = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const formMethods = useForm<ContactPayload>({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
    mode: 'onChange'
  });

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const extractErrorMessage = (response: ApiResponse<ContactResponse>): string => {
    console.log('🔍 Extracting error message from:', response);
    
    // Check error object first
    if (response.error?.message) {
      return response.error.message;
    }
    
    // Check message field
    if (response.message) {
      return response.message;
    }
    
    // Check status code for common errors
    if (response.statusCode === 500) {
      return 'Server error. Please try again later.';
    }
    
    if (response.statusCode === 400) {
      return 'Invalid data. Please check your input.';
    }
    
    if (response.statusCode === 404) {
      return 'Service not found. Please contact support.';
    }
    
    if (response.statusCode === 401 || response.statusCode === 403) {
      return 'Authentication failed. Please try again.';
    }
    
    // Check if there's any data that might contain error information
    if (response.data && typeof response.data === 'object') {
      const data = response.data as any;
      if (data.error) return data.error;
      if (data.message) return data.message;
    }
    
    // Default fallback
    return 'Failed to send message. Please try again.';
  };

  const onSubmit = async (data: ContactPayload) => {
    setLoading(true);
    clearMessages();
    console.log('🎯 Form submission started:', data);
    
    try {
      // Client-side validation
      if (!data.name?.trim() || !data.email?.trim() || !data.subject?.trim() || !data.message?.trim()) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      console.log('📤 Calling CreateContact service...');
      const response: ApiResponse<ContactResponse> = await CreateContact(data);
      
      console.log('📥 Complete service response:', response);
      
      // Handle successful response
      if (response.success) {
        const successMessage = response.message || 'Message sent successfully!';
        setSuccess(successMessage);
        console.log('✅ Success:', successMessage);
        formMethods.reset();
      } else {
        // Extract meaningful error message
        const errorMessage = extractErrorMessage(response);
        setError(errorMessage);
        console.error('❌ API returned error. Full response:', response);
      }
    } catch (err: any) {
      // Handle thrown errors from service
      console.error('💥 Service threw error:', err);
      const errorMessage = err.message || 'An unexpected error occurred. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    ...formMethods,
    onSubmit,
    loading,
    error,
    success,
    clearMessages
  };
};