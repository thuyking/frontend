import React from "react";
import { FiShoppingBag, FiRefreshCw, FiCreditCard } from "react-icons/fi";

const FeaturedSection = () => {
  return (
    <section className=" py-12">
      <div className="flex justify-between px-2">
        <div className="flex flex-col items-center py-6">
          <FiShoppingBag className="text-xl mb-4" />
          <h2 className="text-sm font-semibold uppercase tracking-wide">
            Free International Shipping
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            On all orders over $100.00
          </p>
        </div>

        <div className="flex flex-col items-center py-6">
          <FiRefreshCw className="text-xl mb-4" />
          <h2 className="text-sm font-semibold uppercase tracking-wide">
            45 Days Return
          </h2>
          <p className="text-sm text-gray-500 mt-2">Money back guarantee</p>
        </div>

        <div className="flex flex-col items-center py-6">
          <FiCreditCard className="text-xl mb-4" />
          <h2 className="text-sm font-semibold uppercase tracking-wide">
            Secure Checkout
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            100% secured checkout process
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
