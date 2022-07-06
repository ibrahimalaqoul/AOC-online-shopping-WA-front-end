// import './Header.css'
import { When } from 'react-if'
import { AuthContext } from '../../context/Auth'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import{Button} from 'react-bootstrap'
import { ItemContext } from "../../context/items";

    


export default function Header() {
    const auth = useContext(AuthContext)
    const itemscon = useContext(ItemContext);
    return (
        <>
            <When condition={auth.isLoggedIn}>

                <div className="class-header" style={{display:"flex",flexDirection:"row" ,justifyContent:"space-between", backgroundColor:"#4070f4"}}>
                   <div className="mainheader" style={{display:"flex" ,marginLeft:"10px"}}>
                    <h1>Online store</h1>
                    <Button variant="primary" style={{margin:"0 0 15px 0"}} onClick={itemscon.handleShow}>Add Items</Button>
                    <Link to={`/fav`}>
                <Button variant="primary">
                    Show Fav
                </Button>
            </Link>
            <Link to={`/cart`}>
                <Button variant="primary">
                    Show Cart
                </Button>
            </Link>
            </div>
            <div>
                    <button id='signOut' onClick={auth.signOut} >
                        Log out
                    </button>

            </div>
                   
                </div>
            </When>
        </>

    )
}