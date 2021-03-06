import axios from 'axios';
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DELIVERED_FAIL, ORDER_DELIVERED_REQUEST, ORDER_DELIVERED_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_ALL_FAIL, ORDER_LIST_ALL_REQUEST, ORDER_LIST_ALL_SUCCESS, ORDER_LIST_MY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from '../constants/orderConstants';

export const createOrder = (formData) => async (dispatch,getState) =>{
    
    dispatch({type:ORDER_CREATE_REQUEST});

    try {
        const config = {
            headers:{
                'Content-Type': 'application/json',
                authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        }
        const {data} = await axios.post('/api/orders',formData,config);

        dispatch({type:ORDER_CREATE_SUCCESS, payload: data});
        

    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({type:ORDER_CREATE_FAIL,payload:err})
    }
}


export const getOrderById = (id) => async (dispatch,getState) =>{
    
    dispatch({type:ORDER_DETAILS_REQUEST});

    try {
        const config = {
            headers:{
                authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/orders/${id}`,config);

        dispatch({type:ORDER_DETAILS_SUCCESS, payload: data});
        

    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({type:ORDER_DETAILS_FAIL,payload:err})
    }
}


export const payOrder = (id,paymentResult) => async (dispatch,getState) =>{
    
    dispatch({type:ORDER_PAY_REQUEST});
    try {
        const config = {
            headers:{
                'Content-Type': 'application/json',
                authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        }
        const {data} = await axios.put(`/api/orders/${id}/pay`, paymentResult , config);

        dispatch({type:ORDER_PAY_SUCCESS, payload: data});
        

    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({type:ORDER_PAY_FAIL,payload:err})
    }
}

export const getMyOrders = () => async (dispatch,getState) =>{
    
    dispatch({type:ORDER_LIST_MY_REQUEST});
    try {
        const config = {
            headers:{
                authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/orders/myorders`, config);

        dispatch({type:ORDER_LIST_MY_SUCCESS, payload: data});
        

    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({type:ORDER_LIST_MY_FAIL,payload:err})
    }
}

export const getOrders = () => async (dispatch,getState) =>{
    
    dispatch({type:ORDER_LIST_ALL_REQUEST});
    try {
        const config = {
            headers:{
                authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/orders`, config);

        dispatch({type:ORDER_LIST_ALL_SUCCESS, payload: data});
        

    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({type:ORDER_LIST_ALL_FAIL,payload:err})
    }
}


export const deliverOrder = (id) => async (dispatch,getState) =>{
    
    dispatch({type:ORDER_DELIVERED_REQUEST});
    try {
        const config = {
            headers:{
                authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        }
         await axios.put(`/api/orders/${id}/deliver`,{}, config);

        dispatch({type:ORDER_DELIVERED_SUCCESS});
        

    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({type:ORDER_DELIVERED_FAIL,payload:err})
    }
}