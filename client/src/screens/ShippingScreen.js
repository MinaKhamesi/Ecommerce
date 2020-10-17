import React,{useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Row, Col, Form, Button} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import {saveAddress} from '../actions/cartActions';

const ShippingScreen = ({history}) => {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [country, setCountry] = useState(shippingAddress.country);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    
    
    const handleSavingShippingAddress = ()=>{
        dispatch(saveAddress({address,city,country,postalCode}));
        history.push('/payment');
    }

    return (
        <FormContainer>
            <h1>
                 Shipping Address
            </h1>
                
            <Form onSubmit={handleSavingShippingAddress}>
            <Form.Group controlId='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control type='text' placeholder='Enter Address' value={address} onChange={e=>setAddress(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='postalCode'>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control type='text' placeholder='Enter postal code' value={postalCode} onChange={e=>setPostalCode(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                        <Form.Label>City</Form.Label>
                        <Form.Control type='text' placeholder='Enter city' value={city} onChange={e=>setCity(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control type='text' placeholder='Enter country' value={country} onChange={e=>setCountry(e.target.value)}></Form.Control>
                </Form.Group>

                <Button className='btn-block' type='submit' variant='primary'>
                    continue
                </Button>

            </Form>
        </FormContainer>
    )
}

export default ShippingScreen;
