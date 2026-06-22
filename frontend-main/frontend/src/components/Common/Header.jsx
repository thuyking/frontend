import React from "react";
import Topbar from "../Layout/Topbar";
import Navbar from "../Layout/Navbar";
const Header = () => {
  return (
    <div className="border-b border-gray-300">
      <Topbar />
      <Navbar />
    </div>
  );
};
export default Header;
