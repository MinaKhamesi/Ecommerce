import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Carousel, Image} from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import {getTopProducts} from '../actions/ProductActions';

const CarouselSection = () => {

    const dispatch = useDispatch();

    const productTopRated = useSelector(state=>state.productTopRated);
    const {loading,error, products} = productTopRated;

    useEffect(()=>{
        dispatch(getTopProducts());
    },[dispatch])
return loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
        <Carousel className='bg-dark'>
            {products.map(product=><Carousel.Item key={product._id} >
                <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid/>
                <Carousel.Caption className='carousel-caption'>
                        <h3>{product.name} (${product.price})</h3>
                </Carousel.Caption>
                </Link>
            </Carousel.Item>)}
        </Carousel>
    )
}

export default CarouselSection;
