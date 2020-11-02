import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {LinkContainer, LisrContainer} from 'react-router-bootstrap';
import {Table, Button} from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {DeleteUserById, getUsers} from '../actions/userActions';

const UserListScreen = ({history}) => {
    const dispatch = useDispatch();

    const userList = useSelector(state=>state.userList);
    const {loading, error, users} = userList;

    const userLogin = useSelector(state=>state.userLogin);
    const { userInfo} = userLogin;
    const userDelete = useSelector(state=>state.userDelete);
    const { error:deleteError, success , Loading:deleteLoading} = userDelete;
    
    useEffect(()=>{
        if(!userInfo || !userInfo.isAdmin){
            history.push('/login')
        }else{
            dispatch(getUsers());
        }
    }, [history, dispatch, userInfo, userDelete]);

    const deleteUserHandler = (id) =>{
        if(window.confirm(' Are you sure?')){
            dispatch(DeleteUserById(id)); 
        }
       
    }
    return (
        <>
         <h1>Users</h1>
         
        {success && <Message variant='success'>User Deleted Successfully</Message>}


        {loading? <Loader /> : error ? <Message variant='danger'>{error}</Message>: (
            <Table hover striped bordered responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.map(user=><tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td>
                    {user.isAdmin ? <i className='fas fa-check' style={{color:'green'}}></i> : <i className='fas fa-times' style={{color:'red'}}></i>}
                    </td>
                <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button className='btn-sm btn-light'><i className='fas fa-edit'></i></Button>
                    </LinkContainer>
                    </td>
                <td>
                    <Button className='btn btn-sm btn-danger' onClick={e=>deleteUserHandler(user._id)}><i className='fas fa-trash'></i></Button>
                </td>
                </tr>)}
            </tbody>
            </Table>  
    )}
          
        </>
    )
}

export default UserListScreen;
