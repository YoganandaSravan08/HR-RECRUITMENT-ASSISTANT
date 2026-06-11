import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
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
      await API.post("/auth/register", formData);

      alert("Registration Successful");

      window.location.href = "/";
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full grid md:grid-cols-2">

        {/* Left Section */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-green-600 to-blue-700 text-white p-10">
          <h1 className="text-5xl font-bold mb-4">
            🚀 Join AIRecruit Pro
          </h1>

          <p className="text-lg text-green-100 mb-8">
            Create your account and start managing recruitment smarter.
          </p>

          <div className="space-y-4 text-lg">
            <p>📄 Resume Upload</p>
            <p>🎯 ATS Scoring</p>
            <p>👥 Candidate Ranking</p>
            <p>🎤 Interview Questions</p>
            <p>📊 Recruitment Analytics</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="p-10">
          <h2 className="text-4xl font-bold mb-2">
            Create Account ✨
          </h2>

          <p className="text-gray-500 mb-8">
            Start your AI-powered recruitment journey
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full border border-gray-300 p-3 rounded-xl mb-4 focus:ring-2 focus:ring-green-500 outline-none"
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 p-3 rounded-xl mb-4 focus:ring-2 focus:ring-green-500 outline-none"
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border border-gray-300 p-3 rounded-xl mb-6 focus:ring-2 focus:ring-green-500 outline-none"
              onChange={handleChange}
            />

            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition duration-300">
              Register
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-blue-600 font-bold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;