import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_RESET, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS} from '../constants/productConstants';

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

export const productDeleteReducer = (state={}, action) =>{
    const {type,payload} = action;
    switch (type){
        case PRODUCT_DELETE_REQUEST:
            return {loading:true};
        case PRODUCT_DELETE_SUCCESS:
            return {loading:false, success:true}
        case PRODUCT_DELETE_FAIL:
            return {loading:false, error:payload}
            case PRODUCT_DELETE_RESET:
                return {}
        default:
            return state;
    }
}

export const productCreateReducer = (state={}, action) =>{
    const {type,payload} = action;
    switch (type){
        case PRODUCT_CREATE_REQUEST:
            return {loading:true};
        case PRODUCT_CREATE_SUCCESS:
            return {loading:false, product:payload}
        case PRODUCT_CREATE_FAIL:
            return {loading:false, error:payload}
        default:
            return state;
    }
}