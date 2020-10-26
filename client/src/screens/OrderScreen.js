import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { PayPalButton } from "react-paypal-button-v2";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {  Row, Col, ListGroupItem, ListGroup, Image, Card, Button} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {getOrderById, payOrder, deliverOrder} from '../actions/orderActions';
import {ORDER_CREATE_RESET, ORDER_DELIVERED_RESET, ORDER_PAY_RESET} from '../constants/orderConstants';
import { CART_ITEMS_RESET } from '../constants/cartConstants';

const OrderScreen = ({match}) => {

    const dispatch = useDispatch();

    const [sdkReady, setSdkReady] = useState(false);

    const orderDetails = useSelector(state=>state.orderDetails);
    const { loading, order, error} = orderDetails;

    const orderPay = useSelector(state=>state.orderPay);
    const { loading: payLoading , success:paySuccess} = orderPay;

    const orderDeliver = useSelector(state=>state.orderDeliver);
    const { loading: deliverLoading , success:deliverSuccess} = orderDeliver;

    const userLogin = useSelector(state=>state.userLogin);
    const { userInfo } = userLogin;

    
    
    
    useEffect(()=>{

        const addPayPalScript = async ()=>{
            const {data:clientId} = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.onload = ()=>{
                setSdkReady(true);
            }
            document.body.appendChild(script);
        }

        



        if(!order || order._id!==match.params.id || paySuccess || deliverSuccess){
            dispatch({type:ORDER_PAY_RESET});
            dispatch({type:ORDER_DELIVERED_RESET});
            dispatch({type:ORDER_CREATE_RESET});
            dispatch(getOrderById(match.params.id))

        } else if(!order.isPaid){
            if( !window.paypal){
                addPayPalScript()
            }else{
                setSdkReady(true);
            }
           
        }  

    },[order, match, paySuccess, deliverSuccess])

    

    const successPaymentHandler = paymentResult =>{
        
        dispatch(payOrder(match.params.id,paymentResult));
        dispatch({type:CART_ITEMS_RESET})
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

                                {!order.isPaid && <ListGroupItem>
                                    {payLoading && <Loader />}
                                    {!sdkReady ? <Loader /> : (
                                        <PayPalButton
                                        amount={order.totalPrice}
                                        onSuccess={successPaymentHandler}
                                      />
                                    )}
                                    </ListGroupItem>}

                                    {!order.isDelivered && userInfo.isAdmin && <ListGroupItem>
                                    <Button className='btn btn-block' onClick={e=>dispatch(deliverOrder(match.params.id))}>Delivered</Button>
                                    </ListGroupItem>}

                             </ListGroup>
                    </Card>
                </Col>
                </Row>   
        )}
         
        </>
    )
}

export default OrderScreen;
