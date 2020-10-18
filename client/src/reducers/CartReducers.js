import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_ADDRESS, CART_SAVE_PAYMENT_METHOD} from '../constants/cartConstants';

export const cartReducer = (state={cartItems : [], shippingAddress:{}}, action) =>{
    const {type,payload} = action;
    switch(type){
        case CART_ADD_ITEM:
           
            const itemExist = state.cartItems.find(item=>item.id===payload.id)
            if(itemExist){
                return {
                    ...state,
                    cartItems: state.cartItems.map(p=>{
                        if(p.id===payload.id){
                            return payload
                        }else{
                            return p
                        }
                    })
                }
            }else{
                return {
                    ...state,
                    cartItems: [ ...state.cartItems , payload]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems : state.cartItems.filter(item=>item.id !== payload)
            }
        case CART_SAVE_ADDRESS:
            return {
                ...state,
                shippingAddress:payload
            }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                    ...state,
                    paymentMethod:payload
                }
        default:
            return state
    }
}