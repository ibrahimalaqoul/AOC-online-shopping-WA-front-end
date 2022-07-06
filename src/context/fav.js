import React, { useState } from "react";
import axios from 'axios';
import cookie from 'react-cookies';

export const FavContext = React.createContext();

export default function FavCon(props) {
    const api = "http://localhost:3010"
    const [favItems, setFavItems] = useState([])

    const addFavItem = async (item) => {
        axios.post(`${api}/favs/${cookie.load('id')}`, {
            itemName:item.itemName,
            itemImg: item.itemImg,
            itemDescreption: item.itemDescreption,
            itemPrice: item.itemPrice
        }, {
            headers: { 'Authorization': `Bearer ${cookie.load('token')}` }
        }).then((response) => {
            // setFavItems([...favItems, response.data])
            console.log(response.data.fav)
        }).catch((error) => {
            console.log(error)
        }
        )
    }
    const getFavItems = async () => {
        axios.get(`${api}/favs/${cookie.load('id')}`, {
            headers: { 'Authorization': `Bearer ${cookie.load('token')}` }
        }).then((response) => {
            console.log(response.data.favs)
            setFavItems(response.data.favs)
        }).catch((error) => {
            console.log(error)
        }
        )
    }
    const deleteFavItem = async (id) => {
        axios.delete(`${api}/favs/${id}`, {
            headers: { 'Authorization': `Bearer ${cookie.load('token')}` }
        }).then((response) => {
            console.log(response.data)
            setFavItems(response.data.favs)
        }).catch((error) => {
            console.log(error)
        }
        ).finally(() => {
            getFavItems()
        })
    }
    const state = {
        addFavItem,
        getFavItems,
        deleteFavItem,
        favItems,
        
    }
   
        return (
            <FavContext.Provider value={state}>
                {props.children}
            </FavContext.Provider>
        )
    
}