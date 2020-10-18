import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { Form, Button, Row, Col, ListGroupItem, ListGroup, Image, Card} from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import {createOrder} from '../actions/orderActions';

const PlaceOrderScreen = ({history}) => {

    const dispatch = useDispatch();



    const cart = useSelector(state=>state.cart);
    const { shippingAddress, cartItems, paymentMethod} = cart;

    const orderCreate = useSelector(state=>state.orderCreate);
    const {error, success, order} = orderCreate;

    useEffect(()=>{
        if(success){
            history.push(`/orders/${order._id}`);
        }
    },[order, history])

    const addDecimals = num => (Math.round(num*100)/100).toFixed(2);

    const calculatePrices = ()=>{
        const numItems = cartItems.reduce((acc,item)=>acc + item.qty,0);

        const price = addDecimals(cartItems.reduce((acc,item)=>acc+item.price*item.qty, 0).toFixed(2));

        const shippingPrice = addDecimals(price>100 ? 0 : 100)

        const taxPrice = addDecimals((Number(price)*0.15).toFixed(2));

        const totalPrice = addDecimals((Number(price) + Number(shippingPrice) + Number(taxPrice)).toFixed(2));

        return [numItems, price, shippingPrice, taxPrice, totalPrice]
    }

    const [numItems, price, shippingPrice, taxPrice, totalPrice] = calculatePrices();


    const placeOrderHandler = e =>{
        e.preventDefault();
        const cartItemsWithProduct = cartItems.map(item=>{
            return {...item, product:item.id}})
        dispatch(createOrder({
            orderItems: cartItemsWithProduct,
            shippingAddress,
            paymentMethod,
            taxPrice,
            shippingPrice,
            totalPrice,
        }))
    }

    return (
        <>
         <CheckoutSteps step1 step2 step3 step4 />
         <Row>
             <Col md={8}>
                 <ListGroup variant='flush'>
                     <ListGroupItem>
                            <h4>Shipping</h4> 
                            <p>
                                <strong>Address:</strong>
                                {shippingAddress.address}   , {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
                                </p> 
                     </ListGroupItem>
                     <ListGroupItem>
                         <h4>Payment Method</h4>
                           <p>
                           <strong>Method :</strong>  {paymentMethod} 
                               </p> 
                     </ListGroupItem>
                     <ListGroupItem>
                                <h4>Items</h4>
                            {cartItems.length===0 ? <Message>your cart is empty</Message> : (
                                <ListGroup variant='flush'>
                                        
                                        {cartItems.map((item)=> <ListGroupItem key={item.id}>
                                            <Row>
                                                <Col md={2}>
                                                    <Link to={`/product/${item.id}`}>
                                                    <Image src={item.image} fluid rounded/>
                                                    </Link>
                                                </Col>
                                                <Col md={6}>
                                                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                                                    
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x {item.price} = {(item.qty*item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>)}
                                </ListGroup>
                            )}
                     </ListGroupItem>
                 </ListGroup>
             </Col>
             <Col md={4}>
                 <Card>
                     <ListGroupItem>
                         <h2>Order Summary</h2>
                     </ListGroupItem>
                     <ListGroup variant='flush'>
                         <ListGroupItem>
                             <Row>
                                 <Col>Items</Col>
                                <Col>{numItems}</Col>
                             </Row>
                         </ListGroupItem>
                         <ListGroupItem>
                             <Row>
                                 <Col>Price</Col>
                                <Col>{price}</Col>
                             </Row>
                         </ListGroupItem>
                         <ListGroupItem>
                             <Row>
                                 <Col>Shipping Price</Col>
                                <Col>{shippingPrice}</Col>
                             </Row>
                         </ListGroupItem>
                         <ListGroupItem>
                             <Row>
                                 <Col>Tax Price</Col>
                                <Col>{taxPrice}</Col>
                             </Row>
                         </ListGroupItem>
                         <ListGroupItem>
                             <Row>
                                 <Col>Total Price</Col>
                                <Col>{totalPrice}</Col>
                             </Row>
                         </ListGroupItem>
                         
                            {error &&<ListGroupItem> <Message variant='danger'>{error}</Message></ListGroupItem>}
                         
                         <ListGroupItem>
                             <Button className='btn-block' type='button' disabled={cartItems.length===0} onClick={e=>placeOrderHandler(e)}>Place Order</Button>
                         </ListGroupItem>
                     </ListGroup>
                 </Card>
             </Col>
             </Row>   
        </>
    )
}

export default PlaceOrderScreen;
