import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const DeleteAccount = () => {
  const { backendUrl, setIsLoggedin } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const DeleteUser = async () => {
    try {
      setLoading(true);

      const { data } = await axios.delete(
        backendUrl + "/api/auth/deleteUser",
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        setIsLoggedin(false);
        navigate("/login");
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
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100 dark:bg-gray-950">

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

      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800">

        <h1 className="text-2xl font-bold text-red-700 dark:text-red-500">
          Delete Account
        </h1>

        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Are you sure you want to delete your account?
        </p>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          This action cannot be undone.
        </p>

        <div className="flex gap-3 mt-6">

          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Cancel
          </button>

          <button
            onClick={DeleteUser}
            disabled={loading}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete Account"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;