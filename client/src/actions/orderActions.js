import axios from 'axios';
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from '../constants/orderConstants';

export const createOrder = (formData) => async (dispatch,getState) =>{
    
    dispatch({type:ORDER_CREATE_REQUEST});

    try {
        const config = {
            headers:{
                'Content-Type': 'application/json',
                authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        }
        const {data} = await axios.post('/orders',formData,config);

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
        const {data} = await axios.get(`/orders/${id}`,formData,config);

        dispatch({type:ORDER_DETAILS_SUCCESS, payload: data});
        

    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({type:ORDER_DETAILS_FAIL,payload:err})
    }
}