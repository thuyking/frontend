import React from "react";
import CartItem from "../Cart/CartItem";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
const CartDrawer = ({ handleNavCart, navCart }) => {
  const navigate = useNavigate();
  const { data: cart } = useCart();
  function handleCheckout() {
    return navigate("/checkout");
  }
  return (
    <div>
      {/* Overlay */}
      <div
        onClick={handleNavCart}
        className={`
              fixed inset-0 bg-black/40 z-40 transition-opacity duration-300
              ${navCart ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            `}
      />
      {/* Cart */}
      <div
        className={`
              fixed top-0 right-0 h-screen w-[360px] bg-white z-50
              transform transition-transform duration-300 ease-in-out
              ${navCart ? "translate-x-0" : "translate-x-full"}
            `}
      >
        <div className="flex justify-between items-center mb-4 px-3 py-2">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button onClick={handleNavCart} className="text-xl">
            ✕
          </button>
        </div>
        {/* Cart content */}
        <div className="px-3">
          <CartItem />
        </div>
        <div className="p-4 bg-white sticky bottom-0">
          <p className="mb-2 text-sm text-gray-600">
            Total: ${cart?.totalPrice || 0}
          </p>
          <button
            className="w-full bg-black text-white rounded-lg py-3  font-semibold hover:bg-gray-800"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
