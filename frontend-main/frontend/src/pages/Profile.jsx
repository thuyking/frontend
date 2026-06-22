import React from "react";
import MyOrder from "./MyOrder";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../hooks/useAuth";
import { clearAuth } from "../lib/authStorage";

const Profile = () => {
  const navigate = useNavigate();
  const { data: profile, isLoading } = useProfile();

  function handleLogout() {
    clearAuth();
    navigate("/login");
  }

  return (
    <div className="relative min-h-screen flex  items-center justify-center bg-gray-100">
      <div className="bg-white w-80 p-6 rounded-lg shadow-md absolute top-4 left-10 ">
        <p className="text-xl font-semibold text-gray-900">
          {isLoading ? "Loading..." : profile?.name || "Guest"}
        </p>

        <p className="text-sm text-gray-500 mt-1">
          {isLoading ? "Loading..." : profile?.email || "No email"}
        </p>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition"
        >
          Logout
        </button>
      </div>
      <MyOrder />
    </div>
  );
};

export default Profile;
