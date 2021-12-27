import React, { useContext } from "react";
import classes from "./Cart.module.css";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  // Example 1
  // const cartItems = (
  //   <ul className={classes["cart-items"]}>
  //     {[
  //       {
  //         id: "c1",
  //         name: "Sushi",
  //         amount: 2,
  //         price: 12.99,
  //       },
  //     ].map((item) => (
  //       <li>{item.name}</li>
  //     ))}
  //   </ul>
  // );

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  // Example 2
  // const cartitems = (
  //   <ul className={classes["cart-items"]}>
  //     {cartCtx.items.map((item) => (
  //       <li>{item.name}</li>
  //     ))}
  //   </ul>
  // );

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount:1});
  };

  

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div>
        <span className={classes.total}>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes["class.button"]}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
