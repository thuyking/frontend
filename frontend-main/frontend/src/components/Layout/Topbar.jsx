import React from "react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
const Topbar = () => {
  return (
    <div className="flex flex-row justify-around items-center bg-orange-700 h-11">
      <div className="flex flex-row gap-4">
        <a href="#" className="text-white text-2xl">
          <FaFacebook />
        </a>
        <a href="#" className="text-white text-2xl">
          <FaTiktok />
        </a>
        <a href="#" className="text-white text-2xl">
          <FaInstagram />
        </a>
      </div>
      <p className="text-white">Wear Your Style.</p>
      <p className="text-white">+84 0982708523</p>
    </div>
  );
};

export default Topbar;
