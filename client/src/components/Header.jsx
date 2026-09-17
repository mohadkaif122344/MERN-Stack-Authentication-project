import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="w-full max-w-3xl text-center">

        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="w-10 h-px bg-blue-600 dark:bg-purple-500" />
          <p className="text-sm font-semibold text-blue-600 dark:text-purple-400 uppercase tracking-[0.2em]">
            Welcome to MyApp
          </p>
          <span className="w-10 h-px bg-blue-600 dark:bg-purple-500" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
          Hello,{" "}
          <span className="text-blue-600 dark:text-purple-400">
            {userData?.name || "User"}
          </span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-8">
          Manage your personal account with ease. Update your profile, verify
          your email, change your security settings and keep all your account
          information safe in one place.
        </p>

        <Link
          to="/profile">
        <button
          className="group mt-9 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg transition"
        >
          View Profile
          <span className="inline-block ml-2 group-hover:translate-x-1 transition">
            →
          </span>
          </button>
        </Link>

        <div className="mt-10 flex justify-center gap-3 text-sm text-gray-400 dark:text-gray-500">
          <span>Simple</span>
          <span>•</span>
          <span>Secure</span>
          <span>•</span>
          <span>Easy to use</span>
        </div>

      </div>
    </div>
  );
};

export default Header;