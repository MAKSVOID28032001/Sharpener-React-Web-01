import React from "react";
const CartContext = React.createContext({
    MedCart: [],
    AddMedItems : (item) => {},
    RemoveMedItems: (item) => {},
    AddToMenu: (item) => {},
    MenuItems: []
});
export default CartContext;