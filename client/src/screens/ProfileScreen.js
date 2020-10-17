import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col, Form, Button} from 'react-bootstrap';
import { Link} from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {updateUserInfo} from '../actions/userActions';

const ProfileScreen = ({history}) => {
    const dispatch = useDispatch();

    const userLogin = useSelector(state=>state.userLogin);
    const {userInfo, loading, error} = userLogin;

    const userUpdate = useSelector(state=>state.userUpdate);
    

    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }else{
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    },[history, userInfo])

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleUpdateProfile = (e)=>{
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(updateUserInfo(name,email,password))
        }
      
    }

    return (
        <Row>
            <Col md={3} >
            {error && <Message variant='danger'>{error}</Message>} 
            {userUpdate.error && <Message variant='danger'>{userUpdate.error}</Message>} 
            {userUpdate.success && <Message variant='success'>Profile Updated Successfully.</Message>} 
                {message && <Message variant='danger'>{message}</Message>} 
                {(loading) && <Loader/>}
            <h4>
                <i className="fas fa-user"></i> {name.split(' ')[0]}'s Profile
            </h4>
                
            <Form onSubmit={handleUpdateProfile}>
            <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='name' placeholder='Enter name' value={name} onChange={e=>setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter Email' value={email} onChange={e=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter password' value={password} onChange={e=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button className='btn-block' type='submit' variant='primary'>
                    Update
                </Button>

            </Form>

            </Col>
            <Col md={1}></Col>
            <Col md={8}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen;
