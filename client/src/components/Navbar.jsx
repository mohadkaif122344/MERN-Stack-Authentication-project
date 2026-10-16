import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Appearance from "./Appearance";
import {
  FaHome,
  FaInfoCircle,
  FaStar,
  FaEnvelope,
  FaUser,
  FaSignInAlt,
  FaSignOutAlt,
  FaShieldAlt,
  FaTrashAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { FaEnvelopeCircleCheck } from "react-icons/fa6";

const Navbar = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContext);

  const logout = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/logout`,
        {},
        { withCredentials: true },
      );
        setIsLoggedin(false);
        setUserData(null);
        toast.success(data.message);
        navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <nav className="absolute top-0 z-50 w-full px-2 py-3 sm:px-4 lg:px-16">
      <div className="relative mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-2 rounded-2xl border border-white/50 bg-white/80 px-3 py-3 shadow-lg backdrop-blur-xl dark:border-gray-700 dark:bg-gray-900/90 sm:px-6 md:grid-cols-[1fr_auto_1fr]">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="shrink-0 cursor-pointer text-left"
        >
          <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-base font-bold text-transparent sm:text-lg">
            MyApp
          </h1>
          <p className="hidden text-[10px] text-gray-400 sm:block">
            Simple & Secure
          </p>
        </button>

        <ul className="hidden items-center justify-center gap-1 rounded-xl bg-gray-50 p-1 font-bold dark:bg-gray-800 md:flex">
          <li>
            <button className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-gray-700 hover:bg-white hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-700 lg:px-3">
              <FaHome /> Home
            </button>
          </li>
          <li>
            <button className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-gray-700 hover:bg-white hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-700 lg:px-3">
              <FaInfoCircle /> About
            </button>
          </li>
          <li>
            <button className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-gray-700 hover:bg-white hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-700 lg:px-3">
              <FaStar /> Features
            </button>
          </li>
          <li>
            <button className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-gray-700 hover:bg-white hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-700 lg:px-3">
              <FaEnvelope /> Contact
            </button>
          </li>
        </ul>

        <div className="flex shrink-0 items-center justify-end gap-2 md:col-start-3">
          {userData ? (
            <div className="group relative">
              <button
                type="button"
                aria-label="Open profile menu"
                className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-1 text-white shadow-md"
              >
                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white font-bold text-blue-600 sm:h-10 sm:w-10">
                  {userData.profileImage ? (
                    <img
                      src={userData.profileImage}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    userData.name?.charAt(0)?.toUpperCase() || <FaUser />
                  )}
                </div>
              </button>

              <div className="invisible absolute right-0 top-full z-50 w-[min(15rem,calc(100vw-1rem))] pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100">
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">
                  <div className="bg-purple-700 px-4 py-4 text-white">
                    <p className="font-semibold">{userData.name}</p>
                    <p className="break-all text-xs">{userData.email}</p>
                  </div>

                  <button
                    onClick={() => navigate("/profile")}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    <FaUser /> Profile
                  </button>

                  <div className="border-t dark:border-gray-700">
                    <p className="px-4 pb-2 pt-3 text-xs font-semibold text-gray-400">
                      SETTINGS
                    </p>

                    <button
                      onClick={() => navigate("/settings/email-verification")}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      <FaEnvelopeCircleCheck className="" />
                      Verify Email
                    </button>
                    <button
                      onClick={() =>
                        navigate("/settings/security/change-password")
                      }
                      className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      <FaShieldAlt /> Security
                    </button>

                    <Appearance />

                    <button
                      onClick={() => navigate("/settings/delete-account")}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 dark:hover:bg-gray-800"
                    >
                      <FaTrashAlt /> Delete Account
                    </button>
                  </div>

                  <button
                    onClick={logout}
                    className="flex w-full items-center gap-3 border-t px-4 py-3 text-left hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-purple-700 px-3 py-2 text-sm font-semibold text-white shadow-lg sm:px-5"
            >
              <FaSignInAlt className="shrink-0" />
              <span>Login</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setMenu(!menu)}
            aria-label="Toggle navigation"
            className="rounded-lg p-2 text-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 md:hidden"
          >
            {menu ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {menu && (
          <div className="absolute left-2 right-2 top-full z-50 mt-2 rounded-xl border border-gray-200 bg-white p-2 shadow-xl dark:border-gray-700 dark:bg-gray-900 md:hidden">
            <button
              onClick={() => setMenu(false)}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <FaHome /> Home
            </button>
            <button
              onClick={() => setMenu(false)}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <FaInfoCircle /> About
            </button>
            <button
              onClick={() => setMenu(false)}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <FaStar /> Features
            </button>
            <button
              onClick={() => setMenu(false)}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <FaEnvelope /> Contact
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
