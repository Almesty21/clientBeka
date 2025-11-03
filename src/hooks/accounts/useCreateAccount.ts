import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNotificationContext } from "contexts/NotificationContext";
import { useNavigate } from "react-router-dom";
import { RouteName } from "constants/route";
import { IAccountInput } from "models/account";
import createAccountValidator from "validators/createAccount.validator";
import { createAccountApi } from "api/account";

export default function useCreateAccount() {
  const navigate = useNavigate();
  const { showError, showSuccess } = useNotificationContext();
  const [loading, setLoading] = useState<boolean>(false);
  const { control, handleSubmit } = useForm<IAccountInput>({
    resolver: yupResolver(createAccountValidator),
  });

  const onSubmit = async (input: IAccountInput) => {
    setLoading(true);
    const { data, error } = await createAccountApi(input);
    if (data) {
      showSuccess("Account created Successfully");
      navigate(RouteName.ACCOUNT, { replace: true });
    } else {
      showError(error!.message);
    }
    setLoading(false);
  };

  return { handleSubmit, onSubmit, control, loading };
}
