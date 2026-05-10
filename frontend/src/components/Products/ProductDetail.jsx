import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useAddToCart } from "../../hooks/useCart";
import { resolveImageUrl } from "../../lib/imageUrl";
import {
  useBestSeller,
  useProductDetail,
  useSimilarProducts,
} from "../../hooks/useProducts";

const ProductDetail = ({ productId }) => {
  const params = useParams();
  const effectiveProductId = productId || params.id;

  const { data: bestSeller } = useBestSeller();
  const resolvedId = effectiveProductId || bestSeller?._id;
  const { data: selectedProduct } = useProductDetail(resolvedId);
  const { data: similarProducts = [] } = useSimilarProducts(resolvedId);
  const addToCartMutation = useAddToCart();

  const images = useMemo(() => selectedProduct?.images || [], [selectedProduct]);
  const sizes = useMemo(
    () => selectedProduct?.size || selectedProduct?.sizes || [],
    [selectedProduct],
  );
  const colors = useMemo(() => selectedProduct?.colors || [], [selectedProduct]);

  const [mainImg, setMainImg] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (images[0]?.url) {
      setMainImg(resolveImageUrl(images[0].url));
    }
  }, [images]);

  function handleQuantityChange(action) {
    setQuantity((prev) => {
      if (action === "plus") return prev + 1;
      if (action === "minus" && prev > 1) return prev - 1;
      return prev;
    });
  }

  async function handleAddToCart() {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select a size and color before adding the cart");
      return;
    }
    try {
      await addToCartMutation.mutateAsync({
        productId: selectedProduct._id,
        quantity,
        size: selectedSize,
        color: selectedColor,
      });
      toast.success("Product added to cart");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add to cart");
    }
  }

  if (!selectedProduct) {
    return <div className="text-center py-8">Loading product...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="flex flex-row">
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-4">
            {images.map((image, index) => (
              <div key={`${image.url}-${index}`}>
                <img
                  src={resolveImageUrl(image.url)}
                  alt={image.altText || ""}
                  className="w-[60px] h-[70px] rounded"
                  onClick={() => setMainImg(resolveImageUrl(image.url))}
                />
              </div>
            ))}
          </div>
          <img src={mainImg || "/vite.svg"} alt="" className="w-[350px] h-[350px] rounded" />
        </div>
        <div className="ml-5 flex flex-col">
          <h1 className="text-[25px] font-bold">{selectedProduct.name}</h1>
          {selectedProduct.discountPrice && (
            <p className="text-gray-500 line-through">{selectedProduct.discountPrice}</p>
          )}
          <p className="text-gray-500">{selectedProduct.price}</p>
          <p className="mb-3">{selectedProduct.description}</p>

          <div className="mb-3">
            <p>Color:</p>
            <div className="flex gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`border w-7 h-7 rounded-full border-2 ${selectedColor === color ? "w-8 h-8" : ""}`}
                  style={{ backgroundColor: color.toLowerCase() }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p>Size:</p>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <div key={size}>
                  <button
                    onClick={() => setSelectedSize(size)}
                    className={`border w-8 h-8 text-[12px] font-semibold ${selectedSize === size ? "bg-black text-white" : ""}`}
                  >
                    {size}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <p>Quantity:</p>
            <div className="flex gap-2">
              <button onClick={() => handleQuantityChange("minus")} className="border w-5 bg-gray-300 rounded">
                -
              </button>
              <p>{quantity}</p>
              <button onClick={() => handleQuantityChange("plus")} className="border w-5 bg-gray-300 rounded">
                +
              </button>
            </div>
          </div>
          <button onClick={handleAddToCart} className="border bg-black text-white px-32 py-1 mt-3">
            Add to Cart
          </button>
        </div>
      </div>
      <h2 className="text-center text-3xl font-bold mb-4">You May Also Like</h2>
      <div className="flex gap-8">
        {similarProducts.map((product) => (
          <ProductGrid product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
