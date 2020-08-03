import React, { useState } from 'react';

import {
    Card,
    Row,
    Col,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

import Register from './RegisterCard';
import LoginCard from './LoginCard';

const LoginPage = () => {

    const [loginActiveTab, setLoginActiveTab] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginTabSelect = () => {
        setLoginActiveTab(true);
    }

    const handleRegisterTabSelect = () => {
        setLoginActiveTab(false);
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