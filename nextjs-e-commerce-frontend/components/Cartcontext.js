import { createContext, useEffect, useState } from "react";


export const CartContext = createContext({});




export function CartContextProvider({ children }) {
    const ls = typeof window !== "undefined" ? window.localStorage : null;
    const [cartProducts, setCartProduct] = useState([]);
    
    useEffect(() => {
        if (cartProducts?.length > 0) {
            ls?.setItem('cart', JSON.stringify(cartProducts));
        }
    }, [cartProducts]);

    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCartProduct(JSON.parse(ls.getItem('cart')))
        }

    }, [])

    function addProduct (productId) {
        setCartProduct(prev => [...prev, productId]);
    }


    return (
        <CartContext.Provider value={{cartProducts, setCartProduct, addProduct}}>
            {children}
        </CartContext.Provider>
    )

}