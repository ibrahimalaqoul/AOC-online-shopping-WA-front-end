import { ItemContext } from "../../context/items";
import { useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import { Form, Row, Col, FormGroup, Label, Input } from "reactstrap";
// import cookie from 'react-cookies';
import {useParams} from "react-router-dom";


export default function Update(props) {
const params = useParams();
const itemscon = useContext(ItemContext);
const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const [itemName, setItemName] = useState("");
const [itemImg, setItemImg] = useState("");
const [itemDescreption, setItemDescreption] = useState("");
const [itemPrice, setItemPrice] = useState(0);
const handelSubmit = (e) => {
    e.preventDefault();
    itemscon.updateItem(params.id,itemName, itemImg, itemDescreption, itemPrice);
    handleClose();
}
return (
<>
              
                    <Form onSubmit={handelSubmit}
                    >
                        <Row style={{ marginTop: "0px" }}>
                            <Col md={6}>
                                <FormGroup>
                                    <Input
                                        id="itemName"
                                        name="itemName"
                                        placeholder="itemName"
                                        type="text"
                                        onChange={(e) => { 
                                            setItemName(e.target.value) 
                                        }}
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
                                
                            />
                            <Label for="itemPrice"></Label>
                            <Input
                                id="itemPrice"
                                name="itemPrice"
                                placeholder="itemPrice"
                                onChange={(e) => { setItemPrice(e.target.value) }}
                                type="number"
                                
                            />
                            <Button color="success" type="submit" style={{ marginTop: "20px" }}>
                                update Item
                            </Button>
                        </Row>
                    </Form>
          
</>
)



}