import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Appearance from "./Appearance";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContext);

  const logout = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/logout",
        {},
        { withCredentials: true }
      );
      if (data.success) {
        setIsLoggedin(false);
        setUserData(null);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="w-full absolute top-0 z-50 px-4 sm:px-8 lg:px-16 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl border border-white/50 dark:border-gray-700 shadow-lg rounded-2xl px-4 sm:px-6 py-3">

        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
            <img src={assets.logo} className="w-7 h-7 brightness-0 invert" />
          </div>

          <div className="hidden sm:block">
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MyApp
            </h1>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 -mt-1">
              Simple & Secure
            </p>
          </div>
        </Link>
  <ul className="hidden md:flex gap-1 bg-gray-50 dark:bg-gray-800 rounded-xl p-1 font-bold">
  <li  className="px-4 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:text-blue-600 transition">
    Home
  </li>
  <li  className="px-4 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:text-blue-600 transition">
    About
  </li>
  <li  className="px-4 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:text-blue-600 transition">
    Features
  </li>
  <li className="px-4 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:text-blue-600 transition">
    Contact
  </li>
</ul>

        {userData ? (
          <div className="relative group">
            <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-1 pr-3 text-white shadow-md hover:scale-105 transition">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden text-blue-600 font-bold">
                {userData?.profileImage  ? (
                  <img src={userData.profileImage } className="w-full h-full object-cover" />
                ) : (
                  userData?.name?.[0]?.toUpperCase() || "U"
                )}
              </div>
              <span className="hidden sm:block text-sm font-semibold max-w-20 truncate">
                {userData?.name}
              </span>
              ▼
            </button>

            <div className="absolute right-0 top-12 hidden group-hover:block w-60 pt-3">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">

                <div className="px-4 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <p className="font-semibold">{userData?.name}</p>
                  <p className="text-xs opacity-80 truncate">{userData?.email}</p>
                </div>
                <Link
                  to="/profile"
                  className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800"
                >
                  Profile
                </Link>
                <div className="border-t border-gray-200 dark:border-gray-700">
                  <p className="px-4 pt-3 pb-2 text-xs font-semibold text-gray-400 uppercase">
                    Settings
                  </p>
                  <Link
                    to="/settings/email-verification"
                    className="block px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800"
                  >
                    Email Verification
                  </Link>
                  <Link
                    to="/settings/security/change-password"
                    className="block px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800"
                  >
                    Security
                  </Link>
                  <Link
                    to="/settings/notifications"
                    className="block px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800"
                  >Notifications
                  </Link>
                  <Appearance />

                  <Link
                    to="/settings/delete-account"
                    className="block px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    Delete Account
                  </Link>
                </div>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
                >
                  🚪 Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            Login
            <img src={assets.arrow_icon} className="w-4 brightness-0 invert" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;