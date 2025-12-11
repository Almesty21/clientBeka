import { axiosInstance } from "./apiConfig";
import { ILoginInput } from "../types/auth";

export const LoginUser = async (payload: ILoginInput) => {
  return axiosInstance.post("/User/login", payload);
};
