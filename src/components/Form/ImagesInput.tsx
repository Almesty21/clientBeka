import { Upload } from "antd";
import { Controller, Control } from "react-hook-form";
import { PlusOutlined } from "@ant-design/icons";

interface IProps {
  control: Control<any>;
  name: string;
  placeholder: string;
}

export default function ImagesInput({ control, name, placeholder }: IProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={""}
      rules={{ required: true }}
      render={({ field, fieldState: { error } }) => {
        return (
          <div className="w-full">
            <Upload
              {...field}
              beforeUpload={(_) => false}
              type="select"
              accept="image/*"
              fileList={field.value?.fileList}
              listType="picture-card"
              className="w-full multiple-images-selector min-w-40"
              rootClassName="min-w-40"
            >
              <button
                style={{ border: 0, background: "none" }}
                type="button"
                className="min-w-40"
              >
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>{placeholder}</div>
              </button>
            </Upload>
            <p
              className="text-xs pl-1 font-normal text-left mt-1 capitalize"
              style={{ color: "red" }}
            >
              {error?.message}
            </p>
          </div>
        );
      }}
    />
  );
}
