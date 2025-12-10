import { axiosInstance } from "./apiConfig";
import { ILoginInput, UserPayload } from "../types/auth";

export const loginApi = async (data: ILoginInput) => {
  const response = await axiosInstance.post<UserPayload>("/users/login", data);
  return response.data;
};
