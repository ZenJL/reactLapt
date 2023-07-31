import React, { createContext } from "react";

const CartContext = createContext({
  item: [],
  totalPrice: 0,
  addItem: (item) => {},
  removeItem: (itemId) => {},
});

export default CartContext;
