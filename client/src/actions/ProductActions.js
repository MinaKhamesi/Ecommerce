import axios from 'axios';
import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_RESET} from '../constants/productConstants';

export const getProducts = ()=> async (dispatch) =>{
    try {
        
        dispatch({type:PRODUCT_LIST_REQUEST});

        const { data } = await axios.get('/products');
        
        dispatch({type:PRODUCT_LIST_SUCCESS, payload: data });


    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({type:PRODUCT_LIST_FAIL,payload:err})
    }
}

export const getProduct = (id)=> async (dispatch) =>{
    try {
        
        dispatch({type:PRODUCT_DETAIL_REQUEST});

        const { data } = await axios.get(`/products/${id}`);
        
        dispatch({type:PRODUCT_DETAIL_SUCCESS, payload: data });


    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({type:PRODUCT_DETAIL_FAIL,payload:err})
    }
}

export const deleteProduct = (id)=> async (dispatch,getState) =>{
    try {
        
        dispatch({type:PRODUCT_DELETE_REQUEST});

        const config = {
            headers:{
                Authorization:`Bearer ${getState().userLogin.userInfo.token}`
            }
        }

        await axios.delete(`/products/${id}`, config);
        
        dispatch({type:PRODUCT_DELETE_SUCCESS});

        setTimeout(()=>{
            dispatch({type:PRODUCT_DELETE_RESET});
        },3000)
        


    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({type:PRODUCT_DELETE_FAIL,payload:err})
    }
}