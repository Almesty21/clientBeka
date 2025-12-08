import { Checkbox } from "antd";
import { Control, Controller } from "react-hook-form";

interface IProps {
  name: string;
  title: string;
  control: Control<any, any>;
}

export default function CheckboxInput({ name, title, control }: IProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full">
          <Checkbox {...field} checked={field.value}>
            <span
              className="pl-1"
              style={{ color: "rgba(0,0,0,.7)", fontSize: ".85rem" }}
            >
              {title}
            </span>
          </Checkbox>
          <span className="text-xs text-red-500">{error?.message}</span>
        </div>
      )}
    />
  );
}
