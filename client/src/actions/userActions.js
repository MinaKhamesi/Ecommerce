import axios from 'axios';
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constants/userConstants"

export const login = (email,password) => async (dispatch) =>{
    dispatch({type:USER_LOGIN_REQUEST});

    try {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post('/users/login',{email, password},config);

        dispatch({type:USER_LOGIN_SUCCESS, payload: data})

        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({type:USER_LOGIN_FAIL,payload:err})
    }

    


}

export const logout = ()=>dispatch=>{
    dispatch({type:USER_LOGOUT});
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
        const {data} = await axios.post('/users',{name, email, password},config);

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
        const {data} = await axios.put('/users/profile',{name, email, password},config);

        dispatch({type:USER_UPDATE_SUCCESS, payload:data});
        dispatch({type:USER_REGISTER_SUCCESS, payload: data});
        dispatch({type:USER_LOGIN_SUCCESS, payload: data});

        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({type:USER_UPDATE_FAIL,payload:err})
    }

    


}
