import { Button, Input } from "antd";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { RouteName } from "../../../constants/route";
import useRegister from "../../../hooks/useRegister";
import EmailInput from "../../../components/Form/EmailInput";
import PasswordInput from "../../../components/Form/PasswordInput";
import { UserPayload  } from "../../../types/auth";

export default function Register() {
  const { loading, onSubmit } = useRegister();

  const { control, handleSubmit } = useForm<UserPayload>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-y-4"
    >
      {/* Username */}
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <Input {...field} placeholder="Username" />
        )}
      />

      {/* Email */}
      <EmailInput<UserPayload>
        name="email"
        control={control}
        placeholder="Email"
      />

      {/* Password */}
      <PasswordInput<UserPayload >
        name="password"
        control={control}
        placeholder="Password"
      />

      <Button loading={loading} htmlType="submit" type="primary">
        Register
      </Button>

      <Link to={RouteName.LOGIN}>Login</Link>
    </form>
  );
}
