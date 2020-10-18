import React,{useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Form, Button, FormGroup, FormCheck, FormLabel} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import {savePaymentMethod} from '../actions/cartActions';

const PaymentScreen = ({history}) => {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if(!shippingAddress){
        history.push('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    
    
    
    const handleSavingPaymentMethod = (e)=>{
        
        e.preventDefault();
        
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');
    }

    return (
        <>
       
        <FormContainer>
        <CheckoutSteps step1 step2 step3/>
            <h1 className='mb-3'>
                 Payment Methods
            </h1>
                
            <Form onSubmit={e=>handleSavingPaymentMethod(e)}>
            <FormGroup as='legend'>
                <FormLabel as='legend'>select a method</FormLabel>
            </FormGroup>
            <Form.Group controlId='PayPal'>
                    <FormCheck type='radio' label='PayPal or credit card' value='PayPal' onChange={e=>setPaymentMethod(e.target.value)} checked={paymentMethod==='PayPal'} />

                </Form.Group>
                {/* <Form.Group controlId='Stripe'>
                        <FormCheck type='radio' label='Stripe' value='Stripe' onChange={e=>setPaymentMethod(e.target.value)} checked={paymentMethod==='Stripe'}/>
                </Form.Group> */}

    

                <Button className='btn-block' type='submit' variant='primary'>
                    continue
                </Button>

            </Form>
        </FormContainer>
        </>
    )
}

export default PaymentScreen;
