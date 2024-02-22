import React, { useContext, useState, useEffect, useCallback } from "react";
import '../Style/CartButton.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import CartContext from "../Context/CartContext";

const CartButton = props => {
    const cartCtx = useContext(CartContext);
    const [cartQuantity, setCartQuantity] = useState(0);

    // Function to update cart quantity
    const updateCartQuantity = useCallback(() => {
        const totalQuantity = cartCtx.cart.reduce((total, item) => total + item.quantity, 0);
        setCartQuantity(totalQuantity);
    }, [cartCtx.cart]);

    // Update cart quantity when the context changes
    useEffect(() => {
        updateCartQuantity();
    }, [cartCtx.cart, updateCartQuantity]); // Listen for changes in cart context

    return (
        <button className="cart-btn" onClick={props.Click}>
            <FontAwesomeIcon icon={faCartShopping} size="xl" style={{ color: "#ffffff", }} />
            <p className="C-RT">{cartQuantity}</p>
        </button>
    );
}

export default CartButton;
