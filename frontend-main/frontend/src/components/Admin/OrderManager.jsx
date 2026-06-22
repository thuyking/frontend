import React from "react";
import { toast } from "sonner";
import {
  useAdminOrders,
  useDeleteAdminOrder,
  useUpdateAdminOrder,
} from "../../hooks/useAdminOrders";

const ORDER_STATUSES = ["Processing", "Shipped", "Delivered", "Cancelled"];

const OrderManager = () => {
  const { data: orders = [], isLoading, isError, error } = useAdminOrders();
  const updateOrderMutation = useUpdateAdminOrder();
  const deleteOrderMutation = useDeleteAdminOrder();

  async function handleStatusChange(orderId, status) {
    try {
      await updateOrderMutation.mutateAsync({
        orderId,
        payload: {
          status,
          isDelivered: status === "Delivered",
        },
      });
      toast.success("Updated order status");
    } catch (mutationError) {
      toast.error(
        mutationError?.response?.data?.message || "Failed to update order",
      );
    }
  }

  async function handleDeleteOrder(orderId) {
    try {
      await deleteOrderMutation.mutateAsync(orderId);
      toast.success("Deleted order");
    } catch (mutationError) {
      toast.error(
        mutationError?.response?.data?.message || "Failed to delete order",
      );
    }
  }

  if (isLoading) {
    return <div className="p-6">Loading orders...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-red-600">
        {error?.response?.data?.message || "Failed to load orders"}
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Order Management</h2>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
            <tr>
              <th className="text-left px-6 py-4">Order Id</th>
              <th className="text-left px-6 py-4">Customer</th>
              <th className="text-left px-6 py-4">Total Price</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => {
              return (
                <tr
                  key={order._id}
                  className="border-t border-gray-200"
                >
                  <td className="px-6 py-5 text-gray-700 font-medium">
                    #{order._id}
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    {order.user.name}
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    ${order.totalPrice}
                  </td>

                  <td className="px-6 py-5">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white shadow-sm focus:outline-none"
                    >
                      {ORDER_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="px-6 py-5">
                    <button
                      type="button"
                      onClick={() => handleDeleteOrder(order._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-6 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManager;
