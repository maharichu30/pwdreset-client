import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMail = async (e) => {

    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return;
    }

    setError("");
    setLoading(true);

    try {

      const res = await API.post("/auth/forgot", { email });

      alert(res.data.message);

      setEmail("");

    } catch (error) {

      alert(error.response?.data?.message || "Error sending mail");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-400 via-pink-500 to-purple-600">

      {/* Card */}

      <div className="backdrop-blur-md bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-8 w-96 text-white">

        <h2 className="text-3xl font-bold text-center mb-2">
          Forgot Password 🔐
        </h2>

        <p className="text-center text-sm mb-6 text-gray-100">
          Enter your email to receive reset link
        </p>

        <form onSubmit={sendMail}>

          {/* Email */}

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            className="w-full p-3 rounded-lg bg-white/80 text-black mb-1 focus:outline-none focus:ring-2 focus:ring-red-400"
            onChange={(e)=>setEmail(e.target.value)}
          />

          <p className="text-yellow-200 text-sm mb-4">
            {error}
          </p>

          {/* Button */}

          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white p-3 rounded-lg font-semibold transition duration-300"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        {/* Back */}

        <p className="text-center mt-5 text-sm">

          <Link
            to="/"
            className="underline"
          >
            Back to Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default ForgotPassword;