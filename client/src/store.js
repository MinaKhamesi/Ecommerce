import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import {productListReducer, productDetailReducer, productDeleteReducer} from './reducers/ProductReducers';
import {cartReducer} from './reducers/CartReducers';
import {userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateAdminReducer, userUpdateReducer} from './reducers/UserReducers';
import {orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderPayReducer} from './reducers/OrderReducers';


const reducer = combineReducers({
    productList : productListReducer,
    productDetail : productDetailReducer,
    productDelete: productDeleteReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    userList : userListReducer,
    userDelete : userDeleteReducer,
    userDetails: userDetailsReducer,
    userUpdateAdmin: userUpdateAdminReducer,
    orderCreate : orderCreateReducer,
    orderDetails : orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy : orderListMyReducer, 
});

const cartFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const paymentMethodFromLocalStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : null

const initialState = {
    cart: {cartItems : cartFromLocalStorage, shippingAddress: shippingAddressFromLocalStorage, paymentMethod:paymentMethodFromLocalStorage},
    userLogin: {userInfo: userInfoFromLocalStorage},
    
};

const middlewares = [thunk]

const store = createStore(reducer,initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;