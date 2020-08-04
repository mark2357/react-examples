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

import ValidInvalidText from '../../global/components/ValidInvalidText/ValidInvalidText';

const RegisterCard = (props) => {

    const {
        email,
        setEmail,
        password,
        setPassword,
    } = props;



    const checkPasswordToShort = (password) => {
        let minLength = 8;
        // if password is no longer too short or now too short change passwordToShort
        if (password.length < minLength) return true;

        return false;
    }

    const checkPasswordNeedsSpecialCharacter = (password) => {
        // uses regex to determine if password contains various characters
        let specialFormat = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
        return !specialFormat.test(password);
    }

    const checkPasswordNeedsCapital = (password) => {
        // uses regex to determine if password contains various characters
        let capitalFormat = /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/;
        return !capitalFormat.test(password);
    }

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


    const [emailValid, setEmailValid] = useState(false);
    const [passwordToShort, setPasswordToShort] = useState(checkPasswordToShort(password));
    const [passwordNeedCapital, setPasswordNeedCapital] = useState(checkPasswordNeedsCapital(password));
    const [passwordNeedLowerCase, setPasswordNeedLowerCase] = useState(checkPasswordNeedsLowercase(password));
    const [passwordNeedsSpecialCharacter, setPasswordNeedsSpecialCharacter] = useState(checkPasswordNeedsSpecialCharacter(password));
    const [passwordNeedsNumber, setPasswordNeedsNumber] = useState(checkPasswordNeedsNumber(password));
    const [showPassword, setShowPassword] = useState(false);


    const handleRegisterClick = () => {
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

        setPasswordToShort(checkPasswordToShort(password));

        setPasswordNeedsSpecialCharacter(checkPasswordNeedsSpecialCharacter(password))
        setPasswordNeedCapital(checkPasswordNeedsCapital(password))
        setPasswordNeedLowerCase(checkPasswordNeedsLowercase(password))
        setPasswordNeedsNumber(checkPasswordNeedsNumber(password))

        setPassword(password);
    };



    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    }

    const passwordValid = () => {
        return !passwordToShort && !passwordNeedCapital && !passwordNeedLowerCase && !passwordNeedsSpecialCharacter && !passwordNeedsNumber;
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
                        onChange={validateEmail}
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
                            onChange={validatePassword}
                            value={password}
                        />
                        <InputGroupAddon addonType="append">
                            <Button className='password-visible-button' onClick={handlePasswordToggle}>
                                <FontAwesomeIcon icon={showPassword ? 'eye' : 'eye-slash'} />
                            </Button>
                        </InputGroupAddon>
                        {/* <FormFeedback valid={!passwordToShort}>At least 8 characters</FormFeedback>
                        <FormFeedback valid={!passwordNeedCapital}>a capital letter</FormFeedback>
                        <FormFeedback valid={!passwordNeedLowerCase}>a lowercase letter</FormFeedback>
                        <FormFeedback valid={!passwordNeedsSpecialCharacter}>a special character</FormFeedback>
                        <FormFeedback valid={!passwordNeedsNumber}>a number</FormFeedback>
                        <FormText>Password Must Contain:</FormText> */}
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
                    {/*<div className='small-text valid'>
                         <FontAwesomeIcon icon='check-circle'/>
                         <span valid={!passwordToShort}>At least 8 characters</span>
                     </div>
                     <div className='small-text'>
                         <FontAwesomeIcon icon='check-circle'/>
                         <span valid={!passwordNeedCapital}>a capital letter</span>
                     </div>
                     <div className='small-text'>
                         <FontAwesomeIcon icon='check-circle'/>
                         <span valid={!passwordNeedLowerCase}>a lowercase letter</span>
                     </div>
                     <div className='small-text'>
                         <FontAwesomeIcon icon='check-circle'/>
                         <span valid={!passwordNeedsSpecialCharacter}>a special character</span>
                     </div>
                     <div className='small-text'>
                         <FontAwesomeIcon icon='check-circle'/>
                         <span valid={!passwordNeedsNumber}>a number</span>
                     </div> */}
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