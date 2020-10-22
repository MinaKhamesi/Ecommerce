import axios from 'axios';
import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_RESET, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_RESET} from '../constants/productConstants';

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


export const createProduct = ()=> async (dispatch,getState) =>{
    try {
        
        dispatch({type:PRODUCT_CREATE_REQUEST});

        const config = {
            headers:{
                Authorization:`Bearer ${getState().userLogin.userInfo.token}`
            }
        }

        const {data} = await axios.post(`/products`,{}, config);
        
        dispatch({type:PRODUCT_CREATE_SUCCESS, payload:data});
        


    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({type:PRODUCT_CREATE_FAIL,payload:err})
    }
}


export const updateProduct = (id, formData)=> async (dispatch,getState) =>{
    try {
        
        dispatch({type:PRODUCT_UPDATE_REQUEST});

        const config = {
            headers:{
                Authorization:`Bearer ${getState().userLogin.userInfo.token}`,
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.put(`/products/${id}`,formData, config);
        
        dispatch({type:PRODUCT_UPDATE_SUCCESS, payload:data});
        dispatch({type:PRODUCT_DETAIL_SUCCESS, payload:data});
        
        
        setTimeout(()=>{
            dispatch({type:PRODUCT_UPDATE_RESET})
        },5000)

    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({type:PRODUCT_UPDATE_FAIL,payload:err})
    }
}