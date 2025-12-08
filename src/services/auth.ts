import { postRequest } from "./api";
import { ILoginInput, ILoginResponse } from "../types/auth";


export const loginApi = (data: ILoginInput) => {
  return postRequest<ILoginResponse>("/users/login", data);
};
