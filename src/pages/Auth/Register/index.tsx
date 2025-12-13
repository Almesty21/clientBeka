// src/pages/Auth/Register/index.tsx
import { Button, Input } from "antd";
import { Link } from "react-router-dom";
import { Controller } from "react-hook-form";
import { RouteName } from "../../../constants/route";
import useRegister from "../../../hooks/useRegister";
import EmailInput from "../../../components/Form/EmailInput";
import PasswordInput from "../../../components/Form/PasswordInput";

export default function Register() {
  const { control, handleSubmit, loading, onSubmit } = useRegister();

  return (
    <div className="w-full flex h-screen justify-center items-center px-4 py-4 bg-login bg-center bg-cover bg-no-repeat">
      <div className="w-full sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
        <div
          className="w-full bg-white rounded-lg overflow-hidden"
          style={{ boxShadow: "0 4px 25px 0 rgba(0,0,0,.1)" }}
        >
          <div className="flex w-full items-center">
            <div className="hidden lg:block lg:w-1/2">
              <img src="" alt="logo" className="w-full h-full" />
            </div>

            <div className="w-full lg:w-1/2 p-8">
              <div className="flex flex-col gap-y-2 mb-4">
                <h4 className="font-semibold text-lg">Register</h4>
                <p className="text-base font-normal">
                  Welcome, please register your account.
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-y-4"
              >
                {/* Username */}
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Username" />
                  )}
                />

                {/* Email */}
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <EmailInput {...field} placeholder="Email" />
                  )}
                />

                {/* Password */}
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <PasswordInput {...field} placeholder="Password" />
                  )}
                />

                <div className="flex justify-between items-center mt-4">
                  <Button
                    loading={loading}
                    htmlType="submit"
                    type="primary"
                    className="py-2 px-8 h-auto font-medium"
                  >
                    Register
                  </Button>

                  <div className="flex items-center gap-1">
                    <span>Already have an account?</span>
                    <Link to={RouteName.LOGIN}>
                      <Button type="link" className="text-teal-400 p-0">
                        Login
                      </Button>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
