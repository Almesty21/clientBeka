import { useState } from "react";
import { useForm } from "react-hook-form";
import { ILoginInput } from "../types/auth";
import { loginUser } from "../services/user";  // <-- updated
import { useNotificationContext } from "../contexts/NotificationContext";
import { useNavigate } from "react-router-dom";
import { RouteName } from "../constants/route";

export default function useLogin() {
  const navigate = useNavigate();
  const { showError, showSuccess } = useNotificationContext();
  const [loading, setLoading] = useState<boolean>(false);
  const { control, handleSubmit } = useForm<ILoginInput>({});

  const onSubmit = async (input: ILoginInput) => {
    setLoading(true);

    try {
      const response = await loginUser(input);  // <-- updated

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token.access_token);
        localStorage.setItem("refreshToken", response.data.token.refresh_token);

        showSuccess("Successfully logged in");
        navigate(RouteName.DASHBOARD, { replace: true });
      } else {
        showError("Invalid login response");
      }

    } catch (err: any) {
      showError(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return { handleSubmit, onSubmit, control, loading };
}
