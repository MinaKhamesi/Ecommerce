import axios from 'axios';
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from '../constants/orderConstants';

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