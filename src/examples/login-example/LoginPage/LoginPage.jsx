import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
    Card,
    Row,
    Col,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

import Register from '../RegisterCard/RegisterCard';
import LoginCard from '../LoginCard/LoginCard';
import getLoggedInUser from '../helpers/getLoggedInUser';

const LoginPage = () => {

    const [loginActiveTab, setLoginActiveTab] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /**
     * @description
     * switches to displaying the login tab
     */
    const handleLoginTabSelect = () => {
        setLoginActiveTab(true);
    }

    /**
     * @description
     * switches to displaying the register tab
     */
    const handleRegisterTabSelect = () => {
        setLoginActiveTab(false);
    }

    
    // redirects logged in user to logged in page
    if(getLoggedInUser() !== null) {
        return (
            <Redirect
            to='/login-example/logged-in'/>
        )
    }

    return (
        <div className='login-page mt-5'>
            <Row>
                <Col
                    xs={{ size: 10, offset: 1 }}
                    sm={{ size: 8, offset: 2 }}
                    md={{ size: 6, offset: 3 }}
                    lg={{ size: 4, offset: 4 }}
                >
                    <Card className='login-page-card' color='dark' inverse>
                        <Nav tabs justified className='login-tabs justify-content-center'>
                            <NavItem>
                                <NavLink
                                    className={loginActiveTab ? 'active' : ''}
                                    onClick={handleLoginTabSelect}
                                >
                                    Login
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={loginActiveTab ? '' : 'active'}
                                    onClick={handleRegisterTabSelect}
                                >
                                    Register
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Card className='card-wrapper' body color='dark' inverse>
                            { loginActiveTab &&
                                <LoginCard
                                    email = {email}
                                    setEmail = {setEmail}
                                    password = {password}
                                    setPassword = {setPassword}
                                />
                            }
                            { !loginActiveTab &&
                                <Register
                                    email = {email}
                                    setEmail = {setEmail}
                                    password = {password}
                                    setPassword = {setPassword}
                                    switchToLoginTab = {() => {setLoginActiveTab(true)}}
                                    userPasswordStrengthMeter={true}
                                />
                            }
                        </Card>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default LoginPage;