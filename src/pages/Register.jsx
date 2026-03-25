import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {

    let newErrors = {};

    if (!form.name) {
      newErrors.name = "Name required";
    }

    if (!form.email) {
      newErrors.email = "Email required";
    } 
    else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email";
    }

    if (!form.mobile) {
      newErrors.mobile = "Mobile required";
    } 
    else if (!/^\d{10}$/.test(form.mobile)) {
      newErrors.mobile = "Mobile must be 10 digits";
    }

    if (!form.password) {
      newErrors.password = "Password required";
    } 
    else if (form.password.length < 6) {
      newErrors.password = "Minimum 6 characters";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm password required";
    } 
    else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    try {

      const res = await API.post("/auth/register", form);

      alert(res.data.message);

      navigate("/");

    } catch (error) {

      alert(error.response?.data?.message || "Register failed");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">

      {/* Glass Card */}

      <div className="backdrop-blur-md bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-8 w-96 text-white">

        <h2 className="text-3xl font-bold text-center mb-2">
          Create Account 🚀
        </h2>

        <p className="text-center text-sm mb-6 text-gray-100">
          Register to continue
        </p>

        <form onSubmit={handleRegister}>

          {/* Name */}

          <input
            placeholder="Enter Name"
            className="w-full p-3 rounded-lg bg-white/80 text-black mb-1 focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <p className="text-yellow-200 text-sm mb-2">
            {errors.name}
          </p>

          {/* Email */}

          <input
            placeholder="Enter Email"
            className="w-full p-3 rounded-lg bg-white/80 text-black mb-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <p className="text-yellow-200 text-sm mb-2">
            {errors.email}
          </p>

          {/* Mobile */}

          <input
            type="text"
            placeholder="Enter Mobile Number"
            maxLength="10"
            value={form.mobile}
            className="w-full p-3 rounded-lg bg-white/80 text-black mb-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setForm({ ...form, mobile: value });
            }}
          />

          <p className="text-yellow-200 text-sm mb-2">
            {errors.mobile}
          </p>

          {/* Password */}

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="w-full p-3 rounded-lg bg-white/80 text-black mb-1 focus:outline-none focus:ring-2 focus:ring-pink-400"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <span
              className="absolute right-4 top-4 text-black cursor-pointer"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>

          </div>

          <p className="text-yellow-200 text-sm mb-2">
            {errors.password}
          </p>

          {/* Confirm Password */}

          <div className="relative">

            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full p-3 rounded-lg bg-white/80 text-black mb-1 focus:outline-none focus:ring-2 focus:ring-red-400"
              onChange={(e) =>
                setForm({
                  ...form,
                  confirmPassword: e.target.value,
                })
              }
            />

            <span
              className="absolute right-4 top-4 text-black cursor-pointer"
              onClick={() =>
                setShowConfirm(!showConfirm)
              }
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>

          </div>

          <p className="text-yellow-200 text-sm mb-4">
            {errors.confirmPassword}
          </p>

          {/* Button */}

          <button
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-blue-600 hover:to-purple-600 text-white p-3 rounded-lg font-semibold transition duration-300"
          >
            Register
          </button>

        </form>

        {/* Login Link */}

        <p className="text-center mt-5 text-sm">

          Already have account?

          <Link
            to="/"
            className="ml-2 underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;