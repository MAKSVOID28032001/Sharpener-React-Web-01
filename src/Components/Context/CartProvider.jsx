import React, { useState, useEffect } from "react";
import CartContext from "./CartContext";
const CartProvider = props => {
    const [cart, setCart] = useState([]);
    const [MenuItems, SetMenuItems] = useState([]);

    useEffect(() => {
        // Load data from localStorage on component
        const storedMenuItems = localStorage.getItem("MenuItems");
        if (storedMenuItems) {
            SetMenuItems(JSON.parse(storedMenuItems));
        }

        // Load cart data from localStorage
        const storedCart = localStorage.getItem("Cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        // Save cart data to localStorage whenever cart changes
        localStorage.setItem("Cart", JSON.stringify(cart));
    }, [cart]);

    const AddToMenu = newItem => {
        SetMenuItems(prevItems => {
            const updatedItems = [...prevItems, newItem];
            // Save data to localStorage
            localStorage.setItem("MenuItems", JSON.stringify(updatedItems));
            return updatedItems;
        });
    };

    //For List.jsx
    const updateMenuItemsInStorage = (items) => {
        localStorage.setItem("MenuItems", JSON.stringify(items));
    };

    //For Cart.jsx
    const updateCartInStorage = (cartData) => {
        localStorage.setItem("Cart", JSON.stringify(cartData));
    };

    const AddMedItems = newItem => {
        // console.log(newItem);
        const menuItem = MenuItems.find((item) => item.id === newItem.id);
        if (!menuItem || menuItem.availableQuantity === 0) {
            alert("Item out of stock!");
            return;
        }
        const updatedMenuItems = MenuItems.map((item) =>
            item.id === newItem.id ? { ...item, availableQuantity: item.availableQuantity - 1 } : item
        );
        SetMenuItems(updatedMenuItems);
        updateMenuItemsInStorage(updatedMenuItems);

        //-----------------------------Cart.jsx---------------------------------------
        const existingItemIndex = cart.findIndex((item) => item.id === newItem.id);
        if (existingItemIndex !== -1) {
            // If item exists in the cart, update its quantity
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].quantity += 1;
            setCart(updatedCart);
        } else {
            // If item doesn't exist in the cart, add it
            const updatedCart = [...cart, { ...newItem, quantity: 1 }];
            setCart(updatedCart);
        }
    }
    const RemoveMedItems = (deletingItem) => {
        // Update available quantity in menuItems
        const updatedMenuItems = MenuItems.map((item) =>
            item.id === deletingItem.id ? { ...item, availableQuantity: item.availableQuantity + 1 } : item
        );
        SetMenuItems(updatedMenuItems);
        updateMenuItemsInStorage(updatedMenuItems);

        // Find index of deletingItem in cart
        const deletingItemIndex = cart.findIndex((item) => item.id === deletingItem.id);

        // If quantity of deletingItem is 1, remove it from cart
        if (deletingItem.quantity === 1) {
            const updatedCart = cart.filter((item) => item.id !== deletingItem.id);
            setCart(updatedCart);
        } else {
            // Decrease quantity by 1
            const updatedItem = {
                ...deletingItem,
                quantity: deletingItem.quantity - 1,
            };
            const updatedCart = [...cart];
            updatedCart[deletingItemIndex] = updatedItem;
            setCart(updatedCart);
        }
        updateCartInStorage(cart);
    }

    const OBJ = {
        cart,
        MenuItems,
        AddToMenu,
        AddMedItems,
        RemoveMedItems,
    };

    return (
        <CartContext.Provider value={OBJ}>
            {props.children}
        </CartContext.Provider>
    );
};
export default CartProvider;