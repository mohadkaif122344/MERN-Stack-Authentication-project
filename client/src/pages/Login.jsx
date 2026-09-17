import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
const Login = () => {

  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);
  const navigate = useNavigate();
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (state === "Sign Up") {
        const { data } = await axios.post(
          backendUrl + "/api/auth/register",
          {
            name,
            email,
            password,
          },
          {
            withCredentials: true,
          },
        );

        if (data.success) {
          toast.success(data.message);
          setIsLoggedin(true);
          await getUserData();
          setState("Login");
         
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          backendUrl + "/api/auth/login",
          {
            email,
            password,
          },
          {
            withCredentials: true,
          },
        );
        if (data.success) {
          toast.success(data.message);
          setIsLoggedin(true);
          await getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-200 rounded-3xl shadow-xl overflow-hidden">
          <div className="px-7 pt-7 pb-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {state === "Login" ? "Welcome back" : "Create your account"}
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              {state === "Login"
                ? "Login to continue"
                : "Create your account to get started."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-7 pb-7">
            {state === "Sign Up" && (
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>

                <div className="relative">
                  <img
                    src={assets.person_icon}
                    alt=""
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition"
                  />
                </div>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <img
                  src={assets.mail_icon}
                  alt=""
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">
                <img
                  src={assets.lock_icon}
                  alt=""
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                >
                  👁
                </button>
              </div>
            </div>

            {state === "Login" && (
              <div className="flex justify-start mb-5">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-md hover:scale-[1.02] hover:shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? "Please wait..."
                : state === "Login"
                  ? "Login"
                  : "Create Account"}
            </button>
          </form>

          <div className="border-t border-gray-100 px-7 py-5 text-center">
            {state === "Login" ? (
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setState("Sign Up")}
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Create account
                </button>
              </p>
            ) : (
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setState("Login")}
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
