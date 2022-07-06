import { AuthContext } from "../../context/Auth";
import { useContext ,useState} from "react";
import{Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";


import'./auth.css'
export default function SignUp(){
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('')
    const[firstName,setFirstName]=useState('')
    const[lastName,setLastName]=useState('')
    const[userName,setUserName]=useState('')

    const auth = useContext(AuthContext)

    const navigate =useNavigate()
    const handleSigUp=(e)=>{
    e.preventDefault()
        auth.signUp(email,password,userName,firstName,lastName)
    }
return(
    <div className="form-signup">
    <div class="form signup">
    <span class="title">Registration</span>

    <form action="#" onSubmit={handleSigUp}>
        <div class="input-field">
            <input type="text" placeholder="Enter your user name" onChange={(e)=>{
                setUserName(e.target.value)
            }} required />
            <i class="uil uil-user"></i>
        </div>
        <div class="input-field">
            <input type="email" placeholder="Enter your email" onChange={(e)=>{
                setEmail(e.target.value)
            }} required/>
            <i class="uil uil-envelope icon"></i>
        </div>
        <div class="input-field">
            <input type="password" class="password" placeholder="Create a password" onChange={(e)=>{
                setPassword(e.target.value)
            }} required/>
            <i class="uil uil-lock icon"></i>
        </div>
         <div class="input-field">
            <input type="text"  placeholder="Enter your first Name"  onChange={(e)=>{
                setFirstName(e.target.value)
            }} required/>
            <i class="uil uil-lock icon"></i>
            <i class="uil uil-eye-slash showHidePw"></i>
        </div>

        <div class="input-field">
            <input type="text"  placeholder="Enter your Last Name" onChange={(e)=>{
                setLastName(e.target.value)
            }} required/>
            <i class="uil uil-lock icon"></i>
            <i class="uil uil-eye-slash showHidePw"></i>
        </div>

        <div class="checkbox-text">
            <div class="checkbox-content">
                <input type="checkbox" id="termCon"/>
                <label for="termCon" class="text">I accepted all terms and conditions</label>
            </div>
        </div>

        <div class="input-field button">
            <input type="submit" value="Signup" onClick={()=>{
setTimeout(()=>{
    navigate('/')

},2000)
            }} style={
                {backgroundColor:'#FBB454'}
            } />
        </div>
    </form>

    <div class="login-signup">
        <span class="text">Already a member?
            {/* <a href="#" class="text login-link">Login Now</a> */}
            <Link to="/" class="text login-link" style={{color:"white"}}>Login Now</Link>
        </span>
    </div>
</div>
</div>
)
}