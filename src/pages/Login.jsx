import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {

    let newErrors = {};

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    try {

      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      alert(res.data.message);

      navigate("/dashboard");

    } catch (error) {

      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">

      {/* Glass Card */}

      <div className="backdrop-blur-md bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-8 w-96 text-white">

        <h2 className="text-3xl font-bold text-center mb-6">
          Welcome Back 👋
        </h2>

        <p className="text-center mb-6 text-sm text-gray-100">
          Login to your account
        </p>

        <form onSubmit={handleLogin}>

          {/* Email */}

          <input
            type="email"
            placeholder="Enter Email"
            className="w-full p-3 rounded-lg bg-white/80 text-black mb-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e)=>
              setForm({...form,email:e.target.value})
            }
          />

          <p className="text-yellow-200 text-sm mb-2">
            {errors.email}
          </p>

          {/* Password */}

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="w-full p-3 rounded-lg bg-white/80 text-black mb-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
              onChange={(e)=>
                setForm({...form,password:e.target.value})
              }
            />

            <span
              className="absolute right-4 top-4 text-black cursor-pointer"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? <FaEyeSlash/> : <FaEye/>}
            </span>

          </div>

          <p className="text-yellow-200 text-sm mb-4">
            {errors.password}
          </p>

          {/* Button */}

          <button
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white p-3 rounded-lg font-semibold transition duration-300"
          >
            Login
          </button>

        </form>

        {/* Links */}

        <div className="flex justify-between mt-5 text-sm">

          <Link
            to="/forgot"
            className="hover:underline"
          >
            Forgot Password?
          </Link>

          <Link
            to="/register"
            className="hover:underline"
          >
            Register
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;