import React, { useState } from 'react';


import {
    Form,
    FormGroup,
    Label,
    Input,
    Card,
    Row,
    Col,
    Button,
    CardTitle,
    CardText,
    InputGroup,
    InputGroupAddon,
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Register = () => {

    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    
    const handleLoginCLick = () => {
        console.log('handleLoginCLick');
    };
    
    /**
     * @description
     * handles validating the email input on value change
     * @param {Element} e 
     */
    const validateEmail = (e) => {
        let email = e.target.value;
        let valid = true;
        // email must be at least 3 characters
        if (email.length < 3) valid = false;

        let atIndex = email.indexOf('@');

        if (atIndex <= 0 || atIndex == email.length - 1) valid = false;
    
        console.log(atIndex);

        setEmailValid(valid);
        setEmail(email);
    };

    /**
     * @description
     * handles validating the password input on value change
     * @param {Element} e 
     */
    const validatePassword = (e) => {
        let password = e.target.value;
        let valid = true;
        // password must be at least 1 character
        // all other password related requirements would be done at the register page
        if (password.length < 1) valid = false;

        setPasswordValid(valid);
        setPassword(password);
    };

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className='login-example mt-5'>
            <Row>
                <Col
                    xs={{ size: 10, offset: 1 }}
                    sm={{ size: 8, offset: 2 }}
                    md={{ size: 6, offset: 3 }}
                    lg={{ size: 4, offset: 4 }}
                >
                    <Card color='dark' body inverse>
                        <CardTitle>Register</CardTitle>
                        <Form>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    valid={emailValid}
                                    invalid={!emailValid}
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="email"
                                    onChange={validateEmail}
                                    value={email}
                                    />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <InputGroup>
                                    <Input
                                    valid={passwordValid}
                                    invalid={!passwordValid}
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    id="password"
                                    placeholder="password"
                                    onChange={validatePassword}
                                    value={password}    
                                    />
                                    <InputGroupAddon addonType="append">
                                        <Button className='password-visible-button' onClick={handlePasswordToggle}>
                                            <FontAwesomeIcon icon={showPassword ? 'eye' : 'eye-slash'} />
                                        </Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <Label for="repeat-password">Repeat Password</Label>
                                <InputGroup>
                                    <Input
                                    valid={passwordValid}
                                    invalid={!passwordValid}
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    id="repeat-password"
                                    placeholder="repeat password"
                                    onChange={validatePassword}
                                    value={password}    
                                    />
                                    <InputGroupAddon addonType="append">
                                        <Button className='password-visible-button' onClick={handlePasswordToggle}>
                                            <FontAwesomeIcon icon={showPassword ? 'eye' : 'eye-slash'} />
                                        </Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                            <Button onClick={handleLoginCLick} disabled={!emailValid || !passwordValid}>Register</Button>
                        </Form>
                        <CardText className='card-links-wrapper'>
                                <a className='mr-auto' href='/'>Register</a>
                                <a href='/'>Forgot Password ?</a>
                        </CardText>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Register;