import { Input } from "antd";
import { Control, Controller } from "react-hook-form";
import { HTMLInputTypeAttribute } from "react";

interface IProps {
  name: string;
  label: string;
  placeholder: string;
  control: Control<any, any>;
  type: HTMLInputTypeAttribute;
}

export default function LabeledInput({
  name,
  label,
  placeholder,
  control,
  type,
}: IProps) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={""}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full">
          <label
            htmlFor={name}
            className="pl-1"
            style={{ color: "rgba(0,0,0,.7)", fontSize: ".85rem" }}
          >
            {label}
          </label>
          <Input
            id={name}
            type={type}
            className="h-auto w-full py-2 outline-none"
            {...field}
            placeholder={placeholder}
            status={error ? "error" : undefined}
          />
          <span className="text-xs text-red-500">{error?.message}</span>
        </div>
      )}
    />
  );
}
