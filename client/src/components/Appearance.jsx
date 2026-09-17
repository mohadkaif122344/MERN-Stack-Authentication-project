import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Appearance = () => {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex  items-center justify-between gap-3  px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-500 dark:hover:bg-purple-950/40 hover:text-blue-600 dark:hover:text-purple-400 transition" >
        <div className="flex items-center gap-3">
          <span>Appearance</span>
        </div>
        <span
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {open && (
<div className="w-fit ml-24 mb-2 mt-3 mr-0 px-1 py-2 rounded-xl border border-gray-200 dark:border-gray-700">

  <div className="flex items-center justify-between gap-3">

    <span className="text-xs text-gray-600 dark:text-gray-300 gap-10">
      {isDark ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </span>

    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`
        relative
        w-9
        h-5
        rounded-full
        transition-colors
        duration-300
        ${isDark ? "bg-purple-600" : "bg-gray-300"}
      `}
    >
      <span
        className={`
          absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300
          ${isDark ? "translate-x-4" : "translate-x-0"}
        `}
      />
    </button>
  </div>
</div>
      )}
    </div>
  );
};

export default Appearance;