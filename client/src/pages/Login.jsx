import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);

      toast.success("Login Successful 🎉");

      window.location.href = "/dashboard";
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full grid md:grid-cols-2">
        {/* Left Section */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-blue-700 to-purple-700 text-white p-10">
          <h1 className="text-5xl font-bold mb-4">🤖 AIRecruit Pro</h1>

          <p className="text-lg text-blue-100 mb-8">
            Smart AI-Powered Recruitment Platform
          </p>

          <div className="space-y-4 text-lg">
            <p>✅ Resume Parsing</p>
            <p>✅ ATS Analysis</p>
            <p>✅ Candidate Ranking</p>
            <p>✅ Interview Generator</p>
            <p>✅ Analytics Dashboard</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="p-10">
          <h2 className="text-4xl font-bold mb-2">Welcome Back 👋</h2>

          <p className="text-gray-500 mb-8">
            Login to continue using AIRecruit Pro
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 p-3 rounded-xl mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border border-gray-300 p-3 rounded-xl mb-6 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
            />

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300">
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-bold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
