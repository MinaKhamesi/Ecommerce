import {CART_ADD_ITEM, CART_REMOVE_ITEM} from '../constants/cartConstants';

export const cartReducer = (state={cartItems : []}, action) =>{
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
        default:
            return state
    }
}