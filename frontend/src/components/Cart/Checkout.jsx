import React, { useMemo, useState } from "react";
import PayPalButton from "./PayPalButton";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCart } from "../../hooks/useCart";
import { useCreateCheckout, useFinalizeCheckout, usePayCheckout } from "../../hooks/useCheckout";
import { getAuth } from "../../lib/authStorage";

const Checkout = () => {
  const navigate = useNavigate();
  const { data: cart } = useCart();
  const createCheckoutMutation = useCreateCheckout();
  const payCheckoutMutation = usePayCheckout();
  const finalizeCheckoutMutation = useFinalizeCheckout();
  const auth = getAuth();

  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const checkoutItems = useMemo(
    () =>
      (cart?.products || []).map((item) => ({
        productId: item.productId,
        name: item.name,
        image: item.image,
        price: item.price,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
      })),
    [cart],
  );

  async function handleCheckoutId(event) {
    event.preventDefault();
    if (!auth?.token) {
      toast.error("Please login before checkout");
      navigate("/login");
      return;
    }
    if (!checkoutItems.length) {
      toast.error("Cart is empty");
      return;
    }
    try {
      const checkout = await createCheckoutMutation.mutateAsync({
        checkoutItems,
        shippingAddress,
        paymentMethod: "PayPal",
        totalPrice: cart.totalPrice,
      });
      setCheckoutId(checkout._id);
      toast.success("Checkout created");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create checkout");
    }
  }

  async function handlePaymentSuccess(details) {
    try {
      await payCheckoutMutation.mutateAsync({
        checkoutId,
        payload: {
          paymentStatus: "paid",
          paymentDetails: details,
        },
      });
      const finalOrder = await finalizeCheckoutMutation.mutateAsync(checkoutId);
      toast.success("Payment successful");
      navigate("/order-comfirmation", { state: { orderId: finalOrder._id } });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to finalize order");
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 gap-10">
      <div>
        <h1 className="text-2xl font-semibold mb-8">CHECKOUT</h1>

        <form onSubmit={handleCheckoutId} className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-3">Contact Details</h2>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={auth?.user?.email || ""}
              disabled
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
            />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Delivery</h3>
            <div className="mt-4">
              <label className="block text-sm mb-1">Address</label>
              <input
                type="text"
                value={shippingAddress.address}
                onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm mb-1">City</label>
                <input
                  type="text"
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Postal Code</label>
                <input
                  type="text"
                  value={shippingAddress.postalCode}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm mb-1">Country</label>
              <input
                type="text"
                value={shippingAddress.country}
                onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="pt-4">
            {!checkoutId ? (
              <button type="submit" className="w-full bg-black text-white py-3 rounded hover:bg-gray-900">
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg font-medium mb-3">Pay with payment</h3>
                <PayPalButton
                  amount={Number(cart?.totalPrice || 0)}
                  onSuccess={handlePaymentSuccess}
                  onError={() => toast.error("Payment failed. Try again")}
                />
              </div>
            )}
          </div>
        </form>
      </div>

      <div className="bg-gray-100 p-6 rounded h-fit">
        <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
        <div className="space-y-6">
          {(cart?.products || []).map((product, idx) => (
            <div key={`${product.productId}-${idx}`} className="flex gap-4 border-b pb-4">
              <img src={product.image} alt="" className="w-16 h-16 object-cover" />
              <div className="flex-1 text-sm">
                <p className="font-medium">{product.name}</p>
                <p>Size: {product.size}</p>
                <p>Color: {product.color}</p>
              </div>
              <p className="font-medium">${product.price}</p>
            </div>
          ))}

          <div className="space-y-2 text-sm pt-4">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>${cart?.totalPrice || 0}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping</p>
              <p>Free</p>
            </div>
          </div>

          <div className="flex justify-between font-semibold pt-4 border-t">
            <p>Total</p>
            <p>${cart?.totalPrice || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
