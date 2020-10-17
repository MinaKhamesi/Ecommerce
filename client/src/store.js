import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import {productListReducer, productDetailReducer} from './reducers/ProductReducers';
import {cartReducer} from './reducers/CartReducers';
const reducer = combineReducers({
    productList : productListReducer,
    productDetail : productDetailReducer,
    cart: cartReducer
});

const cartFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const initialState = {
    cart: {cartItems : cartFromLocalStorage}
};

const middlewares = [thunk]

const store = createStore(reducer,initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;