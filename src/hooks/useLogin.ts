import { useState } from "react";
import { useForm } from "react-hook-form";
//import { yupResolver } from "@hookform/resolvers/yup";
//import loginValidator from "../validators/login.validator";
import { ILoginInput } from "../types/auth";
import { GetUserById } from "../services/user";
import { useNotificationContext } from "../contexts/NotificationContext";
import { useNavigate } from "react-router-dom";
import { RouteName } from "../constants/route";

export default function useLogin() {
  const navigate = useNavigate();
  const { showError, showSuccess } = useNotificationContext();
  const [loading, setLoading] = useState<boolean>(false);
  const { control, handleSubmit } = useForm<ILoginInput>({
   // resolver: yupResolver(loginValidator),
  });

  const onSubmit = async (input: ILoginInput) => {
    setLoading(true);
    const { data, error } = await GetUserById(input);
    if (data) {
      localStorage.setItem("token", data.token.access_token);
      localStorage.setItem("refreshToken", data.token.refresh_token);
      showSuccess("Successfully logged in");
      navigate(RouteName.DASHBOARD, { replace: true });
    } else {
      showError(error!.message);
    }
    setLoading(false);
  };

  return { handleSubmit, onSubmit, control, loading };
}
