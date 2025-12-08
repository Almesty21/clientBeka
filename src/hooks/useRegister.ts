import { useState } from "react";
import { useForm } from "react-hook-form";
//import { yupResolver } from "@hookform/resolvers/yup";
//import loginValidator from "../validators/login.validator";
import { UserPayload } from "../types/auth";
import { createUser } from "../services/user";
import { useNotificationContext } from "../contexts/NotificationContext";
import { useNavigate } from "react-router-dom";
import { RouteName } from "../constants/route";

export default function useRegister() {
  const navigate = useNavigate();
  const { showError, showSuccess } = useNotificationContext();
  const [loading, setLoading] = useState<boolean>(false);
  const { control, handleSubmit } = useForm<UserPayload>({
  // resolver: yupResolver(loginValidator),
  });

  const onSubmit = async (input: UserPayload) => {
    setLoading(true);
    const { data, error } = await createUser(input);
    if (data) {
      showSuccess("Successfully logged in");
      navigate(RouteName.DASHBOARD, { replace: true });
    } else {
      showError(error!.message);
    }
    setLoading(false);
  };

  return { handleSubmit, onSubmit, control, loading };
}
