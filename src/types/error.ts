export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
export interface IError {
  status: number;
  message: string;
  errors: string[];
}
