import { Input } from "antd";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface EmailInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
}

export default function EmailInput<T extends FieldValues>({
  name,
  control,
  placeholder,
}: EmailInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input {...field} type="email" placeholder={placeholder} />
      )}
    />
  );
}
