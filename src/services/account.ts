import { IPaginatedResponse } from "../models";
import { IAccount, IAccountInput } from "../models/account";

export const accountsApi = (page: number, perPage: number, search: string) => {
  return authorizeGetRequest<IPaginatedResponse<IAccount>>(
    `users?page=${page}&per_page=${perPage}&query=${search}`
  );
};

export const banAccountApi = (id: string) => {
  return authorizePatchRequest<IAccount>(`accounts/${id}/ban`, {});
};

export const activateAccountApi = (id: string) => {
  return authorizePatchRequest<IAccount>(`accounts/${id}/activate`, {});
};

export const createAccountApi = (data: IAccountInput) => {
  return authorizePostRequest<IAccount>("accounts", data);
};

export const fetchAccountByIdApi = (id: string) => {
  return authorizeGetRequest<IAccount>(`users/${id}`);
};
export const fetchAccountAllApi = () => {
  return authorizeGetRequest<IAccount>(`users`);
};
export const updateAccountApi = (id: string, data: IAccountInput) => {
  return authorizePatchRequest<IAccount>(`accounts/${id}`, data);
};
