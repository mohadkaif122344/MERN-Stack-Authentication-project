
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { FaLock, FaArrowLeft, FaKey, FaSave } from "react-icons/fa";

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (newPassword !== confirmPassword)
    return toast.error("Passwords don't match");

  try {
    setLoading(true);

    const { data } = await axios.post(
      `${backendUrl}/api/auth/change-password`,
      { currentPassword, newPassword, confirmPassword },
      { withCredentials: true }
    );

    toast.success(data.message);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    navigate("/profile");
  } catch (error) {
    toast.error(error.response?.data?.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="mt-8 flex min-h-screen items-center justify-center bg-gray-100 px-4 py-4 dark:bg-gray-950">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900">
        <div className="bg-purple-700 p-5 text-white sm:p-6">
          <FaLock className="mb-3 text-3xl" />
          <h1 className="text-2xl font-bold">Change Password</h1>
          <p className="mt-1 text-sm text-purple-100">
            Secure your account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-5 sm:p-6"
        >
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Current Password
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-300 px-3 focus-within:border-purple-500 dark:border-gray-700 dark:bg-gray-800">
              <FaLock className="text-gray-400" />

              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                autoComplete="current-password"
                required
                className="w-full min-w-0 bg-transparent py-3 text-gray-900 outline-none dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              New Password
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-300 px-3 focus-within:border-purple-500 dark:border-gray-700 dark:bg-gray-800">
              <FaKey className="text-gray-400" />

              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                autoComplete="new-password"
                required
                className="w-full min-w-0 bg-transparent py-3 text-gray-900 outline-none dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-300 px-3 focus-within:border-purple-500 dark:border-gray-700 dark:bg-gray-800">
              <FaKey className="text-gray-400" />

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Enter confirm password"
                autoComplete="new-password"
                required
                className="w-full min-w-0 bg-transparent py-3 text-gray-900 outline-none dark:text-white"
              />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border p-3 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
            >
              <FaArrowLeft /> Back
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-purple-700 p-3 font-semibold text-white hover:bg-purple-800 disabled:opacity-50"
            >
              <FaSave />
              {loading ? "Updating..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
