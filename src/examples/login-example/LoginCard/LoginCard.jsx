import React, { useState } from 'react';
import PropTypes from 'prop-types'
import qs from 'query-string'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useHistory } from 'react-router-dom';
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
    Alert,
} from 'reactstrap';

import validUserAccountAndPassword from '../helpers/validUserAccountAndPassword';
import setLoggedInUser from '../helpers/setLoggedInUser';

/**
 * @description
 * displays a card body that contains a login form with basic validation 
 */
const LoginCard = (props) => {

    const {
        email,
        setEmail,
        password,
        setPassword,
    } = props;


    /**
    * @description
    * checks weather email address is valid
    * @param {string} email 
    * @returns {boolean}
    */
    const checkEmailValid = (email) => {
        let valid = true;
        // email must be at least 3 characters
        if (email.length < 3) valid = false;

        let atIndex = email.indexOf('@');

        if (atIndex <= 0 || atIndex == email.length - 1) valid = false;

        return valid;
    }

    const history = useHistory();

    // defines state
    const [emailValid, setEmailValid] = useState(checkEmailValid(email));
    const [passwordValid, setPasswordValid] = useState(password.length >= 1);
    const [showPassword, setShowPassword] = useState(false);
    const [showIncorrectEmailOrPasswordMsg, setShowIncorrectEmailOrPasswordMsg] = useState(false);

    //#region input handler functions

    const handleLoginClick = () => {

        if (validUserAccountAndPassword(email, password)) {
            // user is logged in and is moved to logged in page
            setLoggedInUser(email);
            history.push('/login-example/logged-in');
        }
        else {
            setShowIncorrectEmailOrPasswordMsg(true);
        }
    };

    const handleInputKeyPress = (e) => {
        // char code for enter pressed
        if(e.charCode === 13) {
            handleLoginClick();
        }
    }

    /**
     * @description
     * handles validating the email input on value change
     * @param {Element} e 
     */
    const handleValidateEmail = (e) => {
        let email = e.target.value;

        setEmailValid(checkEmailValid(email));
        setEmail(email);
    };

    /**
     * @description
     * handles validating the password input on value change
     * @param {Element} e
     */
    const handleValidatePassword = (e) => {
        let password = e.target.value;
        // password must be at least 1 character
        // all other password related requirements would be done at the register page, so it would just show wrong password
        setPasswordValid(password.length >= 1);
        setPassword(password);
    };

    /**
     * @description
     * handles the switching of the password between visible and hidden
     */
    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    }

    /**
     * @description
     * handles the dismissal of the wrong password or email alert
     */
    const handleAlertToggle = () => {
        setShowIncorrectEmailOrPasswordMsg(false);
    }

    //#endregion

    return (
        <Card className='login-card' body color='dark' inverse>
            <Form>
                <Alert color="danger" isOpen={showIncorrectEmailOrPasswordMsg} toggle={handleAlertToggle}>
                    <FontAwesomeIcon icon='exclamation' />
                    <span className='incorrect-email-text'>Invalid Email or password</span>
                </Alert>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                        tabIndex={1}
                        valid={emailValid}
                        invalid={!emailValid}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="email"
                        onChange={handleValidateEmail}
                        value={email}
                        onKeyPress={handleInputKeyPress}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <InputGroup>
                        <Input
                            tabIndex={2}
                            valid={passwordValid}
                            invalid={!passwordValid}
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            placeholder="password"
                            onChange={handleValidatePassword}
                            value={password}
                            onKeyPress={handleInputKeyPress}
                        />
                        <InputGroupAddon addonType="append">
                            <Button tabIndex={5} className='password-visible-button' onClick={handlePasswordToggle}>
                                <FontAwesomeIcon icon={showPassword ? 'eye' : 'eye-slash'} />
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                </FormGroup>
                <Button tabIndex={3} onClick={handleLoginClick} disabled={!emailValid || !passwordValid}>Login</Button>
            </Form>
            <CardText className='card-links-wrapper'>
                <Link tabIndex={4} to={{
                    'pathname': '/login-example/forgot-password',
                    'search': qs.stringify({'email': email})
                    }}
                    >Forgot Password ?</Link>
            </CardText>
        </Card>
    )
}
LoginCard.propTypes = {
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
};

export default LoginCard;