import { useState } from "react"
import CartContext from "./CartContext"

const CartContextProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([])
    const [order, setOrder] = useState([])

    return (
        <CartContext.Provider value={{ cartItems , setCartItems, order, setOrder }} >
            { children }
        </CartContext.Provider>
    )    
}

export default CartContextProvider