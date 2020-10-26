import axios from 'axios';
import { ORDER_DETAILS_RESET, ORDER_LIST_MY_RESET } from '../constants/orderConstants';
import { USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_RESET, USER_LIST_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_RESET, USER_REGISTER_SUCCESS, USER_UPDATE_BY_ADMIN_FAIL, USER_UPDATE_BY_ADMIN_REQUEST, USER_UPDATE_BY_ADMIN_RESET, USER_UPDATE_BY_ADMIN_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_RESET, USER_UPDATE_SUCCESS } from "../constants/userConstants"

export const login = (email,password) => async (dispatch) =>{
    dispatch({type:USER_LOGIN_REQUEST});

    try {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/users/login',{email, password},config);

        dispatch({type:USER_LOGIN_SUCCESS, payload: data})

        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({type:USER_LOGIN_FAIL,payload:err})
    }

    


}

export const logout = ()=>dispatch=>{
    dispatch({type:USER_LOGOUT});
    dispatch({type:USER_REGISTER_RESET});
    dispatch({type:USER_UPDATE_RESET});
    dispatch({type:USER_LIST_RESET});
    dispatch({type:ORDER_LIST_MY_RESET});
    dispatch({type:ORDER_DETAILS_RESET});
    
    localStorage.removeItem('userInfo');
}


export const register = (name, email,password) => async (dispatch) =>{
    dispatch({type:USER_REGISTER_REQUEST});

    try {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/users',{name, email, password},config);

        dispatch({type:USER_REGISTER_SUCCESS, payload: data});
        dispatch({type:USER_LOGIN_SUCCESS, payload: data});

        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({type:USER_REGISTER_FAIL,payload:err})
    }

    


}


export const updateUserInfo = (name, email,password) => async (dispatch,getState) =>{
    dispatch({type:USER_UPDATE_REQUEST});

    try {
        const config = {
            headers:{
                'Content-Type': 'application/json',
                authorization : `Bearer ${getState().userLogin.userInfo.token}`
            }
        }
        const {data} = await axios.put('/api/users/profile',{name, email, password},config);

        dispatch({type:USER_UPDATE_SUCCESS, payload:data});
        dispatch({type:USER_REGISTER_SUCCESS, payload: data});
        dispatch({type:USER_LOGIN_SUCCESS, payload: data});

        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({type:USER_UPDATE_FAIL,payload:err})
    }

    


}

export const getUsers = () => async (dispatch,getState) =>{
    dispatch({type:USER_LIST_REQUEST});

    try {
        const config = {
            headers:{
                authorization : `Bearer ${getState().userLogin.userInfo.token}`
            }
        }
        const {data} = await axios.get('/api/users',config);

        dispatch({type:USER_LIST_SUCCESS, payload:data});

    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({type:USER_LIST_FAIL,payload:err})
    }
}

export const DeleteUserById = (id) => async (dispatch,getState) =>{
    dispatch({type:USER_DELETE_REQUEST});

    try {
        const config = {
            headers:{
                authorization : `Bearer ${getState().userLogin.userInfo.token}`
            }
        }
        await axios.delete(`/api/users/${id}`,config);

        dispatch({type:USER_DELETE_SUCCESS});

    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({type:USER_DELETE_FAIL,payload:err})
    }
}

export const getUserDetails = (id) => async (dispatch,getState) =>{
    dispatch({type:USER_DETAILS_REQUEST});

    try {
        const config = {
            headers:{
                authorization : `Bearer ${getState().userLogin.userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/users/${id}`,config);

        dispatch({type:USER_DETAILS_SUCCESS, payload:data});


    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({type:USER_DETAILS_FAIL,payload:err})
    }
}

export const updateUserByAdmin = (id, name, email,isAdmin) => async (dispatch,getState) =>{
    dispatch({type:USER_UPDATE_BY_ADMIN_REQUEST});

    try {
        const config = {
            headers:{
                'Content-Type': 'application/json',
                authorization : `Bearer ${getState().userLogin.userInfo.token}`
            }
        }
        const {data} = await axios.put(`/api/users/${id}`,{name, email, isAdmin},config);

        dispatch({type:USER_UPDATE_BY_ADMIN_SUCCESS, payload:data});
        dispatch({type:USER_DETAILS_SUCCESS, payload:data});
        
        setTimeout(()=>{
            dispatch({type:USER_UPDATE_BY_ADMIN_RESET})
        },3000)

    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({type:USER_UPDATE_BY_ADMIN_FAIL,payload:err})
    }
}
