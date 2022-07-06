import { ItemContext } from "../../context/items";
import { FavContext } from "../../context/fav";
import { CartContext } from "../../context/Cart";
import { useContext, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { Card } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Form, Row, Col, FormGroup, Label, Input } from "reactstrap";
import { When } from "react-if";
import cookie from 'react-cookies';
import './items.css'
import { Link } from "react-router-dom";
import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import { CommentContext } from "../../context/comment";


export default function Items(props) {
    const itemscon = useContext(ItemContext);
    const favcon = useContext(FavContext);
    const cartcon = useContext(CartContext);
    const commentcon = useContext(CommentContext);
    // const [show, setShow] = useState(false);
    // // const [popShow, setPopShow] = useState(true);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const [itemName, setItemName] = useState("");
    const [itemImg, setItemImg] = useState("");
    const [itemDescreption, setItemDescreption] = useState("");
    const [itemPrice, setItemPrice] = useState(0);
    const handelSubmit = (e) => {
        e.preventDefault();
        itemscon.addItem(itemName, itemImg, itemDescreption, itemPrice);
        itemscon.setShow(false);

        window.location.reload();

    }
    // const handelFave = (e) => {
    //     p.preventDefault();
    //     itemscon.setFavoriteItems()
    // }
    useEffect(() => {
        console.log(22222, itemscon)
        commentcon.getComments();

    }, []);

    return (
        <>
            <div className="butttonnnsss">

            </div>
            <div className="cardcon">
                {
                    itemscon.items.length > 0 &&
                    itemscon.items.map((item) => {

                        return (
                            <>


                                <Card className="cardcon" style={{ width: '20rem' }}>
                                    <Card.Img variant="top" src={item.itemImg} />
                                    <Card.Body>
                                        <Popup className="pop-up-class" trigger={<Button style={{ marginRight: "3.5%" }}> Details</Button>} position="right center">
                                            {/* <br/> */}
                                            <div className="details">

                                                <p style={{ margin: "20px 0 0  0" }}> {
                                                    `Name : ${item.itemName}`
                                                }</p>
                                                <img src={item.itemImg} style={{ height: "200px", width: "200px" }} />
                                                {/* <br/> */}
                                                <p >
                                                    {`Descreption : ${item.itemDescreption}`}
                                                </p>
                                                <hr />

                                                {/* <br/> */}
                                                <p >
                                                    {`price : ${item.itemPrice}`}
                                                </p>
                                                <hr />

                                                <p>

                                                    {commentcon.content.map((ele) => {
                                                        return (
                                                            <>
                                                                <p>
                                                                    <span>
                                                                        user :  {ele.userName} </span>

                                                                    <span>comments :{ele.commentContent}</span>
                                                                    <When condition={ele.userId === cookie.load('id')}>

                                                                        <Button onClick={() => {
                                                                            commentcon.deleteComment(ele.id)
                                                                        }} variant="danger">
                                                                            Delete comment
                                                                        </Button>
                                                                    </When>
                                                                </p>
                                                            </>
                                                        )
                                                    })}
                                                </p>

                                            </div>
                                        </Popup>
                                        <Button onClick={
                                            () => {
                                                favcon.addFavItem(item)
                                            }
                                        }>
                                            Add to favourite
                                        </Button>

                                        <Button onClick={() => {
                                            cartcon.addCartItem(item)
                                        }} style={{ margin: "2.5% 2.5% 2.5% 0" }} >
                                            Add to cart
                                        </Button>
                                        <When condition={item.userId === cookie.load('id')}>
                                            <Link to={`update/${item.id}`}>
                                                <Button style={{ margin: "2%  3% 0 0" }}>
                                                    Update
                                                </Button>
                                            </Link>
                                            <Button onClick={() => { itemscon.deleteItem(item.id) }}>
                                                Delete
                                            </Button>
                                        </When>

                                    </Card.Body>
                                    <Card.Footer>
                                        <input type="text" placeholder="write comment" onChange={
                                            (e) => {
                                                e.preventDefault();
                                                commentcon.setComments(e.target.value)
                                            }
                                        } />
                                        <Button onClick={() => {
                                            commentcon.setItemId(item.id)
                                            commentcon.addComment()

                                        }}>Comment</Button>
                                    </Card.Footer>
                                </Card>
                            </>
                        )
                    })
                }
            </div>
            <Modal show={itemscon.show} onHide={itemscon.handleClose} class="modal-dialog modal-lg">
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: "#005240" }}>
                        Add Item
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        onSubmit={handelSubmit}
                        style={{ width: "70%", margin: "auto" }}
                    >
                        <Row style={{ marginTop: "0px" }}>
                            <Col md={6}>
                                <FormGroup>

                                    <Input
                                        id="itemName"
                                        name="itemName"
                                        placeholder="itemName"
                                        type="text"
                                        onChange={(e) => { setItemName(e.target.value) }}
                                        required
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>

                                <Input
                                    id="examplePassword"
                                    name="itemImg"
                                    placeholder="itemImg"
                                    type="text"
                                    onChange={(e) => { setItemImg(e.target.value) }}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Input
                                id="itemDescreption"
                                name="itemDescreption"
                                placeholder="itemDescreption"
                                type="text"
                                onChange={(e) => { setItemDescreption(e.target.value) }}
                                required
                            />
                            <Label for="itemPrice"></Label>
                            <Input
                                id="itemPrice"
                                name="itemPrice"
                                placeholder="itemPrice"
                                onChange={(e) => { setItemPrice(e.target.value) }}
                                type="number"
                                required
                            />

                            <Button color="success" type="submit" style={{ marginTop: "20px" }}>
                                Add Item
                            </Button>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )

}

