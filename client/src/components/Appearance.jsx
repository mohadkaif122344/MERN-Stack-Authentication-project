import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaSun, FaMoon, FaChevronDown } from "react-icons/fa";

export default function Appearance() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);
  const dark = theme === "dark";

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        Appearance
        <FaChevronDown className={open ? "rotate-180" : ""} />
      </button>

      {open && (
        <div className="flex items-center justify-between gap-3 rounded-lg border p-3 dark:border-gray-700">
          <span className="flex items-center gap-2 text-sm">
            {dark ? <FaMoon /> : <FaSun />}
            {dark ? "Dark Mode" : "Light Mode"}
          </span>

          <button
            onClick={() => setTheme(dark ? "light" : "dark")}
            className={`h-5 w-9 rounded-full ${
              dark ? "bg-purple-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`block h-4 w-4 rounded-full bg-white transition-transform ${
                dark ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      )}
    </div>
  );
}
