import React from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  useAdminProducts,
  useDeleteAdminProduct,
} from "../../hooks/useAdminProducts";

const ProductManagement = () => {
  const { data: products = [], isLoading } = useAdminProducts();
  const deleteProductMutation = useDeleteAdminProduct();

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete the Products?")) {
      try {
        await deleteProductMutation.mutateAsync(id);
        toast.success("Product deleted");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to delete product");
      }
    }
  }

  return (
    <div className="p-6 w-full">
      <h1 className="text-xl font-semibold mb-4">Product Management</h1>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-left text-sm text-gray-600 uppercase">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Sku</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => {
              {
                return product ? (
                  <tr
                    key={product._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{product.name}</td>
                    <td className="p-3">${product.price}</td>
                    <td className="p-3">{product.sku}</td>
                    <td className="p-3 space-x-2">
                      <Link
                        to={`/admin/edit/${product._id}`}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ) : (
                  <p>No Found Products</p>
                );
              }
            })}
            {!isLoading && products.length === 0 && (
              <tr>
                <td colSpan={4} className="p-3 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
