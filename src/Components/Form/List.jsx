import React, { useContext } from "react";
import '../Style/List.css';
import CartContext from "../Context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
const List = () => {
    const menuCtx = useContext(CartContext);
    return (
        <>
            <div className="ListBox">
                {
                    menuCtx.MenuItems.map((item, index) => (
                        <div key={index} className="ListItem">
                            <p className="pp">{item.name}</p>
                            <p className="pp">{item.about}</p>
                            <p className="pp">{item.date}</p>
                            <p className="pp">{item.price} /-</p>
                            <p className="pp">{item.availableQuantity}</p>
                            <button type="button" className="CBTN" onClick={() => menuCtx.AddMedItems(item)}>
                                <FontAwesomeIcon icon={faCartShopping} size="lg" style={{ color: "#ffffff", }} />
                            </button>
                        </div>
                    ))
                }
            </div>
        </>
    );
}
export default List;