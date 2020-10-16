import React, {useState, useEffect} from 'react';
import Product from '../components/Product';
import {Row, Col} from 'react-bootstrap';
import axios from 'axios'

const HomeScreen = () => {
    const [products, setProducts] = useState([]);

    
    useEffect(()=>{
        const fetchData = async ()=>{
            const {data} = await axios.get('/products');
            setProducts(data)
        }
        fetchData()
    },[])
    return (
        <>
          <h3>Latest Products</h3>
          <Row >
              {products.map(product=>(
                  <Col sm={12} md={6} ld={4} xl={3} key={product._id}>
                  <Product product={product} />
                  </Col>
              ))}
              </Row>  
        </>
    )
}

export default HomeScreen;
