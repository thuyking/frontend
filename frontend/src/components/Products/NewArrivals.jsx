import React, { useRef } from "react";
import ProductImage from "../Common/ProductImage";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNewArrivals } from "../../hooks/useProducts";
import { resolveImageUrl } from "../../lib/imageUrl";

const NewArrivals = () => {
  const { data: newArrivals = [] } = useNewArrivals();
  const sliderRef = useRef(null);
  function scrollRight() {
    sliderRef.current.scrollBy({
      left: 420,
      behavior: "smooth",
    });
  }
  function scrollLeft() {
    sliderRef.current.scrollBy({
      left: -420,
      behavior: "smooth",
    });
  }
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-4 my-8 mt-40">
        <h1 className="font-bold text-2xl">Explore New Arrivals</h1>
        <p>
          Discover the lastest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion{" "}
        </p>
      </div>
      <div className="relative mx-8">
        {/* BUTTON LEFT */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10
               bg-white p-2 rounded-full shadow"
          onClick={scrollLeft}
        >
          <FiChevronLeft size={24} />
        </button>

        {/* BUTTON RIGHT */}
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10
               bg-white p-2 rounded-full shadow"
          onClick={scrollRight}
        >
          <FiChevronRight size={24} />
        </button>

        {/* PRODUCT LIST */}
        <div ref={sliderRef} className="flex gap-4 overflow-hidden">
          {newArrivals.map((product) => (
            <div
              key={product._id}
              className="relative w-[400px] aspect-[3/4] flex-shrink-0"
            >
              <ProductImage
                src={resolveImageUrl(product.images[0].url)}
                alt={product.images[0].altText}
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-[134px] bg-black/30 px-6 py-3 w-full">
                <h1 className="text-white">{product.name}</h1>
                <Link
                  to={`/product/${product._id}`}
                  className="underline text-xs"
                >
                  <p className="text-white">${product.price}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
