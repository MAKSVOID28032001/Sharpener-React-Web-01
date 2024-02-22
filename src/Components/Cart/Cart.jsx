import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import '../Style/Cart.css';
import CartContext from "../Context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
const Cart = props => {
    const cartCtx = useContext(CartContext);
    const [TotalAmount, SetTotalAmount] = useState(0);
    useEffect(() => {
        let total = 0;
        cartCtx.cart.forEach(item => {
            total += (item.price * item.quantity);
        });
        SetTotalAmount(total);
    }, [cartCtx.cart]);

    // Update cart quantity in local storage
    useEffect(() => {
        localStorage.setItem("CartQuantity", cartCtx.cart.reduce((total, item) => total + item.quantity, 0));
    }, [cartCtx.cart]);

    return ReactDOM.createPortal(
        <>
            <div className="Container">
                <div className="Cart-Box">
                    <div className="Cart-Array">
                        {
                            cartCtx.cart.map((item, index) => (
                                <div key={index} className="CartItem">
                                    <p>{item.name}</p>
                                    <p>{item.about}</p>
                                    <p>{item.price} /-</p>
                                    <p>{item.date}</p>
                                    <p>{item.quantity}</p>
                                    <button onClick={() => cartCtx.RemoveMedItems(item)} className="BTN1 MIN">
                                        <FontAwesomeIcon icon={faCartArrowDown} style={{ color: "#ffffff", }} />
                                    </button>
                                    <button onClick={() => cartCtx.AddMedItems(item)} className="BTN1 MAX">
                                        <FontAwesomeIcon icon={faCartShopping} size="lg" style={{ color: "#ffffff", }} />
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                    <div className="TotalAmount">
                        <p className="TA">Total Amount:</p>
                        <p className="TA">{TotalAmount} /-</p>
                    </div>
                    <div className="Cart-Btns">
                        <button className="BTN CNCL" onClick={props.OnOffCart}>Cancel</button>
                        <button className="BTN ORDR" onClick={props.OnOrder}>Order</button>
                    </div>
                </div>
            </div>
        </>, document.getElementById("root1")
    );
}
export default Cart;