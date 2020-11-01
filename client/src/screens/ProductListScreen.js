import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import {Table, Button, Row, Col} from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import {PRODUCT_CREATE_RESET} from '../constants/productConstants';
import { getProducts, deleteProduct, createProduct} from '../actions/ProductActions';

const ProductListScreen = ({history, match}) => {

    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();

    const productList = useSelector(state=>state.productList);
    const {loading, error, products, page, pages} = productList;

    const userLogin = useSelector(state=>state.userLogin);
    const { userInfo} = userLogin;

    const productDelete = useSelector(state=>state.productDelete);
    const { error:deleteError, success , Loading:deleteLoading} = productDelete;

    const productCreate = useSelector(state=>state.productCreate);
    const { error:createError, success:createSuccess , Loading:createLoading, product} = productCreate;


    
    useEffect(()=>{
        dispatch({type:PRODUCT_CREATE_RESET});
        
        if(!userInfo || !userInfo.isAdmin){
            history.push('/login')
        }
        if(createSuccess){
            history.push(`/admin/product/${product._id}/edit`)
        }else{
            dispatch(getProducts('',pageNumber));
        }
    }, [history, dispatch, userInfo, success, createSuccess, pageNumber]);






    const deleteproductHandler = (id) =>{
        if(window.confirm(' Are you sure?')){
            dispatch(deleteProduct(id)); 
        } 
    }



    const createNewProductHandler  = ()=>{
        dispatch(createProduct())
    }


    return (
        <>
        <Row>
            <Col md={9}>
            <h1>products</h1>
            </Col>
            <Col md={3}>
                    <Button className='btn btn-success my-3' onClick={createNewProductHandler}>
                        <i className='fas  fa-plus'></i> Create New Product
                    </Button>
            </Col>
        </Row>
         
        {success && <Message variant='success'>product Deleted Successfully</Message>}
        {deleteError && <Message variant='danger'>{deleteError}</Message>}
        {deleteLoading && <Loader />}
        {createError && <Message variant='danger'>{createError}</Message>}
        {createLoading && <Loader />}


        {loading? <Loader /> : error ? <Message variant='danger'>{error}</Message>: (
            <>
            <Table hover striped bordered className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>BRAND</th>
                    <th>CATEGORY</th>
                    <th>QTY</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {products.map(product=><tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>{product.countInStock}</td>
                <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button className='btn-sm btn-light'><i className='fas fa-edit'></i></Button>
                    </LinkContainer>
                    </td>
                <td>
                    <Button className='btn btn-sm btn-danger' onClick={e=>deleteproductHandler(product._id)}><i className='fas fa-trash'></i></Button>
                </td>
                </tr>)}
            </tbody>
            </Table>  
            <Paginate page={page} pages={pages} keyword='' isAdmin={true}/>
            </>
    )}
          
        </>
    )
}

export default ProductListScreen;

