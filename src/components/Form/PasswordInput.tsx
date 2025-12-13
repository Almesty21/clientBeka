import { Input } from "antd";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface PasswordInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
}

export default function PasswordInput<T extends FieldValues>({
  name,
  control,
  placeholder,
}: PasswordInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input.Password {...field} placeholder={placeholder} />
      )}
    />
  );
}
