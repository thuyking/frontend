import React from "react";
import { useSearchParams } from "react-router-dom";

const SortOption = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleSortChange(e) {
    const SortBy = e.target.value;
    searchParams.set("sortBy", SortBy);
    setSearchParams(searchParams);
  }
  return (
    <div>
      <select
        id="sort"
        onChange={handleSortChange}
        value={searchParams.get("sortBy") || ""}
      >
        <option value="">Default</option>
        <option value="priceAsc">Low to High</option>
        <option value="priceDesc">High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortOption;
