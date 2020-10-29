import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import EditUserScreen from './screens/EditUserScreen';
import ProductListScreen from './screens/ProductListScreen';
import EditProductScreen from './screens/EditProductScreen';
import OrderListScreen from './screens/OrderListScreen';



function App() {
  return (
    <Router>
    <Header/>
      <main className='py-3'>
      <Container>
      <Route path='/' component={HomeScreen} exact/>
      <Route path='/:keyword' component={HomeScreen} exact/>
      <Route path='/product/:id' component={ProductScreen} exact/>
      <Route path='/cart/:id?' component={CartScreen} />
      <Route path='/login' component={LoginScreen} />
      <Route path='/register' component={RegisterScreen} />
      <Route path='/profile' component={ProfileScreen} />
      <Route path='/shipping' component={ShippingScreen} />
      <Route path='/payment' component={PaymentScreen} />
      <Route path='/placeorder' component={PlaceOrderScreen} />
      <Route path='/orders/:id' component={OrderScreen} />
      <Route path='/admin/users' component={UserListScreen} />
      <Route path='/admin/user/:id/edit' component={EditUserScreen} />
      <Route path='/admin/products' component={ProductListScreen} />
      <Route path='/admin/product/:id/edit' component={EditProductScreen} />
      <Route path='/admin/orders' component={OrderListScreen} />
      </Container>
    
      </main>
      
  
    <Footer/>
    </Router>
  );
}

export default App;
