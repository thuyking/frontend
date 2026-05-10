import React from "react";
import { Link } from "react-router-dom";
import Featured from "../../assets/featured.webp";

const FeaturedCollection = () => {
  return (
    <section className="px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-green-100 rounded-2xl overflow-hidden flex flex-col-reverse md:flex-row">
          {/* Left */}
          <div className="md:w-1/2 flex flex-col justify-center p-8 md:p-16">
            <p className="text-sm text-gray-600 mb-2">Comfort and Style</p>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Apparel made for your everyday life
            </h2>

            <p className="text-gray-600 mb-6">
              Discover high-quality, comfortable clothing that effortlessly
              blends fashion and function. Designed to make you look and feel
              great every day.
            </p>

            <Link
              to="/collection/all"
              className="inline-block bg-black text-white px-6 py-3 rounded-md text-sm font-medium hover:opacity-90 transition"
            >
              Shop Now
            </Link>
          </div>

          {/* Right */}
          <div className="md:w-1/2">
            <img
              src={Featured}
              alt="Featured collection"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
