import { Select } from "antd";
import { Control, Controller } from "react-hook-form";
import DownIcon from "components/Icons/DownIcon";

interface IProps {
  name: string;
  options: {
    value: string;
    label: string;
  }[];
  label: string;
  placeholder: string;
  control: Control<any, any>;
  loading?: boolean;
}

export default function LabeledSelectInput({
  name,
  loading,
  label,
  placeholder,
  options,
  control,
}: IProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full">
          <label
            htmlFor={name}
            className="pl-1"
            style={{ color: "rgba(0,0,0,.7)", fontSize: ".85rem" }}
          >
            {label}
          </label>
          <Select
            id={name}
            {...field}
            loading={loading}
            placeholder={placeholder}
            status={error ? "error" : undefined}
            className="w-full text-sm"
            size="large"
            suffixIcon={
              loading ? undefined : (
                <span className="text-lg text-black">
                  <DownIcon />
                </span>
              )
            }
            options={options}
          />
          <span className="text-xs text-red-500">{error?.message}</span>
        </div>
      )}
    />
  );
}
