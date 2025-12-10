import { axiosInstance } from "./apiConfig";
import { ILoginInput, ILoginResponse } from "../types/auth";


export const loginApi = async (data: ILoginInput): Promise<ILoginResponse> => {
  const response = await axiosInstance.post<ILoginResponse>("/users/login", data);
  return response.data;
};
