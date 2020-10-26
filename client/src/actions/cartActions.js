import axios from 'axios';
import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_ADDRESS, CART_SAVE_PAYMENT_METHOD} from '../constants/cartConstants';

export const addToCart = (id, qty) => async(dispatch, getState) =>{
    
        const {data} = await axios.get(`/api/products/${id}`);

        const payload = {
            id : data._id,
            name : data.name,
            image: data.image,
            price:data.price,
            countInStock : data.countInStock,
            qty
        }
        

        dispatch({type:CART_ADD_ITEM, payload});
        localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
    
}

export const removeItem = id => (dispatch, getState)=>{
    dispatch({type:CART_REMOVE_ITEM, payload:id});
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
}


export const saveAddress = (formData) => async(dispatch) =>{

    dispatch({type:CART_SAVE_ADDRESS, payload:formData});
    localStorage.setItem('shippingAddress',JSON.stringify(formData));

}

export const savePaymentMethod = (formData) => async(dispatch) =>{

    dispatch({type:CART_SAVE_PAYMENT_METHOD, payload:formData});
    localStorage.setItem('paymentMethod',JSON.stringify(formData));

}