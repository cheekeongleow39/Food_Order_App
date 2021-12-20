import React, { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [btnIsHightlighted, setBtnIsHightlighted] = useState(false);

  const cartCtx = useContext(CartContext);

  const fnreducer = (currentNumber, item) => {
    console.log(item)
    return 0;
     //return currentNumber + item.amount
  };

  console.log(cartCtx.items);
  const numberOfCartItems = cartCtx.items.reduce(fnreducer, 0);

  // ctxCart.items.reduce((currNumber, item) => {
  //   return currNumber + item.amount;
  // }, 0);

  const {items} = cartCtx;

  const btnClasses = `${classes.button} ${btnIsHightlighted ? classes.bump : ''}`;

  useEffect(() =>{
    if(cartCtx.items.length === 0){
      return;
    }

    setBtnIsHightlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHightlighted(false);
    }, 300);

    //cleanup function
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
