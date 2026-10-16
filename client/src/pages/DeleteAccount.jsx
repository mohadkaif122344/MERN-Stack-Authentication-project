import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { FaTrashAlt, FaExclamationTriangle } from "react-icons/fa";

const DeleteAccount = () => {
  const { backendUrl, setIsLoggedin } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const DeleteUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `${backendUrl}/api/auth/deleteUser`,
        { withCredentials: true }
      );
        toast.success(data.message);
        setIsLoggedin(false);
        navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-900 sm:p-8">
        <FaTrashAlt className="mb-4 text-3xl text-red-600" />
        <h2 className="text-2xl font-bold text-red-600">Delete Account</h2>
        <p className="my-4 text-gray-600 dark:text-gray-300">
          Are you sure? This action cannot be undone.
        </p>
        <p className="mb-5 flex gap-2 text-sm text-red-500">
          <FaExclamationTriangle className="mt-1 shrink-0" />
          Your account may be permanently deleted.
        </p>

        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <button
            onClick={() => navigate(-1)}
            disabled={loading}
            className="w-full rounded-lg border p-3 dark:border-gray-700 dark:text-white"
          >
            Cancel
          </button>
          <button
            onClick={DeleteUser}
            disabled={loading}
            className="w-full rounded-lg bg-red-600 p-3 text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Deleting..." : "🗑 Delete Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;