import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FiShoppingBag, FiUser, FiMenu } from "react-icons/fi";
import Search from "../Common/Search";
import CartDrawer from "./CartDrawer";
import MenuMobile from "../Common/MenuMobile";
import { useCart } from "../../hooks/useCart";
import { getAuth } from "../../lib/authStorage";
const Navbar = () => {
  const [navCart, setNavCart] = useState(false);
  const [menuMobile, setMenuMobile] = useState(false);
  const { data: cart } = useCart();
  const auth = getAuth();
  function handleNavCart() {
    setNavCart(!navCart);
  }
  function handleMenuMobile() {
    setMenuMobile(!menuMobile);
  }
  return (
    <div className="flex flex-row  justify-around items-center">
      <Link to="/" className="font-bold text-2xl">
        THUY ▢
      </Link>

      <div className="hidden laptop:flex flex-row gap-2 font-medium">
        <Link to="/collection/all?gender=Men">MEN</Link>
        <Link to="/collection/all?gender=Women">WOMEN</Link>
        <Link to="/collection/all?category=Top%20Wear">TOPWEAR</Link>
        <Link to="/collection/all?category=Bottom%20Wear">BOTTOMWEAR</Link>
      </div>

      <div className="flex flex-row gap-3">
        <Link to={auth?.token ? "/profile" : "/login"}>
          <button>
            <FiUser className="text-2xl" />
          </button>
        </Link>

        <CartDrawer handleNavCart={handleNavCart} navCart={navCart} />

        <button onClick={handleNavCart}>
          <FiShoppingBag className="text-black text-2xl" />
          <span className="text-xs">{cart?.products?.length || 0}</span>
        </button>
        <Search />
        <button onClick={handleMenuMobile}>
          <FiMenu className="laptop:hidden tablet:hidden mobile:flex" />
        </button>
        <MenuMobile
          handleMenuMobile={handleMenuMobile}
          menuMobile={menuMobile}
        />
      </div>
    </div>
  );
};

export default Navbar;
