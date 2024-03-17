import React from "react";
import { useValue } from "../productContext.js";
import "../Styles/cart.css";

function Error() {
    const { cartItem, getTotalCartItemPrice, makeOrder, removeItemFromCart, incDecProductQty } = useValue();

    return (
        <div>
            <h1>Page Not Found </h1>
        </div>
    );
}

export default Error;
