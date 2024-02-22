import React from "react";
import '../Style/Head.css';
import CartButton from "./CartButton";
const Head = props => {
    return (
        <>
            <div className="Header">
                <div className="HD1">
                    <h1 className="H1">Medicine Shop</h1>
                </div>
                <div className="HD2">
                    <CartButton Click={props.OnShowCart} />
                </div>
            </div>
        </>
    );
}
export default Head;