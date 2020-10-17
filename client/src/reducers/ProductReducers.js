import { PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS} from '../constants/productConstants';

export const productListReducer = (state={products:[]}, action) =>{
    const {type,payload} = action;
    switch (type){
        case PRODUCT_LIST_REQUEST:
            return {loading:true, products:[]};
        case PRODUCT_LIST_SUCCESS:
            return {loading:false, products:payload}
        case PRODUCT_LIST_FAIL:
            return {loading:false, error:payload}
        default:
            return state;
    }
} 


export const productDetailReducer = (state={ product : { reviews : [] }}, action) =>{
    const {type,payload} = action;
    switch (type){
        case PRODUCT_DETAIL_REQUEST:
            return {...state,loading:true};
        case PRODUCT_DETAIL_SUCCESS:
            return {loading:false, product:payload}
        case PRODUCT_DETAIL_FAIL:
            return {loading:false, error:payload}
        default:
            return state;
    }
} 