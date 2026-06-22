import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useOrderDetail } from "../hooks/useOrders";

function calculateEstimateDelivery(createdAt) {
  const orderDate = new Date(createdAt);
  orderDate.setDate(orderDate.getDate() + 10);
  return orderDate.toLocaleDateString();
}

const OrderComfirmationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const orderId = state?.orderId;
  const { data: order, isLoading } = useOrderDetail(orderId);

  if (!orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button className="underline" onClick={() => navigate("/my-orders")}>
          No order found. Go to My Orders
        </button>
      </div>
    );
  }

  if (isLoading || !order) {
    return <div className="min-h-screen flex items-center justify-center">Loading order...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-16">
      <h1 className="text-3xl font-semibold text-green-600 mb-8">Thank you for your order!</h1>

      <div className="bg-white w-[650px] rounded-lg shadow p-6">
        <div className="flex justify-between items-start border-b pb-4 mb-4">
          <div>
            <h2 className="font-semibold text-lg">Order ID: {order._id}</h2>
            <p className="text-gray-500 text-sm">
              Order date: {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="text-sm text-gray-600">
            Estimate Delivery: <span className="font-medium">{calculateEstimateDelivery(order.createdAt)}</span>
          </div>
        </div>

        <div className="space-y-4">
          {order.orderItems.map((item, idx) => (
            <div key={`${item.productId}-${idx}`} className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <img src={item.image} alt="" className="w-14 h-14 rounded object-cover" />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.color} | {item.size}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-medium">${item.price}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6 pt-4 border-t">
          <div>
            <p className="font-medium">Payment</p>
            <p className="text-gray-500 text-sm">{order.paymentMethod}</p>
          </div>

          <div>
            <p className="font-medium">Delivery</p>
            <p className="text-gray-500 text-sm">{order?.shippingAddress?.address}</p>
            <p className="text-gray-500 text-sm">
              {order?.shippingAddress?.city}, {order?.shippingAddress?.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderComfirmationPage;
