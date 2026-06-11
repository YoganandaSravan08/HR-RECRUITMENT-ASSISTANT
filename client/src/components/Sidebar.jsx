import { NavLink } from "react-router-dom";

function Sidebar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-lg"
        : "hover:bg-gray-800 text-white"
    }`;

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-5">

      <h1 className="text-3xl font-bold mb-10">
        🤖 AIRecruit Pro
      </h1>

      <div className="flex flex-col gap-3">

        <NavLink
          to="/dashboard"
          className={navClass}
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/jobs"
          className={navClass}
        >
          💼 Jobs
        </NavLink>

        <NavLink
          to="/candidates"
          className={navClass}
        >
          👤 Candidates
        </NavLink>

        <NavLink
          to="/upload-resume"
          className={navClass}
        >
          📄 Upload Resume
        </NavLink>

        <NavLink
          to="/ats"
          className={navClass}
        >
          🎯 ATS Analysis
        </NavLink>

        <NavLink
          to="/interview"
          className={navClass}
        >
          🎤 Interview Generator
        </NavLink>

        <NavLink
          to="/analytics"
          className={navClass}
        >
          📈 Analytics
        </NavLink>

        <button
          onClick={handleLogout}
          className="mt-8 flex items-center gap-3 p-3 rounded-lg text-red-400 hover:bg-red-900 hover:text-white transition duration-200"
        >
          🚪 Logout
        </button>

      </div>
    </div>
  );
}

export default Sidebar;
