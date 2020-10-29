import React, { useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {Row, Col} from 'react-bootstrap';

import {getProducts} from '../actions/ProductActions';

const HomeScreen = ({match}) => {
    const keyword = match.params.keyword;
    const dispatch = useDispatch();
    const productList = useSelector(state=> state.productList)
    const {loading, products, error} = productList;
    
    useEffect(()=>{
        dispatch(getProducts(keyword));
    },[dispatch,keyword])

    
    
    return (
        <>
          <h3>Latest Products</h3>
          {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <Row >
                {products.map(product=>(
                    <Col sm={12} md={6} ld={4} xl={3} key={product._id}>
                    <Product product={product} />
                    </Col>
                ))}
                </Row>  
          )}
          
        </>
    )
}

export default HomeScreen;
