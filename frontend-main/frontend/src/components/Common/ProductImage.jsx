import React, { useState } from "react";

const ProductImage = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  const safeSrc = error || !src ? "/vite.svg" : src;
  return (
    <div>
      <img
        src={safeSrc}
        alt={alt}
        className={className}
        onError={() => {
          setError(true);
        }}
      />
    </div>
  );
};

export default ProductImage;
