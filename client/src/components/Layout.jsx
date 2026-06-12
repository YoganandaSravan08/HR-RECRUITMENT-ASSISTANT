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
          ? "bg-gradient-to-br from-slate-950 via-gray-900 to-blue-950 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <Sidebar />

      <div className="flex-1 p-6">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-lg font-medium transition duration-300 shadow-md ${
              darkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-800 text-white hover:bg-gray-700"
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