import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword || !newPassword || !confirmPassword)
      return toast.error("All fields are required");

    if (newPassword !== confirmPassword)
      return toast.error("New password and confirm password do not match");

    if (newPassword.length < 6)
      return toast.error("Password must be at least 6 characters");

    try {
      setLoading(true);

      const { data } = await axios.post(
  backendUrl + "/api/auth/change-password",
  {
    currentPassword,
    newPassword,
    confirmPassword,
  },
  { withCredentials: true }
);

      if (data.success) {
        toast.success(data.message);

        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        navigate("/profile");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-gray-100 dark:bg-gray-950">
      <Link
        to="/"
        className="absolute left-5 sm:left-20 top-5 flex gap-2"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
          <img
            src={assets.logo}
            className="w-7 h-7 brightness-0 invert"
          />
        </div>

        <div className="hidden sm:block">
          <b className="text-lg text-blue-600 dark:text-purple-400">
            MyApp
          </b>
          <p className="text-[10px] text-gray-400 dark:text-gray-500">
            Simple & Secure
          </p>
        </div>
      </Link>

      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-6 text-white">
          <h1 className="text-2xl font-bold">Change Password</h1>
          <p className="text-sm text-blue-100 mt-1">
            Update your account password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Current Password
            </label>

            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
              className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-blue-500 transition"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              New Password
            </label>

            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-blue-500 transition"
            />
          </div>

          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-purple-500 transition"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              ← Back
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm hover:scale-[1.02] transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;