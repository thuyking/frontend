import React from "react";
import Men from "../../assets/mens-collection.webp";
import Women from "../../assets/womens-collection.webp";
import { Link } from "react-router-dom";
const GenderProduct = () => {
  return (
    <div className="flex gap-4 my-4 justify-center">
      <div className="relative w-[600px] h-[600px]">
        <img src={Men} className="w-full h-full object-cover" alt="" />

        <div
          className="absolute bottom-6 left-1/4 -translate-x-1/2
                    bg-white/80 px-6 py-3 text-center"
        >
          <h1>Men's Collection</h1>
          <Link to="/collection/all?gender=Men" className="underline text-xs">
            Shop now
          </Link>
        </div>
      </div>

      <div className="relative w-[600px] h-[600px]">
        <img src={Women} className="w-full h-full object-cover" alt="" />

        <div
          className="absolute bottom-6 left-1/4 -translate-x-1/2
                    bg-white/80 px-6 py-3 text-center"
        >
          <h1>Women's Collection</h1>
          <Link to="/collection/all?gender=Women" className="underline text-xs">
            Shop now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GenderProduct;
