import { useReducer } from "react";
import CartContext from "./CartContext";

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM_TO_CART") {
    const index = state.items.findIndex(
      (item) => item.id === action.payload.id
    );

    let updatedCarts = [];

    if (index !== -1) {
      const quantity = state.items[index].qty + 1;
      const updatedCart = { ...state.items[index], qty: quantity };
      updatedCarts = [...state.items];
      updatedCarts[index] = updatedCart;
    } else {
      updatedCarts = state.items.concat(action.payload);
      // const updatedCarts = [...state.items, action.payload];
    }

    const updatedTotalAmount = state.totalAmount + action.payload.unit; /// because we plus only 1 qty
    console.log(
      "🚀 ~ file: CartProvider.js:23 ~ cartReducer ~ updatedTotalAmount:",
      updatedTotalAmount
    );
    return { items: updatedCarts, totalAmount: updatedTotalAmount };
  }

  if (action.type === "REMOVE_ITEM_FROM_CART") {
    /// find item in cart
    const index = state.items.findIndex((item) => item.id === action.payload);
    const existingItem = state.items[index];

    let updatedCarts = [];

    if (existingItem.qty > 1) {
      /// check if qty > 1, then update quantity
      const quantity = existingItem.qty - 1;
      const updatedCart = { ...existingItem, qty: quantity };
      updatedCarts = [...state.items];
      updatedCarts[index] = updatedCart;
    } else {
      /// else remove item
      updatedCarts = state.items.filter((i) => i.id !== action.payload);
    }

    const updatedTotalAmount = state.totalAmount - existingItem.unit;
    console.log(
      `CartProvider.js: line 46 🐱‍🚀❄🐱‍🏍 updatedTotalAmount ===>`,
      updatedTotalAmount
    );

    return { items: updatedCarts, totalAmount: updatedTotalAmount };
  }
};

const CartProvider = (props) => {
  const [cartState, cartDispatcher] = useReducer(cartReducer, {
    items: [],
    totalAmount: 0,
  });

  const addItemToCartHandler = (item) => {
    cartDispatcher({ type: "ADD_ITEM_TO_CART", payload: item });
  };

  const removeItemFromCartHandler = (id) => {
    cartDispatcher({ type: "REMOVE_ITEM_FROM_CART", payload: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
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
