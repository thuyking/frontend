import React from "react";
import { Link } from "react-router-dom";

const MenuMobile = ({ handleMenuMobile, menuMobile }) => {
  return (
    <div>
      <div
        onClick={handleMenuMobile}
        className={`
              fixed inset-0 bg-black/40 z-40 transition-opacity duration-300
              ${menuMobile ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            `}
      ></div>

      {/* Cart */}
      <div
        className={`
              fixed top-0 left-0 h-screen w-[360px] bg-white z-50
              transform transition-transform duration-300 ease-in-out
              ${menuMobile ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        <div className="flex justify-end p-4">
          <button onClick={handleMenuMobile}>X</button>
        </div>
        <div className="flex flex-col p-4">
          <h1 className="text-2xl font-semibold">Menu</h1>
          <Link to="/collection/all?gender=Men" onClick={handleMenuMobile}>MEN</Link>
          <Link to="/collection/all?gender=Women" onClick={handleMenuMobile}>WOMEN</Link>
          <Link to="/collection/all?category=Top%20Wear" onClick={handleMenuMobile}>TOPWEAR</Link>
          <Link to="/collection/all?category=Bottom%20Wear" onClick={handleMenuMobile}>BOTTOMWEAR</Link>
        </div>
      </div>
    </div>
  );
};
export default MenuMobile;
