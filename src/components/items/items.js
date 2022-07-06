import { ItemContext } from "../../context/items";
import { useContext, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Form, Row, Col, FormGroup, Label, Input,Alert } from "reactstrap";
import{When} from "react-if";
import cookie from 'react-cookies';
import'./items.css'
import { Link } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


export default function Items(props) {
    const itemscon = useContext(ItemContext);
    const [show, setShow] = useState(false);
    // const [popShow, setPopShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [itemName, setItemName] = useState("");
    const [itemImg, setItemImg] = useState("");
    const [itemDescreption, setItemDescreption] = useState("");
    const [itemPrice, setItemPrice] = useState(0);
    const handelSubmit = (e) => {
        e.preventDefault();
        itemscon.addItem(itemName, itemImg, itemDescreption, itemPrice);
        setShow(false);
    }
    // const handelFave = (e) => {
    //     p.preventDefault();
    //     itemscon.setFavoriteItems()
    // }
    useEffect(() => {
        console.log(22222, itemscon)

    }, []);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>Add Items</Button>
            <div className="cardcon">
            {
                itemscon.items.length > 0 &&
                itemscon.items.map((item) => {
                    
                    return (
                        <>

                <Card className="cardcon" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={item.itemImg} />
                    <Card.Body>
                        {/* <Card.Text>
                            {item.itemName}
                        </Card.Text> */}
                        
                        {/* <Card.Text>
                        {item.itemDescreption}
                        </Card.Text>
                    // </Card.Body>
                    {
                        item.itemPrice
                    }
                    <Card.Body> */}
                    {/* <Button onClick={()=>{
                  
                    console.log(1)
                    }}> Details</Button> */}
                    {/* <Button onClick={() => setPopShow(true)}>Show Details</Button>;
                    <Alert variant="danger" onClose={() => setPopShow(false)} dismissible>
                 <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>
                 Change this and that and try again. Duis mollis, est non commodo
                 luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                 Cras mattis consectetur purus sit amet fermentum.
                </p>
                </Alert> */}

                    <Popup  trigger={<Button> Details</Button>} position="right center">
                        
                    <div>Item content here</div>
                    {/* <br/> */}
                    <div className="details">

                    
                    <p> {
                        `item Name : ${item.itemName}`
                    }</p>
                    <img  src={item.itemImg} style={{height:"200px", width:"200px"}}/>
                    {/* <br/> */}
                    <p >
                       {`item itemDescreption : ${item.itemDescreption}`}
                    </p>
                    {/* <br/> */}
                    <p >
                        {`item price : ${item.itemPrice}`}
                    </p>
                    </div>
                    </Popup>
                    {/* <Button onClick={(e)=>{
                        e.preventDefault();
                        itemscon.setFavoriteItems(item)
                    }}>
                        Add to favourite
                    </Button> */}

                  <When condition={ item.userId === cookie.load('id')}>
                    <Link to={`update/${item.id}`}>
                    <Button>
                        Update
                    </Button>
                    </Link>
                    <Button onClick={()=>{itemscon.deleteItem(item.id)}}>
                        Delete 
                    </Button>
                  </When>

                    </Card.Body>
                </Card>
                </>
                    )
                })
            }
            </div>
            <Modal show={show} onHide={handleClose} class="modal-dialog modal-lg">
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