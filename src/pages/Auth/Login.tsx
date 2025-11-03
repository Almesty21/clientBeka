import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

type LoginForm = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const res = await axios.post("/api/auth/login", data);
      alert("✅ Logged in successfully!");
      localStorage.setItem("token", res.data.token); // Save JWT
    } catch (error: any) {
      alert(error.response?.data?.message || "❌ Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          {...register("email", { required: "Email is required" })}
          placeholder="Email"
          name="email"
          className="w-full p-2 border rounded mb-2"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
          {...register("password", { required: "Password is required" })}
          placeholder="Password"
          name="password"
          className="w-full p-2 border rounded mb-2"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded transition"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
