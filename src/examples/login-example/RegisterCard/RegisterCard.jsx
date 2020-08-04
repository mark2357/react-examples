import React, { useState } from 'react';
import PropTypes from 'prop-types'

import {
    Form,
    FormGroup,
    Label,
    Input,
    Card,
    Button,
    InputGroup,
    InputGroupAddon,
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ValidInvalidText from '../../../global/components/ValidInvalidText/ValidInvalidText';

const RegisterCard = (props) => {

    const {
        email,
        setEmail,
        password,
        setPassword,
    } = props;


    // #region input validation check functions

    /**
     * @description
     * determines whether password is to short
     * @param {string} password 
     * @returns {boolean}
     */
    const checkPasswordToShort = (password) => {
        
        let minLength = 8;

        if (password.length < minLength) return true;
        return false;
    }

    /**
     * @description
     * determines whether password needs a special character
     * @param {string} password
     * @returns {boolean}
     */
    const checkPasswordNeedsSpecialCharacter = (password) => {
        // uses regex to determine if password contains various characters
        let specialFormat = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
        return !specialFormat.test(password);
    }

    /**
     * @description
     * determines whether password needs a capital character
     * @param {string} password
     * @returns {boolean}
     */
    const checkPasswordNeedsCapital = (password) => {
        // uses regex to determine if password contains various characters
        let capitalFormat = /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/;
        return !capitalFormat.test(password);
    }

    /**
     * @description
     * determines whether password needs a lowercase character
     * @param {string} password
     * @returns {boolean}
     */
    const checkPasswordNeedsLowercase = (password) => {
        // uses regex to determine if password contains various characters
        let lowercaseFormat = /[abcdefghijklmnopqrstuvwxyz]/;
        return !lowercaseFormat.test(password);
    }

    const checkPasswordNeedsNumber = (password) => {
        // uses regex to determine if password contains various characters
        let numbersFormat = /[1234567890]/;
        return !numbersFormat.test(password);
    }

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

    //#endregion

    const [emailValid, setEmailValid] = useState(checkEmailValid(email));
    const [passwordToShort, setPasswordToShort] = useState(checkPasswordToShort(password));
    const [passwordNeedCapital, setPasswordNeedCapital] = useState(checkPasswordNeedsCapital(password));
    const [passwordNeedLowerCase, setPasswordNeedLowerCase] = useState(checkPasswordNeedsLowercase(password));
    const [passwordNeedsSpecialCharacter, setPasswordNeedsSpecialCharacter] = useState(checkPasswordNeedsSpecialCharacter(password));
    const [passwordNeedsNumber, setPasswordNeedsNumber] = useState(checkPasswordNeedsNumber(password));
    const [showPassword, setShowPassword] = useState(false);


    //#region input and button handler functions

    /**
     * @description
     * handles when the register button is clicked
     */
    const handleRegisterClick = () => {
        console.log('handleLoginCLick');
    };

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

        setPasswordToShort(checkPasswordToShort(password));
        setPasswordNeedsSpecialCharacter(checkPasswordNeedsSpecialCharacter(password))
        setPasswordNeedCapital(checkPasswordNeedsCapital(password))
        setPasswordNeedLowerCase(checkPasswordNeedsLowercase(password))
        setPasswordNeedsNumber(checkPasswordNeedsNumber(password))

        setPassword(password);
    };

    /**
     * @description
     * handles the password toggle button
     * shows or hides the characters in the password field
     */
    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    }

    //#endregion

    /**
     * @description
     * returns true when the password is valid or false if 1 or more requirements are not met
     */
    const passwordValid = () => {
        return !passwordToShort
        && !passwordNeedCapital
        && !passwordNeedLowerCase
        && !passwordNeedsSpecialCharacter
        && !passwordNeedsNumber;
    }

    return (
        <Card className='register-card' color='dark' body inverse>
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
                        onChange={handleValidateEmail}
                        value={email}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <InputGroup>
                        <Input
                            valid={passwordValid()}
                            invalid={!passwordValid()}
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            placeholder="password"
                            onChange={handleValidatePassword}
                            value={password}
                        />
                        <InputGroupAddon addonType="append">
                            <Button className='password-visible-button' onClick={handlePasswordToggle}>
                                <FontAwesomeIcon icon={showPassword ? 'eye' : 'eye-slash'} />
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                    <div>
                        <span className='small-text'>Password Must Contain:</span>
                    </div>
                    <ValidInvalidText
                        className='small-text'
                        text='at least 8 characters'
                        valid={!passwordToShort}
                    />
                    <ValidInvalidText
                        className='small-text'
                        text='a capital letter'
                        valid={!passwordNeedCapital}
                    />
                    <ValidInvalidText
                        className='small-text'
                        text='a lowercase letter'
                        valid={!passwordNeedLowerCase}
                    />
                    <ValidInvalidText
                        className='small-text'
                        text='a special character'
                        valid={!passwordNeedsSpecialCharacter}
                    />
                    <ValidInvalidText
                        className='small-text'
                        text='a number'
                        valid={!passwordNeedsNumber}
                    />
                </FormGroup>
                <Button onClick={handleRegisterClick} disabled={!emailValid || !passwordValid}>Create Account</Button>
            </Form>
        </Card>
    )
}

RegisterCard.propTypes = {
    email: PropTypes.string,
    setEmail: PropTypes.func,
    password: PropTypes.string,
    setPassword: PropTypes.func,
};


export default RegisterCard;