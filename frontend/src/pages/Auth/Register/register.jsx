import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signupApiService } from "../../../services/api";

const Register = () => {
  const token = JSON.parse(localStorage.getItem("authToken"))
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    role: "operator",
  });

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await signupApiService(formData);
      const user = response;
      localStorage.setItem("user", JSON.stringify(user?.tokens));
      toast.success("Signup successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Error logging in");
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
            />

            <input
              type="email"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <div className="block border border-grey-light w-full p-3 rounded mb-4 relative">
              <select
                className="w-full appearance-none outline-none focus:outline-none"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="manager">Manager</option>
                <option value="operator">Operator</option>
                <option value="engineer">Engineer</option>
                <option value="owner">Owner</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-grey">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                </svg>
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-800 text-white hover:bg-green-dark focus:outline-none my-1"
            >
              Create Account
            </button>

            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the Terms of Service and Privacy
              Policy
            </div>
          </form>
        </div>

        <div className="text-grey-dark mt-6 ">
          Already have an account?
          <Link className="mx-2 text-blue-700" to="/login">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;