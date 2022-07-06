import React, { useState } from "react";
import axios from 'axios';
import cookie from 'react-cookies';


export const CartContext = React.createContext();
export default function CartCon(props){

    const api = "http://localhost:3010"
    const [cartItems, setCartItems] = useState([])
    const addCartItem = async (item) => {
        axios.post(`${api}/cart/${cookie.load('id')}`, {
            itemName:item.itemName,
            itemPrice: item.itemPrice
        }).then((response) => {
            console.log(response.data.cart)
        }).catch((error) => {
            console.log(error)
        })
    }
    const getCartItems = async () => {
        axios.get(`${api}/cart/${cookie.load('id')}`, {
            headers: { 'Authorization': `Bearer ${cookie.load('token')}` }
        }).then((response) => {
            console.log(response.data.cart)
           

            setCartItems(response.data.cart)
        }).catch((error) => {
            console.log(error)
        }
        )
    }
    const deleteCartItem = async (id) => {
        axios.delete(`${api}/cart/${id}`, {
            headers: { 'Authorization': `Bearer ${cookie.load('token')}` }
        }).then((response) => {
            console.log(response.data)
            setCartItems(response.data.cart)
        }).catch((error) => {
            console.log(error)
        }
        ).finally(() => {
            getCartItems()
        }
        )
    }
    const state = {
        addCartItem,
        getCartItems,
        deleteCartItem,
        cartItems,
    }
    return(
        <CartContext.Provider value={state}>
            {props.children}
        </CartContext.Provider>
    )
}
