import React from "react";
import { useNavigate } from "react-router-dom";
import { useMyOrders } from "../hooks/useOrders";
const MyOrder = () => {
  const { data: orders = [], isLoading } = useMyOrders();
  const navigate = useNavigate();

  function handleRowClick(orderId) {
    navigate(`/order/${orderId}`);
  }
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 absolute top-2 px-4">
      <h2 className="text-lg font-semibold mb-4">My Orders</h2>

      <table className="min-w-full text-left text-sm text-gray-600">
        <thead className="bg-gray-100 text-xs uppercase text-gray-500">
          <tr>
            <th className="py-3 px-4">Image</th>
            <th className="py-3 px-4">Order ID</th>
            <th className="py-3 px-4">Created</th>
            <th className="py-3 px-4">Shipping Address</th>
            <th className="py-3 px-4">Items</th>
            <th className="py-3 px-4">Price</th>
            <th className="py-3 px-4">Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr
                key={order._id}
                onClick={() => handleRowClick(order._id)}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <td className="py-3 px-4">
                  <img
                    src={order.orderItems[0].image}
                    alt=""
                    className="w-12 h-12 object-cover rounded-md"
                  />
                </td>

                <td className="py-3 px-4 font-medium text-gray-800">
                  #{order._id}
                </td>

                <td className="py-3 px-4">
                  {new Date(order.createdAt).toLocaleDateString()}{" "}
                  {new Date(order.createdAt).toLocaleTimeString()}
                </td>

                <td className="py-3 px-4">
                  {order.shippingAddress
                    ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                    : "N/A"}
                </td>

                <td className="py-3 px-4">{order.orderItems.length}</td>

                <td className="py-3 px-4 font-medium">${order.totalPrice}</td>

                <td className="py-3 px-4">
                  {order.isPaid ? (
                    <span className="bg-green-100 text-green-600 text-xs font-medium px-3 py-1 rounded-full">
                      Paid
                    </span>
                  ) : (
                    <span className="bg-yellow-100 text-yellow-600 text-xs font-medium px-3 py-1 rounded-full">
                      Pending
                    </span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-6 text-gray-400">
                {isLoading ? "Loading orders..." : "You don't have orders"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrder;
