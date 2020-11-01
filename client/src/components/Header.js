import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Route} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import {Navbar , Nav, Container, NavDropdown} from 'react-bootstrap';
import SearchBox from './SearchBox';
import {logout} from '../actions/userActions';



const Header = () => {

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const handleLogout = ()=>{
        dispatch(logout());
    }


    return (
        <header>

          <Navbar bg="dark" variant='dark'  expand="lg" collapseOnSelect>

              <Container>

                  <LinkContainer to='/'>
                     <Navbar.Brand>MyAmazon</Navbar.Brand>
                  </LinkContainer>
                  <LinkContainer to='/'>
                     <Route render={({history})=> <SearchBox history={history}/> }/>
                  </LinkContainer>
  
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />

                  <Navbar.Collapse id="basic-navbar-nav">
                       <Nav className="ml-auto">

                          <LinkContainer to ='/cart'>
                                 <Nav.Link> <i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                           </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title ={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <>
                                    <LinkContainer to='/login'>
                                    <Nav.Link> <i className="fas fa-user"></i>  Sign In</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/register'>
                            <Nav.Link> <i class="fas fa-user-plus"></i>{'  '}Sign Up</Nav.Link>
                                </LinkContainer>
                                </>
                            )}

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title ='Admin' id='username'>
                                    <LinkContainer to='/admin/users'>
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/products'>
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orders'>
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                          
                    

                        </Nav>
                  </Navbar.Collapse>


             </Container>
        </Navbar>

    </header>
    )
}

export default Header;
