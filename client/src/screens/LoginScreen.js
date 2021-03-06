import React, {useState, useEffect} from 'react';
import { Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { Row, Col, Form, Button} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {login} from '../actions/userActions';


const LoginScreen = ({location, history}) => {
    const dispatch = useDispatch();

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userLogin = useSelector(state=>state.userLogin);
    const {userInfo, loading, error} = userLogin;


    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [userInfo, redirect, history]);


    const handleLogin = e =>{
        e.preventDefault();
        dispatch(login(email,password));
    }

    return (
        <FormContainer>
            <h1>
                <i className="fas fa-user"></i> Sign In
            </h1>
                {error && <Message variant='danger'>{error}</Message>} 
                {loading && <Loader/>}
            <Form onSubmit={handleLogin}>
                <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter Email' value={email} onChange={e=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter password' value={password} onChange={e=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button className='btn-block' type='submit' variant='primary'>
                    Sign In
                </Button>

            </Form>
            <Row>
                <Col>
                New customer? <Link to={redirect!=='/' ? `/register?redirect=${redirect}` : '/register'}>register</Link>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col>
                <Button className='btn-block'  variant='dark' style={{fontSize:'0.6rem'}} onClick={e=>dispatch(login('user1@example.com','123456'))}>
                    Sign In As A Guest 
                </Button>
                </Col>
                <Col>
                <Button className='btn-block'  variant='dark' style={{fontSize:'0.6rem'}} onClick={e=>dispatch(login('admin@example.com','123456'))}>
                    Sign In As An Admin Guest 
                </Button>
                </Col>
            </Row>
        </FormContainer>
        
    )
}

export default LoginScreen;
