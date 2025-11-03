import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { RegisterForm } from "../../types";


const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterForm>();

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    try {
      await axios.post("/register", data);
      alert("✅ Registered successfully!");
      reset();
    } catch (error: any) {
      alert(error.response?.data?.message || "❌ Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <input
          {...register("username", { required: "Username is required" })}
          placeholder="Username"
          className="w-full p-2 border rounded mb-2"
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}

        <input
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
          })}
          placeholder="Email"
          type="email"
          className="w-full p-2 border rounded mb-2"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Min length is 6" },
          })}
          placeholder="Password"
          type="password"
          className="w-full p-2 border rounded mb-2"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded transition"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
