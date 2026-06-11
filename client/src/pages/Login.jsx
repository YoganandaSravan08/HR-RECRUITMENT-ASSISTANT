import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";


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

      alert("Login Successful");

      window.location.href = "/dashboard";
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="border p-6 rounded w-96">
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border w-full p-2 mb-3"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border w-full p-2 mb-3"
          onChange={handleChange}
        />

        <button className="bg-blue-500 text-white w-full p-2">Login</button>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-bold">
            Register
          </Link>
        </p>
      </form>
    </div> 
  );
}

export default Login;
