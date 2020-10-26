import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import {Table, Button} from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getOrders} from '../actions/userActions';

const UserListScreen = ({history}) => {
    const dispatch = useDispatch();

    const orderListAll = useSelector(state=>state.orderListAll);
    const {loading, error, orders} = orderListAll;

    const userLogin = useSelector(state=>state.userLogin);
    const { userInfo} = userLogin;
    

    useEffect(()=>{
        if(!userInfo || !userInfo.isAdmin){
            history.push('/login')
        }else{
            dispatch(getOrders());
        }
    }, [history, dispatch, userInfo]);

    
    return (
        <>
         <h1>Orders</h1>


        {loading? <Loader /> : error ? <Message variant='danger'>{error}</Message>: (
            <Table hover striped bordered className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>USER</th>
                    <th>PRICE</th>
                    <th>DATE</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order=><tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>
                    {order.totalPrice}</td>
                <td>
                {order.isPaid ? <p>{order.paidAt}</p> : <i className='fas fa-times' style={{color:'red'}}></i>}
                    </td>
                    <td>
                {order.isDelivered ? <p>{order.deliveredAt}</p> : <i className='fas fa-times' style={{color:'red'}}></i>}
                    </td>
                <td>
                    <LinkContainer to={`/admin/order/${order._id}/edit`}>
                    <Button className='btn-sm btn-light'><i className='fas fa-edit'></i></Button>
                    </LinkContainer>
                    </td>
                </tr>)}
            </tbody>
            </Table>  
    )}
          
        </>
    )
}

export default UserListScreen;
