import { Input } from "antd";
import { Control, Controller } from "react-hook-form";
import { UserOutlined } from "@ant-design/icons";

interface IProps {
  name: string;
  placeholder: string;
  control: Control<any, any>;
}

export default function EmailInput({ name, placeholder, control }: IProps) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={""}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full">
          <Input
            type="email"
            {...field}
            status={error ? "error" : undefined}
            size="large"
            className="outline-none"
            placeholder={placeholder}
            prefix={<UserOutlined />}
          />
          <span className="text-xs text-red-500">{error?.message}</span>
        </div>
      )}
    />
  );
}
