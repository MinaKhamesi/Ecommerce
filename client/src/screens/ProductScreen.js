import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Row, Col, ListGroup, Card, Button, ListGroupItem,Image} from 'react-bootstrap';
import Rating from '../components/Rating';
import axios from 'axios';


const ProductScreen = ({match}) => {
    const [ product, setProduct] = useState({});
    useEffect(() => {
        const fetchData = async ()=>{
            const {data} = await axios.get(`/products/${match.params.id}`);
            setProduct(data);
        }
        fetchData();
    }, [match])
     
    
    return (
        <>
           <Link to='/' className="btn btn-light m-3">Go Back</Link>

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
                            <ListGroupItem>
                                <Button className='btn-block' type='button' disabled={product.countInStock===0}>Add To Cart</Button>
                            </ListGroupItem>

                       </ListGroup>
                   </Card>
               </Col>
           </Row>
        </>
    )
}

export default ProductScreen;
