export interface EmailPayload {
  email: string;
  name?: string;
  source?: string;
}

export interface SubscribeResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface SubscriptionState {
  email: string;
  isLoading: boolean;
  status: string;
  error: string | null;
}