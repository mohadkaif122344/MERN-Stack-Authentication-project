import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
} from "react-icons/fa";

const Signup = () => {
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/register`,
        { name, email, password },
        { withCredentials: true },
      );
      toast.success(data.message);
      navigate("/Login");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8 dark:bg-gray-950">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900 mt-12">
        <div className="px-5 pt-7 pb-5 sm:px-8 sm:pt-9">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-white">
            Sign up to get started.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-5 pb-7 sm:px-8">
          <div>
            <label className="mb-2 block text-sm font-semibold dark:text-white">
              Full Name
            </label>
            <div className="flex items-center gap-3 rounded-xl border px-4 focus-within:border-purple-500 dark:border-gray-700 dark:bg-gray-800">
              <FaUser className="text-gray-400" />
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full min-w-0 bg-transparent py-3.5 text-sm outline-none "
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold dark:text-white ">
              Email Address
            </label>
            <div className="flex items-center gap-3 rounded-xl border px-4 focus-within:border-purple-500 dark:border-gray-700 dark:bg-gray-800">
              <FaEnvelope className="text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full min-w-0 bg-transparent py-3.5 text-sm outline-none "
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold dark:text-white">
              Password
            </label>
            <div className="flex items-center gap-3 rounded-xl border px-4 focus-within:border-purple-500 dark:border-gray-700 dark:bg-gray-800">
              <FaLock className="shrink-0 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full min-w-0 bg-transparent py-3.5 text-sm outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="shrink-0 text-gray-400 hover:text-purple-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3.5 font-semibold text-white shadow-md transition hover:bg-purple-700 disabled:opacity-60"
          >
            <FaUserPlus /> {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-2 border-t px-4 py-5 text-sm text-gray-500 dark:border-gray-800">
          Already have an account?
          <button
            type="button"
            onClick={() => navigate("/Login")}
            className="font-bold text-purple-600 hover:text-purple-800 hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
