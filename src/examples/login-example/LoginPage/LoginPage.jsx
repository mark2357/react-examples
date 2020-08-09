import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { Redirect, useHistory } from 'react-router-dom';
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

const LoginPage = (props) => {

    const {
        loginActiveTab
    } = props;

    const history = useHistory();

    // const [loginActiveTab, setLoginActiveTab] = useState(loginInitialTab);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /**
     * @description
     * switches to displaying the login tab
     */
    const handleLoginTabSelect = () => {
        // setLoginActiveTab(true);
        history.push('/login-example/login');
    }

    /**
     * @description
     * switches to displaying the register tab
     */
    const handleRegisterTabSelect = () => {
        // setLoginActiveTab(false);
        history.push('/login-example/register');
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
LoginPage.propTypes = {
    loginActiveTab : PropTypes.bool,
}

LoginPage.defaultProps = {
    loginActiveTab : true,
}

export default LoginPage;