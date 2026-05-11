import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../../pages/AdminSideBar";
import { FiMenu } from "react-icons/fi";

const Admin = () => {
  const [isSideOpen, setIsSideOpen] = useState(false);
  return (
    <div className="flex min-h-screen relative">
      {/* Mobile Header */}
      <div className="flex bg-black h-11 w-full items-center px-4 laptop:hidden tablet:hidden fixed top-0 left-0 z-20">
        <button
          onClick={() => setIsSideOpen(!isSideOpen)}
          className="text-white mr-3"
        >
          <FiMenu sizes={24} />
        </button>
        <h1 className="text-white text-[15px] font-bold">Admin</h1>
      </div>

      {/* Mobile sidebar */}
      <div
        className={`laptop:hidden tablet:hidden bg-gray-900 w-64 h-screen text-white fixed top-0 left-0 transform transition-transform duration-300 z-30 ${
          isSideOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminSideBar />
      </div>

      {/* Desktop sidebar */}
      <div className="hidden laptop:flex tablet:flex bg-gray-900 w-64 min-h-screen text-white">
        <AdminSideBar />
      </div>

      {/* Content */}
      <main className="flex-1 pt-11 laptop:pt-0 tablet:pt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
