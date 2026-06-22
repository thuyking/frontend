import React, { useMemo, useState } from "react";
import { HiFunnel } from "react-icons/hi2";
import FilterSideBar from "../components/Products/FilterSideBar";
import SortOption from "../components/Products/SortOption";
import ProductGrid from "../components/Products/ProductGrid";
import { useProducts } from "../hooks/useProducts";
import { useParams, useSearchParams } from "react-router-dom";
const Colection = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const [filterSidebar, setFilterSideBar] = useState(false);

  const queryParams = useMemo(() => {
    const params = Object.fromEntries([...searchParams]);
    if (collection && collection !== "all") params.collection = collection;
    return params;
  }, [collection, searchParams]);

  const { data: product = [] } = useProducts(queryParams);

  function handleFilterSideBar() {
    setFilterSideBar((prev) => !prev);
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Mobile Filter Button */}
      <div className="px-6 pt-4">
        <button
          className="laptop:hidden tablet:hidden mobile:flex items-center text-lg"
          onClick={handleFilterSideBar}
        >
          <HiFunnel />
        </button>
      </div>

      <div className="flex px-6 py-8 gap-8">
        {/* Filter sidebar */}
        <div
          className={`
          ${filterSidebar ? "block" : "hidden"}
          laptop:block tablet:block
          w-64 shrink-0
        `}
        >
          <FilterSideBar />
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-wide uppercase mb-2">
              All Collection
            </h2>

            <SortOption />
          </div>

          {/* Product Grid */}
          <div
            className="grid 
                        grid-cols-2 
                        tablet:grid-cols-3 
                        laptop:grid-cols-4 
                        gap-8"
          >
            {product.map((product) => {
              return <ProductGrid product={product} key={product._id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Colection;
