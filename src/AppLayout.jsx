import { useState } from 'react';
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function AppLayout() {
    const [cart, setCart] = useState([]);

    const handleAddToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);

            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                    ? {...item, quantity: item.quantity + product.quantity}
                    : item
                );
            }
            return [...prev, product]
        });
    };

    const updateQuantity = (id, newQty) => {
        setCart(prev => prev.map(item => item.id === id ? {...item, quantity: newQty} : item));
    };

    const removeFromCart = id => setCart(prev => prev.filter(item => item.id !== id));

    return (
        <>
            <Navbar cart={cart}/>
            <main>
                <Outlet context={{cart, handleAddToCart, updateQuantity, removeFromCart}}/>
            </main>
        </>
    )
}