import './Header.css'
import { When } from 'react-if'
import { AuthContext } from '../../context/Auth'
import { useContext, useEffect } from 'react'
export default function Header() {
    const auth = useContext(AuthContext)
    return (
        <>
   <When condition={auth.isLoggedIn}>

        <header className="mainheader">
            <h1>Online store</h1>
 
        </header>
            
            <div>

    <button id='signOut' onClick={auth.signOut}>
     sigon out
   </button>
    </div>
    </When>
    </>
        
    )
}