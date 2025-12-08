import { Image, Upload } from "antd";
import { Controller, Control } from "react-hook-form";
import { PlusOutlined } from "@ant-design/icons";

interface IProps {
  control: Control<any>;
  name: string;
  placeholder: string;
}

export default function ImageInput({ control, name, placeholder }: IProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={""}
      rules={{ required: true }}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full">
          <Upload
            {...field}
            beforeUpload={(_) => false}
            showUploadList={false}
            type="select"
            maxCount={1}
            accept="image/*"
            fileList={[]}
            listType="picture-card"
            className="w-full single-image-selector"
          >
            {field.value ? (
              <Image
                preview={false}
                src={URL.createObjectURL(field.value.file as any)}
                alt="Preview"
                style={{ width: "100%", height: "100%" }}
                className="w-full"
              />
            ) : (
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>{placeholder}</div>
              </button>
            )}
          </Upload>
          <p
            className="text-xs pl-1 font-normal text-left mt-1 capitalize"
            style={{ color: "red" }}
          >
            {error?.message}
          </p>
        </div>
      )}
    />
  );
}
