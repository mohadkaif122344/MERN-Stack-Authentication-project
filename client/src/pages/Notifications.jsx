import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Notifications = () => {
  const navigate = useNavigate();

  const {backendUrl,notifications,getNotifications,isLoggedin} = useContext(AppContext);

  const [selected, setSelected] = useState([]);
  const [selectMode, setSelectMode] = useState(false);

  useEffect(() => {
    if (isLoggedin) getNotifications();
  }, [isLoggedin]);

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selected.length === notifications.length) {
      setSelected([]);
    } else {
      setSelected(notifications.map((notif) => notif._id));
    }
  };

  const deleteNotification = async (id) => {
    try {
      const { data } = await axios.delete(
        backendUrl + "/api/user/notifications/" + id,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        setSelected((prev) => prev.filter((item) => item !== id));
        getNotifications();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message
      );
    }
  };

  const deleteSelected = async () => {
    try {
      await Promise.all(
        selected.map((id) =>
          axios.delete(
            backendUrl + "/api/user/notifications/" + id,
            { withCredentials: true }
          )
        )
      );

      toast.success("Notifications deleted successfully");
      setSelected([]);
      setSelectMode(false);
      getNotifications();
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message
      );
    }
  };

  const cancelSelect = () => {
    setSelected([]);
    setSelectMode(false);
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

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-7 text-white">
          <h1 className="text-2xl font-bold">
            Notifications
          </h1>

          <p className="text-sm text-blue-100 mt-1">
            Your latest account activity
          </p>
        </div>

        <div className="p-5">

          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-gray-400 uppercase font-semibold">
                Activity
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {notifications?.length || 0} notification
                {(notifications?.length || 0) !== 1 && "s"}
              </p>
            </div>

            {notifications?.length > 0 && (
              <button
                onClick={getNotifications}
                className="text-sm font-semibold text-blue-600 dark:text-purple-400"
              >
                Refresh
              </button>
            )}
          </div>

          {notifications?.length > 0 && (
            <div className="flex items-center justify-between mb-3">

              <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectMode}
                  onChange={() => {
                    setSelectMode(!selectMode);
                    setSelected([]);
                  }}
                />
                Select
              </label>

              {selectMode && (
                <div className="flex items-center gap-3">

                  <button
                    onClick={selectAll}
                    className="text-sm font-semibold text-blue-600 dark:text-purple-400"
                  >
                    {selected.length === notifications.length
                      ? "Unselect All"
                      : "Select All"}
                  </button>

                  {selected.length > 0 && (
                    <button
                      onClick={deleteSelected}
                      className="text-sm font-semibold text-red-500 hover:text-red-600"
                    >
                      Delete ({selected.length})
                    </button>
                  )}

                </div>
              )}
            </div>
          )}

         <div className="space-y-3 h-64 overflow-y-auto">

            {!notifications || notifications.length === 0 ? (
              <div className="py-10 text-center border border-gray-200 dark:border-gray-700 rounded-xl">

                <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  No notifications
                </h2>

                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                  Your account activity will appear here.
                </p>

              </div>
            ) : (
              notifications.map((notif, index) => (
                <div
                  key={notif._id || index}
                  className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
                >

                  <div className="flex items-start gap-3">

                    {selectMode && (
                      <input
                        type="checkbox"
                        checked={selected.includes(notif._id)}
                        onChange={() => handleSelect(notif._id)}
                        className="mt-1"
                      />
                    )}

                    <div className="flex-1 min-w-0">

                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-2 break-words">
                        {notif.message}
                      </p>

                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {notif.createdAt
                          ? new Date(notif.createdAt).toLocaleString()
                          : "Just now"}
                      </p>

                    </div>

                    {!selectMode && (
                      <button
                        onClick={() =>
                          deleteNotification(notif._id)
                        }
                        className="text-xs text-red-500 hover:text-red-600 shrink-0"
                      >
                        Delete
                      </button>
                    )}

                  </div>

                </div>
              ))
            )}

          </div>

          {selectMode && (
            <button
              onClick={cancelSelect}
              className="w-full mt-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Cancel
            </button>
          )}

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full mt-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            ← Back
          </button>

        </div>
      </div>
    </div>
  );
};

export default Notifications;