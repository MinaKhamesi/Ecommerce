import React, {useState, useEffect} from 'react';
import { Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {  Form, Button} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {getProduct, updateProduct} from '../actions/ProductActions';


const EditProductScreen = ({match}) => {
    const dispatch = useDispatch();


    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(0);
    const [countInStock, setCountInStock] = useState(0);
    
    const productDetail = useSelector(state=>state.productDetail);
    const {product, loading, error} = productDetail;

    const productUpdate = useSelector(state=>state.productUpdate);
    const { success: updateSuccess, error: updateError } = productUpdate;


    useEffect(() => {
        
            if(!product || product._id!==match.params.id){
                dispatch(getProduct(match.params.id));
            }
            
            
        if(product){
            setName(product.name);
            setCategory(product.category);
            setBrand(product.brand);
            setDescription(product.description);
            setImage(product.image);
            setCountInStock(product.countInStock);
            setPrice(product.price);
        }
        
    }, [ dispatch,match, product]);


    const handleUpdate = e =>{
        e.preventDefault();
        dispatch(updateProduct(match.params.id,{name,brand,category,image,description,countInStock,price}))
    }

    return (
        <>
        <Link to='/admin/products' className='btn btn-light mb-3'>Go Back</Link>
        {updateSuccess && <Message variant='success'>Product Updated Successfully</Message>}
        {updateError && <Message variant='danger'>updateError</Message>}
        <FormContainer>
            <h1>
                <i className="fas fa-user"></i> Edit Product
            </h1>
                
            <Form onSubmit={e=>handleUpdate(e)} className='mt-3'>
            <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='name' placeholder='Enter name' value={name} onChange={e=>setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='brand'>
                        <Form.Label>brand</Form.Label>
                        <Form.Control type='text' placeholder='Enter brand' value={brand} onChange={e=>setBrand(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control type='text' placeholder='Enter category' value={category} onChange={e=>setCategory(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='description'>
                        <Form.Label>description</Form.Label>
                        <Form.Control type='text' placeholder='Enter Description' value={description} onChange={e=>setDescription(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control type='text' placeholder='Enter image' value={image} onChange={e=>setImage(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='price'>
                        <Form.Label>price</Form.Label>
                        <Form.Control type='number' placeholder='Enter price' value={price} onChange={e=>setPrice(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='countInStock'>
                        <Form.Label>count In Stock</Form.Label>
                        <Form.Control type='number' placeholder='Enter count In Stock' value={countInStock} onChange={e=>setCountInStock(e.target.value)}></Form.Control>
                </Form.Group>
                

                

                

                <Button className='btn-block' type='submit' variant='primary'>
                   Update
                </Button>

            </Form>
            
        </FormContainer>
        </>

        
        
    )
}

export default EditProductScreen;
