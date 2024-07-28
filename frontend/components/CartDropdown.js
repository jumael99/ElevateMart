// components/CartDropdown.js

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "@/store/slices/cartSlice";

const CartDropdown = ({ isOpen, toggleCart }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleIncrease = (item) => {
    dispatch(increaseQuantity(item));
  };

  const handleDecrease = (item) => {
    dispatch(decreaseQuantity(item));
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
      {cart.cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.cart.map((item) => (
              <li key={item._id} className="flex justify-between items-center">
                <div>
                  <p>{item.name}</p>
                  <p>${item.itemPrice}</p>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => handleDecrease(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrease(item)}>+</button>
                  </div>
                </div>
                <button onClick={() => handleRemove(item)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-4">
            <p>Total: ${cart.totalPayableAmount}</p>
            <button onClick={toggleCart} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDropdown;
