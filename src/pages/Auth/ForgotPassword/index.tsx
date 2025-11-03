import { Button, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { RouteName } from "constants/route";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="w-full flex h-screen justify-center items-center px-4 py-4 bg-login bg-center bg-cover bg-no-repeat">
      <div className="w-full max-w-lg sm:m-0 m-4">
        <div
          className="w-full bg-white rounded-lg overflow-clip"
          style={{ boxShadow: "0 4px 25px 0 rgba(0,0,0,.1)" }}
        >
          <div className="flex w-full flex-col items-center p-8">
            <div className="w-full flex flex-col gap-y-4">
              <h4 className="font-semibold text-lg">Recover your password</h4>
              <p className="text-base font-normal">
                Please enter your email address and we'll send you instructions
                on how to reset your password.
              </p>
            </div>
            <form
              onSubmit={(e) => {
                console.log("sldjfksdj");
              }}
              className="w-full flex flex-col gap-y-4 mt-5"
            >
              <Input
                size="large"
                className="outline-none"
                placeholder="Email"
                prefix={<UserOutlined />}
              />

              <div className="w-full flex items-center justify-between gap-6 flex-wrap">
                <Link to={RouteName.LOGIN} replace>
                  <Button
                    type="default"
                    className="py-2 px-4 rounded-md h-auto font-medium w-fit shadow-none"
                  >
                    Back To Login
                  </Button>
                </Link>
                <Button
                  htmlType="submit"
                  type="primary"
                  className="py-2 px-4 rounded-md h-auto font-medium w-fit shadow-none"
                >
                  <span className="text-white">Recover Password</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
