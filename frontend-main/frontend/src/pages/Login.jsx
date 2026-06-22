import React, { useState } from "react";
import LoginP from "../assets/login.webp";
import { FaHandPaper } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLogin } from "../hooks/useAuth";
import { saveAuth } from "../lib/authStorage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const auth = await loginMutation.mutateAsync({ email, password });
      saveAuth(auth);
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <div className="w-[420px] bg-white p-8 rounded-xl shadow-md border">
          <p className="text-center text-gray-600 mb-6 text-lg font-medium">
            Rabbit
          </p>

          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-semibold">Hey there!</h2>
              <FaHandPaper className="text-yellow-400 animate-bounce" />
            </div>
            <p className="text-gray-500 mb-6">
              Enter your username and password to Login.
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-black text-white py-2 rounded-md mt-2 hover:bg-gray-800 transition"
            >
              {loginMutation.isPending ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <span className="text-black font-medium cursor-pointer hover:underline">
              <Link to="/register">Register</Link>
            </span>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 h-screen">
        <img src={LoginP} alt="login" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Login;
