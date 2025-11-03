import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNotificationContext } from "contexts/NotificationContext";
import { useNavigate, useParams } from "react-router-dom";
import { RouteName } from "constants/route";
import { IAccountInput } from "models/account";
import createAccountValidator from "validators/createAccount.validator";
import { fetchAccountByIdApi, updateAccountApi } from "api/account";
import { ILoadingWithPage } from "models";

export default function useEditAccount() {
  const id: string = useParams().id!;
  const navigate = useNavigate();
  const { showError, showSuccess } = useNotificationContext();
  const [loading, setLoading] = useState<ILoadingWithPage>({
    button: false,
    page: true,
  });
  const { control, handleSubmit, setValue } = useForm<IAccountInput>({
    resolver: yupResolver(createAccountValidator),
  });

  useEffect(() => {
    fetchAccountByIdApi(id).then(({ data, error }) => {
      if (data) {
        setValue("email", data.email);
        setValue("last_name", data.last_name);
        setValue("first_name", data.first_name);
        setValue("phone", data.phone);
        setValue("role", data.role);
        setLoading({ button: false, page: false });
      } else showError(error!.message);
    });
    // eslint-disable-next-line
  }, [id]);

  const onSubmit = async (input: IAccountInput) => {
    setLoading({ button: true, page: false });
    const { data, error } = await updateAccountApi(id, input);
    if (data) {
      showSuccess("Account updated Successfully");
      navigate(RouteName.ACCOUNT, { replace: true });
    } else {
      showError(error!.message);
    }
    setLoading({ button: false, page: false });
  };

  return { handleSubmit, onSubmit, control, loading };
}
