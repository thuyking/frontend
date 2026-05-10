import React from "react";
import HeroSection from "../components/Layout/HeroSection";
import GenderProduct from "../components/Products/GenderProduct";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetail from "../components/Products/ProductDetail";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturedSection from "../components/Products/FeaturedSection";
import { useBestSeller, useProducts } from "../hooks/useProducts";

const HomePage = () => {
  const { data: womenProducts = [] } = useProducts({ gender: "Women", limit: 8 });
  const { data: bestSeller } = useBestSeller();

  return (
    <div>
      <HeroSection />
      <GenderProduct />
      <NewArrivals />
      <h1 className="text-center text-3xl font-bold mb-4">Best Seller</h1>
      <ProductDetail productId={bestSeller?._id} />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-center text-3xl font-bold mb-4 ">Top For Women</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {womenProducts.map((product) => {
            return (
              <ProductGrid
                product={product}
                key={product._id}
              />
            );
          })}
        </div>
      </div>
      <FeaturedCollection />
      <FeaturedSection />
    </div>
  );
};

export default HomePage;
