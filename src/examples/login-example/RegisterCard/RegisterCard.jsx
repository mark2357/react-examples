import React, { useState } from 'react';
import PropTypes from 'prop-types'
import qs from 'query-string'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Card,
    Button,
    InputGroup,
    InputGroupAddon,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';

import ValidInvalidText from '../../../global/components/ValidInvalidText/ValidInvalidText';
import isUserAccount from '../helpers/isUserAccount';
import saveNewUserAccount from '../helpers/saveNewUserAccount';
import setLoggedInUser from '../helpers/setLoggedInUser';

/**
 * @description
 * displays card body with email and password fields
 * has restrictions on valid password
 */
const RegisterCard = (props) => {

    const {
        email,
        setEmail,
        password,
        setPassword,
        switchToLoginTab,
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
    const [showAccountAlreadyExistsModal, setShowAccountAlreadyExistsModal] = useState(false);


    //#region input and button handler functions

    const handleRegisterClick = () => {

        if (isUserAccount(email) === false) {
            // there is no already existing account for the user so one can be made
            saveNewUserAccount(email, password);
            // saves the logged in user
            setLoggedInUser(email);
            // user is logged in and is moved to logged in page
            window.location.href = '/login-example/logged-in';
        }
        else {
            // there is already a user account for this email ask them if they want to reset there password
            setShowAccountAlreadyExistsModal(true);
        }
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

    const handleHideAccountAlreadyExistsModal = () => {
        setShowAccountAlreadyExistsModal(false);
    }

    //#endregion

    /**
     * @description
     * returns true when the password is valid or false if 1 or more requirements are not met
     * @returns {boolean}
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
            <Modal
                className='custom-modal account-already-exists-modal'
                isOpen={showAccountAlreadyExistsModal}
            >
                <ModalHeader>Account Already Exists</ModalHeader>
                <ModalBody className='text-center'>
                    <div className='mt-1'>
                        An account already exists for this email
                    </div>
                    <div className='mb-1'>
                        Click below to login with these details
                    </div>
                    <Button color='primary' onClick={() => {switchToLoginTab();}}>Login</Button>
                    <div className='mb-1'>
                    <Link to={{
                        'pathname': '/login-example/forgot-password',
                        'search': qs.stringify({'email': email})
                    }}>
                        Reset Password
                    </Link>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleHideAccountAlreadyExistsModal}>Close</Button>
                </ModalFooter>
            </Modal>
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
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
    switchToLoginTab: PropTypes.func.isRequired,
};


export default RegisterCard;