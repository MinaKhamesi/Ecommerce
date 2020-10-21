import React, {useState, useEffect} from 'react';
import { Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { Row, Col, Form, Button} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {getUserDetails, updateUserByAdmin} from '../actions/userActions';


const EditUserScreen = ({match}) => {
    const dispatch = useDispatch();


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    
    const userDetails = useSelector(state=>state.userDetails);
    const {user, loading, error} = userDetails;

    const userUpdateAdmin = useSelector(state=>state.userUpdateAdmin);
    const { success: updateSuccess, error: updateError } = userUpdateAdmin;


    useEffect(() => {
        
            if(!user || user._id!==match.params.id){
                dispatch(getUserDetails(match.params.id));
            }
            
            
        if(user){
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
        
    }, [ dispatch,match, user]);


    const handleUpdate = e =>{
        e.preventDefault();
        dispatch(updateUserByAdmin(match.params.id, name, email, isAdmin))
       
    }

    return (
        <>
        <Link to='/admin/users' className='btn btn-light'>Go Back</Link>
        {updateSuccess && <Message variant='success'>User Updated Successfully</Message>}
        {updateError && <Message variant='danger'>updateError</Message>}
        <FormContainer>
            <h1>
                <i className="fas fa-user"></i> Edit User
            </h1>
                
            <Form onSubmit={e=>handleUpdate(e)}>
            <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='name' placeholder='Enter name' value={name} onChange={e=>setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter Email' value={email} onChange={e=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                        
                        <Form.Check type='checkbox' label='Is Admin' checked={isAdmin} onChange={e=>setIsAdmin(e.target.checked)}></Form.Check>
                </Form.Group>

                

                

                <Button className='btn-block' type='submit' variant='primary'>
                   Update
                </Button>

            </Form>
            
        </FormContainer>
        </>

        
        
    )
}

export default EditUserScreen;
