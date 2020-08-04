import React, { useState } from 'react';
import PropTypes from 'prop-types'

import {
    Form,
    FormGroup,
    Label,
    Input,
    Card,
    Button,
    CardText,
    InputGroup,
    InputGroupAddon,
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LoginCard = (props) => {

    const {
        email,
        setEmail,
        password,
        setPassword,
    } = props;

    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const handleLoginClick = () => {
        console.log('handleLoginClick');
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
        <Card className='login-card' body color='dark' inverse>
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
                <Button onClick={handleLoginClick} disabled={!emailValid || !passwordValid}>Login</Button>
            </Form>
            <CardText className='card-links-wrapper'>
                <a href='/forgot-password'>Forgot Password ?</a>
            </CardText>
        </Card>
    )
}
LoginCard.propTypes = {
    email: PropTypes.string,
    setEmail: PropTypes.func,
    password: PropTypes.string,
    setPassword: PropTypes.func,
};

export default LoginCard;