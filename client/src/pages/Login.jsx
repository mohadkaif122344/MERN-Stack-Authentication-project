import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

const Login = () => {
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${backendUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true },
      );
      toast.success(data.message);
      setIsLoggedin(true);
      await getUserData();
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8 dark:bg-gray-950">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900 mt-10">
        <div className="p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="mb-6 mt-2 text-sm text-gray-500">Login to continue</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold dark:text-gray-200">
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
                  className="w-full min-w-0 bg-transparent py-3.5 text-gray-900 outline-none dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold dark:text-gray-200">
                Password
              </label>
              <div className="flex items-center gap-3 rounded-xl border px-4 focus-within:border-purple-500 dark:border-gray-700 dark:bg-gray-800">
                <FaLock className="text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full min-w-0 bg-transparent py-3.5 text-gray-900 outline-none dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-purple-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3.5 font-semibold text-white hover:bg-purple-700 disabled:opacity-60"
            >
              <FaSignInAlt /> {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 border-t px-4 py-5 text-sm text-gray-500 dark:border-gray-800">
          Don't have an account?
          <button
            onClick={() => navigate("/Sign-up")}
            className="flex items-center gap-1 font-semibold text-purple-600"
          >
            <FaUserPlus /> Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
