import React, { useState,useEffect } from "react";
import axios from 'axios';
import cookie from 'react-cookies';

export const ItemContext = React.createContext();

export default function Items(props) {

    const api = "http://localhost:3010"

    const [items, setItems] = useState([])
    const [oneItem, setOneItem] = useState({})
    const [favoriteItems, setFavoriteItems] = useState([])
    
    
    useEffect(() => {
        getAllItems();
        console.log(1111111,items);
        console.log(333333,favoriteItems);
    }, [])
    const addItem = async (itemName, itemImg,itemDescreption,itemPrice) => {
        axios.post(`${api}/addItem/${cookie.load('id')}`, {
            itemName: itemName,
            itemImg: itemImg,
            itemDescreption: itemDescreption,
            itemPrice: itemPrice
        },{
            headers: { 'Authorization': `Bearer ${cookie.load('token')}` }
        }).then((response) => {
            setItems([...items,response.data])            
        }).catch((error) => {
            console.log(error)
        })
    }
    const getAllItems = async () => {
        axios.get(`${api}/items`, {
            headers: { 'Authorization': `Bearer ${cookie.load('token')}` }
        }).then((response) => {
            // console.log(response.data)
            setItems(response.data.allitems)
        }).catch((error) => {
            console.log(error)
        })
    }

    const  getItemById = async (id) => {
        axios.get(`${api}/items/${id}`,{
            headers: { 'Authorization': `Bearer ${cookie.load('token')}` }
        } ).then((res)=>{
            console.log(res.data)
            setOneItem(res.data)
        })
    }
    const updateItem = async (id, itemName, itemImg, itemDescreption, itemPrice) => {
        axios.put(`${api}/updateItem/${id}`,{
            itemName: itemName,
            itemImg: itemImg,
            itemDescreption: itemDescreption,
            itemPrice: itemPrice

        },{
            headers: { 'Authorization': `Bearer ${cookie.load('token')}` }
        }).then((res)=>{
            console.log(res.data)
           setItems([...items,res.data])
        })
    }
    const deleteItem = async (id) => {
        axios.delete(`${api}/deleteItem/${id}`,{
            headers: { 'Authorization': `Bearer ${cookie.load('token')}` }
        }).then((res)=>{
            console.log(res.data)
            // setDeletedItem(res.data)
            setItems(items.filter(item => item.id !== id))
        })
    }
    const state={
        items,
        addItem,
        getAllItems,
        getItemById,
        updateItem,
        deleteItem,
        favoriteItems,
        setFavoriteItems

    }
    return(
        <ItemContext.Provider value={state}>
            {props.children}
        </ItemContext.Provider>
    )
}