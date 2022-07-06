import React, { useState, useEffect } from "react";
import JWT from 'jwt-decode';
import axios from 'axios';
import cookie from 'react-cookies';
import base64 from 'base-64';

export const AuthContext = React.createContext();

export default function Auth(props) {
    const api = "http://localhost:3010"

    const [user, setUser] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const signUp = async (email, password, userName, firstName, lastName) => {
        console.log({ email, password, userName, firstName, lastName })
        await axios.post(`${api}/signup/users`, {
            email: email,
            password: password,
            userName: userName,
            firstName: firstName,
            lastName: lastName
        }).then((response) => {
            console.log(response.data)

        })
    }
    const signIn = async (userName, password) => {
        axios.post(`${api}/signin`, {
            userName: userName,
            password: password
        },
            { headers: { 'Authorization': `Basic ${base64.encode(`${userName}:${password}`)}` } }
        ).then((response) => {
            tokenChecker(response.data)
        })
    }
    const tokenChecker = (data) => {
        if (data) {
            const token = JWT(data.signedInUser.token)
            if (token) {
                setUser(data.signedInUser)
                setIsLoggedIn(true)
                cookie.save('token', data.signedInUser.token)
                cookie.save('useName', data.signedInUser.userName)
                cookie.save('id', data.signedInUser.id)
            } else {
                setIsLoggedIn(false)
                setUser({})
            }
        } else {
            setIsLoggedIn(false)
            setUser({})
        }
    }
    const signOut = () => {
        setIsLoggedIn(false)
        setUser({})
        cookie.remove('id')
        cookie.remove('token')
        cookie.remove('useName')

    }
    useEffect(() => {
        const data = cookie.load('token');
        if (data) {
            setIsLoggedIn(true);
        }
    }, []);

    const state = {
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        signUp,
        signIn,
        signOut,
    }
    return (
        <AuthContext.Provider value={state}>
            {props.children}
        </AuthContext.Provider>
    )

}