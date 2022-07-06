import { AuthContext } from "../../context/Auth";
import {ItemContext} from "../../context/items";
import { useContext ,useState} from "react";
import { When } from "react-if";
import{Link} from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import'./auth.css'
export default function SignIn(props) {
    const itemvocx = useContext(ItemContext);
    const auth = useContext(AuthContext)
    const[userName,setUserName]=useState('')
    const[password,setPassword]=useState('')
    const handleSignIn=()=>{
        auth.signIn(userName,password)
    }

    return (
        <>
            <When condition={!auth.isLoggedIn}>
        <div class="container">
        <div class="forms">
            <div class="form login">
                <span class="title">Login</span>
                <form action="#" onSubmit={handleSignIn}>
                    <div class="input-field">
                        <input type="text" placeholder="Enter your user name" required onChange={(e)=>{
                            setUserName(e.target.value)
                        }}/>
                        <i class="uil uil-envelope icon"></i>
                    </div>
                    <div class="input-field">
                        <input type="password" class="password" placeholder="Enter your password" required onChange={(e)=>{
                            setPassword(e.target.value)
                        }}/>
                        <i class="uil uil-lock icon"></i>
                        <i class="uil uil-eye-slash showHidePw"></i>
                    </div>

                    <div class="checkbox-text">
                        <div class="checkbox-content">
                            <input type="checkbox" id="logCheck"/>
                            <label for="logCheck" class="text">Remember me</label>
                        </div>
                        
                        <a href="#" class="text">Forgot password?</a>
                    </div>

                    <div class="input-field button">
                        <input type="submit" value="Login"/>
                    </div>
                </form>

                <div class="login-signup">
                    <span class="text">Not a member?
                        {/* <a href="#" class="text signup-link">Signup Now</a> */}
                        <Link to="/signup" class="text signup-link">Signup Now</Link>
                    </span>
                    
                </div>
            </div>

            
        </div>
    </div>
   
            </When>
         
            </>

    )



}