import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { Form, Button, Row, Col, ListGroupItem, ListGroup, Image, Card} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {getOrderById} from '../actions/orderActions';

const OrderScreen = ({match}) => {

    const dispatch = useDispatch();



    const orderDetails = useSelector(state=>state.orderDetails);
    const { loading, order, error} = orderDetails;

    
    
    
    useEffect(()=>{
        if(!order || order._id!==match.params.id){
            dispatch(getOrderById(match.params.id))
        }    
    },[order])

    

    const placeOrderHandler = e =>{
        e.preventDefault();
       //
    }

    return (
        <>
        {(loading || !order)? <Loader /> : error? <Message>{error}</Message> : (
                <Row>
                <Col md={8}>
                    <h1>Order {order._id}</h1>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                               <h4>Shipping</h4> 
                               <p>
                                   <strong>Name:</strong>
                                   {order.user.name}
                                   </p>

                                   <p>
                                   <strong>Email:</strong>
                                   <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                   </p> 
                               <p>
                                   <strong>Address:</strong>
                                   {order.shippingAddress.address}   , {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                   </p> 
                                   {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> : <Message variant='danger'>Not Delivered</Message>} 
                        </ListGroupItem>
                        <ListGroupItem>
                            <h4>Payment Method</h4>
                              <p>
                              <strong>Method :</strong>  {order.paymentMethod} 
                            </p>
                            {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant='danger'>Not paid</Message>} 
                        </ListGroupItem>
                        <ListGroupItem>
                                   <h4>Items</h4>
                               {order.orderItems.length===0 ? <Message>your cart is empty</Message> : (
                                   <ListGroup variant='flush'>
                                           
                                           {order.orderItems.map((item)=> <ListGroupItem key={item.product}>
                                               <Row>
                                                   <Col md={2}>
                                                       <Link to={`/product/${item.product}`}>
                                                       <Image src={item.image} fluid rounded/>
                                                       </Link>
                                                   </Col>
                                                   <Col md={6}>
                                                       <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                       
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
                                   <Col>$ {order.orderItems.reduce((accu,item)=>accu+(item.qty*item.price),0).toFixed(2)}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping Price</Col>
                                   <Col>$ {order.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Tax Price</Col>
                                   <Col>$ {order.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total Price</Col>
                                   <Col>$ {order.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            
                        </ListGroup>
                    </Card>
                </Col>
                </Row>   
        )}
         
        </>
    )
}

export default OrderScreen;
