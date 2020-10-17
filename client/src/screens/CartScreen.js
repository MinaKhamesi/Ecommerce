import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {Row, Col, ListGroup, Card, Image, Button, ListGroupItem, FormControl} from 'react-bootstrap';
import Message from '../components/Message';
import {addToCart, removeItem} from '../actions/cartActions';


const CartScreen = ({match, location, history}) => {

    const productId = match.params.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();
    useEffect(()=>{

        if(productId){
            dispatch(addToCart(productId,qty));
        }
        
    },[match,dispatch, productId,qty]);

    const cart = useSelector(state=>state.cart);
    const {cartItems} = cart;

    const removeItemHandler = id =>{
        dispatch(removeItem(id));
    }

    const checkoutHandler = e =>{
        history.push('/login?redirect=shipping');
    }
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? <Message>Your cart is empty, <Link to='/'>go back</Link></Message> : (
               <ListGroup variant='flush'>
                   {cartItems.map(item=> <ListGroupItem key = {item.id}>
                    <Row>
                        <Col md={2}><Image src={item.image} alt={item.name} fluid rounded/></Col>
                         <Col md={2}><Link to={`/product/${item.id}`}>{item.name}</Link></Col>
                        <Col md={2}>${item.price}</Col>
                        <Col md={2}>
                            <FormControl as='select' value={item.qty} onChange={e=>dispatch(addToCart(item.id,Number(e.target.value)))}>
                            {[...Array(item.countInStock).keys()].map(x=><option key={x} >{x+1}</option>)}
                           </FormControl>
                           </Col>
                           <Col md={2}>
                               <Button variant='light' onClick={e=>removeItemHandler(item.id)}>
                                   <i className="fas fa-trash"></i>
                               </Button>
                           </Col>
                    </Row>
                   </ListGroupItem>)}
               </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroupItem><h2>Subtotal ({cartItems.reduce((accu, curr)=> accu + curr.qty, 0)}) items</h2>
                   <p>$ {cartItems.reduce((acc,item)=>acc+ item.qty*item.price, 0).toFixed(2)}</p></ListGroupItem>
                   <ListGroupItem>
                       <Button className='btn-block' type='button' onClick={e=>checkoutHandler()} disabled={cartItems.length===0}>Proceed to Checkout</Button>
                   </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
           
        </Row>
    )
}

export default CartScreen
