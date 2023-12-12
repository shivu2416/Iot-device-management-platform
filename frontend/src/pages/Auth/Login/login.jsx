import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginApiService } from "../../../services/api";

const Login = () => {
  const token = JSON.parse(localStorage.getItem("authToken"))
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      toast.error("Username and Password are required");
      return;
    }

    try {
      const response = await loginApiService(formData);
      const user = response;

      localStorage.setItem("user", JSON.stringify(user?.user));
      localStorage.setItem("authToken", JSON.stringify(user?.access));
      localStorage.setItem("refresh", JSON.stringify(user?.refresh));
      toast.success("Login successful");
      window.location.href = "/"
    } catch (error) {
      toast.error(error.message || "Error logging in");
    }
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-lg text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="username"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="username"
              placeholder="Username"
              value={formData?.username}
              onChange={handleChange}
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              value={formData?.password}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-800 text-white hover:bg-green-dark focus:outline-none my-1"
            >
              Login
            </button>
          </form>
        </div>

        <div className="text-grey-dark mt-6">
          Not a member?
          <Link className="mx-2 text-blue-700 " to="/signup">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
