import React, { useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import { Row, Col, ListGroup, Card, Button, ListGroupItem,Image, Form, FormGroup, FormLabel, FormControl} from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';

import {getProduct, createReview} from '../actions/ProductActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';


const ProductScreen = ({match, history}) => {

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const productDetail = useSelector(state=>state.productDetail);
    const {product, error, loading} = productDetail;

    const productReview = useSelector(state=>state.productReview);
    const { error:reviewError,success:reviewSuccess, loading:reviewLoading} = productReview;


    const userLogin = useSelector(state=>state.userLogin);
    const {userInfo} = userLogin;

    const dispatch = useDispatch();

    useEffect(() => {
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET});

        dispatch(getProduct(match.params.id));
    }, [match, dispatch,reviewSuccess]);
     

    const addToCartHandler = e =>{
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    }

    const createReviewHandler = (e)=>{
        e.preventDefault();
        dispatch(createReview(match.params.id,{rating,comment}));
    }
    
    return (
        <>
           <Link to='/' className="btn btn-light m-3">Go Back</Link>
    {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
        <>
        <Meta title={product.name} description={product.description}/>
        <Row>
        <Col md={6}>
            <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={3}>
            <ListGroup variant='flush'>
                <ListGroupItem>
                     <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                </ListGroupItem>
                <ListGroupItem>
                    price: ${product.price}
                </ListGroupItem>
                <ListGroupItem>
                    description: {product.description}
                </ListGroupItem>
            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroupItem>
                        <Row>
                            <Col>Price:</Col>
                             <Col><strong>${product.price}</strong></Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col>Status:</Col>
                             <Col>{product.countInStock>0 ? 'In Stock' : 'Out Of Stock'}</Col>
                        </Row>
                    </ListGroupItem>
                    {product.countInStock >0 && (
                        <ListGroupItem>
                            <Row>
                                <Col>Qty</Col>
                                <Col>
                                <ListGroupItem as='select' onChange = {(e) =>setQty(e.target.value)}>
                                    {
                                        [...Array(product.countInStock).keys()].map(x => <option key={x} value={x+1}>{x + 1}</option>)
                                    }
                                </ListGroupItem>
                                </Col>
                            </Row>
                        </ListGroupItem>
                    )}
                     <ListGroupItem>
                         <Button className='btn-block' type='button' disabled={product.countInStock===0} onClick={e=>addToCartHandler(e)}>Add To Cart</Button>
                     </ListGroupItem>

                </ListGroup>
            </Card>
        </Col>
    </Row>
    <Row>
        <Col md={5}>
            <h3>Reviews</h3>
            {product.reviews.length===0 ? <Message>No review is submitted for this product</Message> : (<ListGroup variant='flush'>{product.reviews.map(review=><ListGroupItem key={review._id}>
                <Rating value={review.rating}/>
                <p>{review.comment}</p>
            </ListGroupItem>)}</ListGroup>)}
        </Col>
    </Row>
    <Row className='my-4'>
        <Col md={5}>
            <h3>Submit a review</h3>
            {reviewSuccess && <Message variant='success'>Review Added</Message>}
            {reviewError && <Message variant='danger'>{reviewError}</Message>}
            {reviewLoading && <Loader/>}
            {(userInfo && userInfo._id) ? (
                <Form onSubmit={e=>createReviewHandler(e)}>
                <FormGroup>
                    <FormLabel>Rating</FormLabel>
                    <FormControl as='select' value={rating} onChange={e=>setRating(e.target.value)}>
                        <option value=''>select ...</option>
                        <option value='1'>1-Poor</option>
                        <option value='2'>2-Fair</option>
                        <option value='3'>3-Good</option>
                        <option value='4'>4-Very good</option>
                        <option value='5'>5-Excellent</option>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Comment</FormLabel>
                    <FormControl as='textarea' value={comment} onChange={e=>setComment(e.target.value)}></FormControl>
                </FormGroup>
                <FormGroup>
                    <Button className='btn btn-block' onClick={e=>createReviewHandler(e)}>Submit</Button>
                </FormGroup>
            </Form>
            ) : <Message>Please <Link to='/login'>Sign In</Link> to submit your review</Message>}
            
        </Col>
    </Row>
    </>
    )}
           
        </>
    )
}

export default ProductScreen;
