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

    function removeProduct(productId) {
        setCartProduct(prev => {
            const indexOfProduct = prev.indexOf(productId);
            if (indexOfProduct !== -1) {
                return  prev.filter((value, index) => index !== indexOfProduct)
            }
            return prev;
        })
    }


    return (
        <CartContext.Provider value={{cartProducts, setCartProduct, addProduct, removeProduct}}>
            {children}
        </CartContext.Provider>
    )

}