import { useState, useCallback } from 'react';
import { sendEmail } from '../services/subscribe';
import { EmailPayload, SubscriptionState } from '../types/email';

export const useSubscribe = () => {
  const [state, setState] = useState<SubscriptionState>({
    email: '',
    isLoading: false,
    status: '',
    error: null,
  });

  const handleChange = useCallback((email: string) => {
    setState(prev => ({
      ...prev,
      email,
      // Clear status when user starts typing
      status: prev.status ? '' : prev.status,
      error: null,
    }));
  }, []);

  const handleSubmit = useCallback(async (email: string) => {
    if (!email.trim()) {
      setState(prev => ({
        ...prev,
        status: '❌ Please enter a valid email address.',
        error: 'EMAIL_REQUIRED',
      }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, status: 'Submitting...' }));

    try {
      const payload: EmailPayload = {
        email: email.trim(),
        source: 'newsletter',
      };

      const response = await sendEmail(payload);
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        status: '🎉 Successfully subscribed! Welcome to the club!',
        email: '',
        error: null,
      }));

      return response;
    } catch (error: any) {
      console.error('Subscription failed:', error);
      
      const errorMessage = error.message?.includes('HTTP error')
        ? '❌ Subscription failed. Please try again later.'
        : '❌ Subscription failed. Please check your connection and try again.';

      setState(prev => ({
        ...prev,
        isLoading: false,
        status: errorMessage,
        error: error.message || 'UNKNOWN_ERROR',
      }));

      throw error;
    }
  }, []);

  const resetState = useCallback(() => {
    setState({
      email: '',
      isLoading: false,
      status: '',
      error: null,
    });
  }, []);

  return {
    ...state,
    handleChange,
    handleSubmit,
    resetState,
  };
};