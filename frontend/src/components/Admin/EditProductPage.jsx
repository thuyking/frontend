import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useProductDetail } from "../../hooks/useProducts";
import { useUpdateAdminProduct } from "../../hooks/useAdminProducts";
import { resolveImageUrl } from "../../lib/imageUrl";
import { uploadImageApi } from "../../api/uploadApi";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product } = useProductDetail(id);
  const updateMutation = useUpdateAdminProduct();
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    size: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [],
  });

  useEffect(() => {
    if (product) {
      setProductData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || 0,
        countInStock: product.countInStock || 0,
        sku: product.sku || "",
        category: product.category || "",
        brand: product.brand || "",
        size: product.size || [],
        colors: product.colors || [],
        collections: product.collections || "",
        material: product.material || "",
        gender: product.gender || "",
        images: product.images || [],
      });
    }
  }, [product]);

  function handleChange(e) {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateMutation.mutateAsync({
        productId: id,
        payload: productData,
      });
      toast.success("Product updated");
      navigate("/admin/products");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update product");
    }
  }

  async function handleUploadImage() {
    if (!selectedImageFile) {
      toast.error("Please choose an image first");
      return;
    }

    try {
      setIsUploadingImage(true);
      const result = await uploadImageApi(selectedImageFile);
      setProductData((prev) => ({
        ...prev,
        images: [...prev.images, { url: result.imageUrl }],
      }));
      setSelectedImageFile(null);
      toast.success("Image uploaded");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to upload image");
    } finally {
      setIsUploadingImage(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input className="w-full border rounded p-2" type="text" value={productData.name} name="name" onChange={handleChange} />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea className="w-full border rounded p-2" rows={4} value={productData.description} name="description" onChange={handleChange} />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input className="w-full border rounded p-2" type="number" value={productData.price} name="price" onChange={handleChange} />
        </div>

        <div>
          <label className="block mb-1 font-medium">Count in Stock</label>
          <input className="w-full border rounded p-2" type="number" value={productData.countInStock} name="countInStock" onChange={handleChange} />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input className="w-full border rounded p-2" type="text" value={productData.category} name="category" onChange={handleChange} />
        </div>

        <div>
          <label className="block mb-1 font-medium">Sku</label>
          <input className="w-full border rounded p-2" type="text" value={productData.sku} name="sku" onChange={handleChange} />
        </div>

        <div>
          <label className="block mb-1 font-medium">Brand</label>
          <input className="w-full border rounded p-2" type="text" value={productData.brand} name="brand" onChange={handleChange} />
        </div>

        <div>
          <label className="block mb-1 font-medium">Size</label>
          <input
            className="w-full border rounded p-2"
            type="text"
            value={productData.size.join(", ")}
            onChange={(e) => setProductData({ ...productData, size: e.target.value.split(",").map((size) => size.trim()) })}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Color</label>
          <input
            className="w-full border rounded p-2"
            type="text"
            value={productData.colors.join(", ")}
            onChange={(e) => setProductData({ ...productData, colors: e.target.value.split(",").map((color) => color.trim()) })}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Collection</label>
          <input className="w-full border rounded p-2" type="text" value={productData.collections} name="collections" onChange={handleChange} />
        </div>

        <div>
          <label className="block mb-1 font-medium">Material</label>
          <input className="w-full border rounded p-2" type="text" value={productData.material} name="material" onChange={handleChange} />
        </div>

        <div>
          <label className="block mb-1 font-medium">Gender</label>
          <input className="w-full border rounded p-2" type="text" value={productData.gender} name="gender" onChange={handleChange} />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image</label>
          <div className="flex items-center gap-2 mb-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImageFile(e.target.files?.[0] || null)}
            />
            <button
              type="button"
              onClick={handleUploadImage}
              disabled={isUploadingImage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded disabled:opacity-60"
            >
              {isUploadingImage ? "Uploading..." : "Upload"}
            </button>
          </div>
          <div className="flex gap-3">
            {productData.images.map((image, index) => (
              <img key={index} src={resolveImageUrl(image.url)} className="w-20 h-20 object-cover rounded border" />
            ))}
          </div>
        </div>

        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
