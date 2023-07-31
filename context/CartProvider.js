import React from "react";
import CartContext from "./CartContext";

const CartProvider = (props) => {
  // Add item to cart
  const addItemToCartHandler = (item) => {};
  // Remove item from cart
  const removeItemFromCartHandler = (item) => {};

  const cartContext = {
    item: [],
    totalPrice: 0,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
