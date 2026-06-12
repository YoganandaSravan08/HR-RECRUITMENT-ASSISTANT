import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div
      className={`flex min-h-screen ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <Sidebar />

      <div className="flex-1 p-6">
        <div className="flex justify-end mb-4">
          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className={`px-4 py-2 rounded-lg font-medium transition ${
              darkMode
                ? "bg-yellow-500 text-black"
                : "bg-gray-800 text-white"
            }`}
          >
            {darkMode
              ? "☀️ Light Mode"
              : "🌙 Dark Mode"}
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default Layout;