// src/types/index.d.ts

// ✅ User registration form
export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  role?: "user" | "superadmin"; // optional, default "user"
}

// ✅ User login form
export interface LoginForm {
  email: string;
  password: string;
}

// ✅ Product model (for super admin)
export interface Product {
  id: number;
  title: string;
  description: string;
  createdBy: string;
}
export interface ContactForm {
  name: string;
  email: string;
  message: string;
}
export interface WorkExperience {
  role: string;
  company: string;
  duration: string;
  responsibilities: string[];
}

export interface Bio  {
  name: string;
  intro: string;
  blogLink: string;
}
export interface ProductPayload {
  _id:string;
  title: string;
  description: string;
  image?: string;
  price?: number;
  link?: string;
  downloadLink?: string;
  createdAt?:Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}