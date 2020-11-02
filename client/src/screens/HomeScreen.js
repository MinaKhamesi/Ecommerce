import React, { useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import CarouselSection from '../components/CarouselSection';
import {Row, Col} from 'react-bootstrap';

import {getProducts} from '../actions/ProductActions';

const HomeScreen = ({match}) => {
    
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber;

    const dispatch = useDispatch();

    const productList = useSelector(state=> state.productList)
    const {loading, products, error,page,pages} = productList;
    
    useEffect(()=>{
        dispatch(getProducts(keyword,pageNumber));
    },[dispatch,keyword,pageNumber])

    
    
    return (
        <>
        {keyword ? <Link to='/' className='btn btn-light mb-3'>Go Back</Link> : <CarouselSection/>}
          <h3>Latest Products</h3>
          {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
              <>
              <Meta/>
                <Row >
                {products.map(product=>(
                    <Col sm={12} md={6} ld={4} xl={3} key={product._id}>
                    <Product product={product} />
                    </Col>
                ))}
                </Row>  
                <Paginate page={page} pages={pages} keyword={keyword ? keyword : ''}/>
                </>
          )}
          
        </>
    )
}

export default HomeScreen;
