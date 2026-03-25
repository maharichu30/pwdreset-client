import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../services/api";

function ChangePassword() {

  const { token } = useParams();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {

    let newErrors = {};

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

  const updatePassword = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {

      const res = await API.post(
        `/auth/reset/${token}`,
        { password: form.password }
      );

      alert(res.data.message);

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Error updating password"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-600">

      {/* Glass Card */}

      <div className="backdrop-blur-md bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-8 w-96 text-white">

        <h2 className="text-3xl font-bold text-center mb-2">
          Reset Password 🔐
        </h2>

        <p className="text-center text-sm mb-6 text-gray-100">
          Enter new password to continue
        </p>

        <form onSubmit={updatePassword}>

          {/* New Password */}

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className="w-full p-3 rounded-lg bg-white/80 text-black mb-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e)=>
                setForm({
                  ...form,
                  password: e.target.value
                })
              }
            />

            <span
              className="absolute right-4 top-4 text-black cursor-pointer"
              onClick={()=>setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash/> : <FaEye/>}
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
              className="w-full p-3 rounded-lg bg-white/80 text-black mb-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
              onChange={(e)=>
                setForm({
                  ...form,
                  confirmPassword: e.target.value
                })
              }
            />

            <span
              className="absolute right-4 top-4 text-black cursor-pointer"
              onClick={()=>setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <FaEyeSlash/> : <FaEye/>}
            </span>

          </div>

          <p className="text-yellow-200 text-sm mb-4">
            {errors.confirmPassword}
          </p>

          {/* Button */}

          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white p-3 rounded-lg font-semibold transition duration-300"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default ChangePassword;