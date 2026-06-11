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
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="border p-6 rounded w-96">
        <h1 className="text-2xl font-bold mb-4">Register</h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border w-full p-2 mb-3"
          onChange={handleChange}
        />

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

        <button className="bg-green-500 text-white w-full p-2">Register</button>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-bold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
