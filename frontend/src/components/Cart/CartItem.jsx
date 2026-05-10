import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";
import { useCart, useRemoveCartItem, useUpdateCartItem } from "../../hooks/useCart";

const CartItem = () => {
  const { data: cart } = useCart();
  const updateMutation = useUpdateCartItem();
  const removeMutation = useRemoveCartItem();
  const carts = cart?.products || [];

  async function updateQty(item, quantity) {
    try {
      await updateMutation.mutateAsync({
        productId: item.productId,
        quantity,
        size: item.size,
        color: item.color,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update quantity");
    }
  }

  async function removeItem(item) {
    try {
      await removeMutation.mutateAsync({
        productId: item.productId,
        size: item.size,
        color: item.color,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to remove item");
    }
  }

  return (
    <div className="">
      {carts.map((cartItem, index) => (
        <div className="flex flex-row gap-2 items-center mb-4 pb-4 border-b-2 border-gray-200" key={index}>
          <img src={cartItem.image} className="w-20 h-24 rounded-md" />
          <div className="flex flex-col pr-16">
            <h2 className="font-semibold">{cartItem.name}</h2>
            <p className="text-[13px] text-gray-500">
              size: {cartItem.size} | color: {cartItem.color}
            </p>
            <div className="flex flex-row gap-4 items-center">
              <button
                className="w-8 h-8 rounded border-2 border-gray-300"
                onClick={() => updateQty(cartItem, cartItem.quantity - 1)}
              >
                -
              </button>
              <p>{cartItem.quantity}</p>
              <button
                className="w-8 h-8 rounded border-2 border-gray-300 "
                onClick={() => updateQty(cartItem, cartItem.quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-3">
              <h2 className="font-semibold">${cartItem.price}</h2>
              <button onClick={() => removeItem(cartItem)}>
                <FiTrash2 className="text-red-500 text-2xl" />
              </button>
            </div>
          </div>
        </div>
      ))}
      {carts.length === 0 && <p className="text-gray-500">Cart is empty.</p>}
    </div>
  );
};

export default CartItem;
