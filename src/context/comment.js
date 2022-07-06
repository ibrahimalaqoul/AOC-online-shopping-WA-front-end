import React,{useEffect, useState} from "react";
import axios from 'axios';
import cookie from 'react-cookies';

export const CommentContext = React.createContext();
export default function CommentCon(props){
    const api = "http://localhost:3010"


    const [comments, setComments] = useState([])
    const [itemId , setItemId] = useState('')
    const[content, setContent] = useState([])
    
useEffect(() => {
    console.log('2',itemId)
    getComments()
}, [comments])

    const addComment = async () => {
        axios.post(`${api}/addComment/${cookie.load('id')}/${itemId}`, {
            commentContent:comments,
            userName:cookie.load('useName'),
        },{
            headers: { 'Authorization': `Bearer ${cookie.load('token')}` }
        }).then((response) => {
            console.log(response.data.comment)
        }).catch((error) => {
            console.log(error)
        }
        )
    }
    const getComments = async () => {
        axios.get(`${api}/comments`, {
            headers: { 'Authorization': `Bearer ${cookie.load('token')}` }
        }).then((response) => {
            console.log(response.data.allcomments)
            setContent(response.data.allcomments)
        }).catch((error) => {
            console.log(error)
        })
    }
    const deleteComment = async (id) => {
        axios.delete(`${api}/deletecomment/${id}`, {
            headers: { 'Authorization': `Bearer ${cookie.load('token')}` }
        }).then((response) => {
            console.log(response.data)
            setComments(response.data.comments)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            getComments()
        }
        )
    }



    const state={
        addComment,
        comments,
        setComments,
        itemId,
        setItemId,
        content,
        getComments,
        deleteComment
    }
    return(
        <CommentContext.Provider value={state}>
            {props.children}
        </CommentContext.Provider>
    )


}