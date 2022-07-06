import Button from 'react-bootstrap/Button';
import './fav.css'
import { Card } from "react-bootstrap";
// import { When } from "react-if";
import { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FavContext } from '../../context/fav';

export default function Fav(props) {
    const favcon = useContext(FavContext);
    const navigate = useNavigate();
    useEffect(() => {
        console.log('favs', favcon.favItems);
        favcon.getFavItems();
    }, [])

    return (
        <div style={{ height: "100vh", padding: "1rem" }}>
             <Button variant="primary" onClick={() => {
                    navigate('/')
            }} style={{margin:"0 0 2% 0"}}>Go Back to home</Button>
            <div className='favclass'>
                {
                    favcon.favItems.length > 0 &&
                    favcon.favItems.map((item) => {
                        return (
                            <Card className="cardcon" style={{ width: '18rem' }}>
                                <Card.Img variant="top" />
                                <Card.Body>
                                    <Card.Text>
                                        <p>{item.itemName}</p>
                                        <img src={item.itemImg} style={{ height: "200px", width: "200px" }}></img>
                                        <p>{item.itemDescreption}</p>
                                        <p>{item.itemPrice}</p>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer style={{ width: "100%" }}>
                                    <Button variant='danger' onClick={() => {
                                        favcon.deleteFavItem(item.id)
                                    }} >
                                        Delete
                                    </Button>
                                </Card.Footer>
                            </Card>

                        )
                    })
                }
            </div>
           

        </div>
    )

}