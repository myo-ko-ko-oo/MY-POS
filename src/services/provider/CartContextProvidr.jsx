import React, { createContext, useState, useContext } from "react";


const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        // Load cart from localStorage or initialize to an empty array
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
      });
    
      const addToCart = (product) => {
        const isProductInCart = cart.some(item => item.id === product.id);
        if (!isProductInCart) {
          const updatedCart = [...cart, product];
          setCart(updatedCart);
          localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
      };
    
      const removeFromCart = (productId) => {
        const updatedCart = cart.filter(product => product.id !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      };
    
      const updateQuantity = (productId, quantity) => {
        const updatedCart = cart.map(product => 
          product.id === productId ? { ...product, quantity } : product
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      };
      const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
      };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart,updateQuantity,clearCart}}
    >
      {children}
    </CartContext.Provider>
  );
};
