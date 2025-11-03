import { Button } from "antd";
import { Link } from "react-router-dom";
import { RouteName } from "../../../constants/route";
import useLogin from "../../../hooks/useLogin";
import EmailInput from "../../../components/Form/EmailInput";
import PasswordInput from "../../../components/Form/PasswordInput";

export default function Login() {
  const { control, handleSubmit, loading, onSubmit } = useLogin();
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
                <h4 className="font-semibold text-lg">Login</h4>
                <p className="text-base font-normal">
                  Welcome back, please login to your account.
                </p>
              </div>
              <form
                // onSubmit={(e) => {
                //   console.log("sldjfksdj");
                // }}
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-y-4 mt-5"
              >
                <EmailInput
                  control={control}
                  name="email"
                  placeholder="Email"
                />
                <PasswordInput
                  control={control}
                  name="password"
                  placeholder="Password"
                />
                <Link to={RouteName.FORGOT_PASSWORD}>
                  <Button type="link" className="w-fit text-black">
                    Forgot Password?
                  </Button>
                </Link>
                <div className="w-full">
        
                  <Button
                    loading={loading}
                    htmlType="submit"
                    type="primary"
                    className="py-2 px-8 rounded-md float-left h-auto font-medium w-fit shadow-none"
                  >
                    Login
                  </Button>
                           <p className="footer-text float-right pt-6">
                   Don't have an account?
                 <Link to={RouteName.REGISTER}>
                      <Button type="link" className="w-fit float-right pt-5 text-teal-400">
                        Register Now
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
