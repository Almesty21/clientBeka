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
          className="w-full bg-white rounded-lg overflow-clip"
          style={{ boxShadow: "0 4px 25px 0 rgba(0,0,0,.1)" }}
        >
          <div className="flex w-full items-center">
            <div className="hidden lg:block lg:w-1/2">
              <img src="" alt="logo" className="w-full h-full" />
            </div>
            <div className="w-full lg:w-1/2 p-8">
              <div className="w-full flex flex-col gap-y-4">
                <h4 className="font-semibold text-lg">Register</h4>
                <p className="text-base font-normal">
                  Welcome back, please Register to your account.
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-y-4 mt-5">
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

                <div className="w-full">
                  <Button
                    loading={loading}
                    htmlType="submit"
                    type="primary"
                    className="py-2 px-8 rounded-md float-left h-auto font-medium w-fit shadow-none"
                  >
                    Register
                  </Button>
                  <p className="footer-text float-right pt-6">
                    Already have an account? 
                    <Link to={RouteName.LOGIN}>
                      <Button type="link" className="top-2.5 w-fit float-right text-teal-400">
                        Login
                      </Button>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
