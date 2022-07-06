import { When } from "react-if";
import SignIn from "./auth/signin";
import { useContext,useEffect } from "react";
import Items from "./items/items";
import { ItemContext } from "../context/items";
import {AuthContext} from "../context/Auth";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import 'reactjs-popup/dist/index.css';
import { Button } from "react-bootstrap";
import {Link} from "react-router-dom";
   
export default function Home(){
    const auth = useContext(AuthContext) 
    const itemscon = useContext(ItemContext)
    useEffect(()=>{
        if(auth.isLoggedIn){
            itemscon.getAllItems()
        }
    },[])
return(
    <>
<When condition={auth.isLoggedIn}>
<Header/>
</When>

<div>
    <When condition={auth.isLoggedIn}>
    <Items/>
    </When>
 <SignIn/>

</div>
<When condition={auth.isLoggedIn}>
<Footer/>
</When>
</>
)
}