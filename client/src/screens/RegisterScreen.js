import React, {useState, useEffect} from 'react';
import { Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { Row, Col, Form, Button} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {register} from '../actions/userActions';


const RegisterScreen = ({location, history}) => {
    const dispatch = useDispatch();

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    

    const userRegister = useSelector(state=>state.userRegister);
    const {userInfo, loading, error} = userRegister;


    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [userInfo, redirect, history]);


    const handleRegister = e =>{
        e.preventDefault();
        if(password!==confirmPassword){
            setMessage('Passwords do not match!')
        }else{
            dispatch(register(name, email,password));
        }
       
    }

    return (
        <FormContainer>
            <h1>
                <i className="fas fa-user"></i> Sign Up
            </h1>
                {error && <Message variant='danger'>{error}</Message>} 
                {message && <Message variant='danger'>{message}</Message>} 
                {loading && <Loader/>}
            <Form onSubmit={handleRegister}>
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
                    Register
                </Button>

            </Form>
            <Row>
                <Col>
                Already have an account? <Link to={redirect!=='/' ? `/login?redirect=${redirect}` : '/login'}>login</Link>
                </Col>
            </Row>
        </FormContainer>
        
    )
}

export default RegisterScreen;
