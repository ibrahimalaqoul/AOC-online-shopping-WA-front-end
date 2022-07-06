import { CartContext } from "../../context/Cart";
import { useContext, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import {  Table } from "react-bootstrap";

export default function Cart() {
    const navigate = useNavigate();
    const cartcon = useContext(CartContext);
    useEffect(() => {
        cartcon.getCartItems();
        console.log('cart', cartcon.cartItems);
    }, []);
    return (

        <div style={{ height: "100vh", padding: "1rem" }}>
            <Button variant="primary" onClick={() => {

                navigate('/')


            }} style={{ margin: "0 0 2% 0" }}>Go Back to home</Button>
            <div className='cartclass'>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            {/* <th>#</th> */}
                            <th>Item Name</th>
                            <th>Item  Price</th>
                            <th>Delete Item</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cartcon.cartItems?.length > 0 &&
                            cartcon.cartItems.map((item) => {

                                return (
                                    <tr>
                                        <td>{item.itemName}</td>
                                        <td>{item.itemPrice}</td>
                                        <td>
                                        <Button variant='danger' onClick={() => {
                                        cartcon.deleteCartItem(item.id)
                                        }} >
                                        Delete
                                        </Button>
                                            
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </div>

    )
}
                                // <Card className="cardcon" style={{ width: "18rem" }}>
                                //     <Card.Img variant="top" />
                                //     <Card.Body>
                                //         <Card.Text>
                                //             <p>{item.itemName}</p>
                                //             <p>{item.itemPrice}</p>
                                //         </Card.Text>
                                //     </Card.Body>
                                //     <Card.Footer style={{ width: "100%" }}>
                                //         <Button variant='danger' onClick={() => {
                                //             cartcon.deleteCartItem(item.id)
                                //         }} >
                                //             Delete
                                //         </Button>
                                //     </Card.Footer>
                                // </Card>