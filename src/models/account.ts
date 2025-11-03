export interface IAccount {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  registered_by: string;
  role: string;
  image: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface IAccountInput {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
}
