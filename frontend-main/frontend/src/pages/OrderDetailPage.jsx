import React from "react";
import { Link, useParams } from "react-router-dom";
import { useOrderDetail } from "../hooks/useOrders";

const OrderDetailPage = () => {
  const { id } = useParams();
  const { data: orderDetail, isLoading } = useOrderDetail(id);

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {!orderDetail ? (
        <p>No order found</p>
      ) : (
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h4 className="text-lg font-semibold">
                Order ID: #{orderDetail._id}
              </h4>
              <p className="text-gray-500 text-sm">
                {new Date(orderDetail.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                {orderDetail.isPaid ? "Approved" : "Pending"}
              </span>

              <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                {orderDetail.isDelivered ? "Approved" : "Pending"}
              </span>
            </div>
          </div>

          {/* Payment + Shipping */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <h4 className="font-semibold mb-2">Payment Info</h4>
              <p className="text-sm text-gray-700">
                Payment Method: {orderDetail.paymentMethod}
              </p>
              <p className="text-sm text-gray-700">
                Status: {orderDetail.isPaid ? "Paid" : "Unpaid"}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Shipping Info</h4>
              <p className="text-sm text-gray-700">
                Shipping Method: {orderDetail.shippingMethod}
              </p>
              <p className="text-sm text-gray-700">
                Address: {orderDetail?.shippingAddress?.city},{" "}
                {orderDetail?.shippingAddress?.country}
              </p>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-3">Products</h4>

            <table className="w-full text-sm border rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Unit Price</th>
                  <th className="text-left p-3">Quantity</th>
                  <th className="text-left p-3">Total</th>
                </tr>
              </thead>

              <tbody>
                {orderDetail.orderItems.map((item) => (
                  <tr
                    key={item.productId}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt=""
                          className="w-12 h-12 object-cover rounded"
                        />

                        <Link
                          to={`/product/${item.productId}`}
                          className="text-blue-600 hover:underline"
                        >
                          {item.name}
                        </Link>
                      </div>
                    </td>

                    <td className="p-3">${item.price}</td>

                    <td className="p-3">{item.quantity}</td>

                    <td className="p-3 font-medium">
                      ${item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Back */}
          <div className="mt-6">
            <Link
              to="/my-orders"
              className="text-blue-600 hover:underline text-sm"
            >
              Back to My Orders
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailPage;
