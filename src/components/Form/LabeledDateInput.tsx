import { DatePicker } from "antd";
import { Control, Controller } from "react-hook-form";

interface IProps {
  name: string;

  label: string;
  placeholder: string;
  control: Control<any, any>;
}

export default function LabeledDateInput({
  name,
  label,
  placeholder,
  control,
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
          <DatePicker
            id={name}
            {...field}
            placeholder={placeholder}
            status={error ? "error" : undefined}
            className="w-full"
            size="large"
          />
          <span className="text-xs text-red-500">{error?.message}</span>
        </div>
      )}
    />
  );
}
