import React, { useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import { Row, Col, ListGroup, Card, Button, ListGroupItem,Image} from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';


import {getProduct} from '../actions/ProductActions';


const ProductScreen = ({match, history}) => {

    const [qty, setQty] = useState(1);

    const productDetail = useSelector(state=>state.productDetail);
    const {product, error, loading} = productDetail;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct(match.params.id));
    }, [match, dispatch]);
     

    const addToCartHandler = e =>{
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    }
    
    return (
        <>
           <Link to='/' className="btn btn-light m-3">Go Back</Link>
    {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
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
    )}
           
        </>
    )
}

export default ProductScreen;
