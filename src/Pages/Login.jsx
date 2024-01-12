import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaExclamation } from "react-icons/fa";

const Login = () => {
  const Navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [loginError, setLoginError] = useState(false); // State to track login error

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/login", formData);
      const { token } = response.data;

      // Save the token to localStorage or wherever you prefer
      localStorage.setItem("token", token);

      // Fetch user data using the token
      const userResponse = await axios.get("/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = userResponse.data;

      
      // Redirect to the dashboard
      // Use hook useNavigate() for navigation
      Navigate("/dashboard", { state: { user } });
      window.location.reload();
    } catch (error) {
      console.error(
        "Login Error:",
        error.response ? error.response.data : error.message
      );
      // Set login error to true
      setLoginError(true);
      // Automatically close the error alert after 5000 milliseconds (5 seconds)
      setTimeout(() => {
        setLoginError(false);
      }, 2000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-library">
      <div className="w-[30%] p-8">
        {/* Conditionally render the alert based on the login error state */}
        {loginError && (
          <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
            <FaExclamation className="mr-4"/>
            Salah Woyy Ulang!!
          </div>
        )}
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <div className="mb-4 flex items-center">
            <div className="flex items-center justify-center appearance-none border border-r-0 rounded bg-white rounded-r-none text-gray-700 w-[33px] h-[38px]">
                <FaUser />
              </div>
              <input
                className="shadow appearance-none bg-white border border-l-0 rounded rounded-l-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="mb-4 flex items-center">
              <div className="flex items-center justify-center appearance-none border border-r-0 rounded bg-white rounded-r-none text-gray-700 w-[33px] h-[38px]">
                <FaLock />
              </div>

              <input
                className="shadow appearance-none bg-white border border-l-0 rounded rounded-l-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-6 mt-10">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-full px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
