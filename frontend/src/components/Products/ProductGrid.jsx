import React from "react";
import { Link } from "react-router-dom";
import { resolveImageUrl } from "../../lib/imageUrl";
const ProductGrid = ({ product }) => {
  const productImages = product.images || product.image || [];
  return (
    <div>
      {productImages.map((i, index) => {
        return (
          <Link key={index} to={`/product/${product._id}`}>
            <div className="w-64">
              <img
                src={resolveImageUrl(i.url)}
                alt=""
                className="w-64 h-96 object-fill rounded-md"
              />
              <p>{product.name}</p>
              <p>{product.price}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductGrid;
