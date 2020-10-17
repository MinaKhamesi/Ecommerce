import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import {productListReducer, productDetailReducer} from './reducers/ProductReducers';
import {cartReducer} from './reducers/CartReducers';
import {userLoginReducer, userRegisterReducer, userUpdateReducer} from './reducers/UserReducers';


const reducer = combineReducers({
    productList : productListReducer,
    productDetail : productDetailReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
});

const cartFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    cart: {cartItems : cartFromLocalStorage},
    userLogin: {userInfo: userInfoFromLocalStorage}
};

const middlewares = [thunk]

const store = createStore(reducer,initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;