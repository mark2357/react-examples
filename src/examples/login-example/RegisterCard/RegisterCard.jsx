import React, { useState } from 'react';
import PropTypes from 'prop-types'
import qs from 'query-string'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import zxcvbn from 'zxcvbn';
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
    Progress,
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
        userPasswordStrengthMeter,
    } = props;


    // #region input validation check functions

    /**
     * @description
     * determines the password strength using the zxcvbn library
     * @param { string } email
     * @param { string } password
     * @returns {{ score: number, warning: string, suggestions: [string] }}
     */
    const checkPasswordStrength = (email, password) => {
        let passwordData = zxcvbn(password, [email])
        let passwordStrengthData = {
            score: passwordData.score,
            warning: passwordData.feedback.warning,
            suggestions: passwordData.feedback.suggestions,
        }
        return passwordStrengthData;
    }

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

    // used when both userPasswordStrengthMeter is true and false
    const [emailValid, setEmailValid] = useState(checkEmailValid(email));
    const [showPassword, setShowPassword] = useState(false);
    const [showAccountAlreadyExistsModal, setShowAccountAlreadyExistsModal] = useState(false);

    // used when both userPasswordStrengthMeter is false
    const [passwordToShort, setPasswordToShort] = useState(checkPasswordToShort(password));
    const [passwordNeedCapital, setPasswordNeedCapital] = useState(checkPasswordNeedsCapital(password));
    const [passwordNeedLowerCase, setPasswordNeedLowerCase] = useState(checkPasswordNeedsLowercase(password));
    const [passwordNeedsSpecialCharacter, setPasswordNeedsSpecialCharacter] = useState(checkPasswordNeedsSpecialCharacter(password));
    const [passwordNeedsNumber, setPasswordNeedsNumber] = useState(checkPasswordNeedsNumber(password));

    // used when both userPasswordStrengthMeter is true
    const [passwordStrengthData, setPasswordStrengthData] = useState(checkPasswordStrength(email, password));

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

    const handleInputKeyPress = (e) => {
        // char code for enter is 13
        // only tries to register user if both email and password are valid
        if (e.charCode === 13 && emailValid && passwordValid()) {
            handleRegisterClick();
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

        if (userPasswordStrengthMeter) {
            setPasswordStrengthData(checkPasswordStrength(email, password));
        }
        else {
            setPasswordToShort(checkPasswordToShort(password));
            setPasswordNeedsSpecialCharacter(checkPasswordNeedsSpecialCharacter(password))
            setPasswordNeedCapital(checkPasswordNeedsCapital(password))
            setPasswordNeedLowerCase(checkPasswordNeedsLowercase(password))
            setPasswordNeedsNumber(checkPasswordNeedsNumber(password))
        }
           
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
     * returns true when the password is valid
     * @returns {boolean}
     */
    const passwordValid = () => {
        if(userPasswordStrengthMeter) {
            return passwordStrengthData.score > 2;
        }
        else {
            return !passwordToShort
                && !passwordNeedCapital
                && !passwordNeedLowerCase
                && !passwordNeedsSpecialCharacter
                && !passwordNeedsNumber;
        }
    }

    /**
     * @description
     * returns the color the password strength meter should be
     * @returns {string}
     */
    const getPasswordStrengthColor = () => {
        switch (passwordStrengthData.score) {
            case 0:
            case 1:
                return 'danger';
            case 2:
                return 'warning';
            case 3:
            case 4:
                return 'success';
            default:
                return 'danger';
        }
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
                    <Button color='primary' onClick={() => { switchToLoginTab(); }}>Login</Button>
                    <div className='mb-1'>
                        <Link to={{
                            'pathname': '/login-example/forgot-password',
                            'search': qs.stringify({ 'email': email })
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
                            valid={passwordValid()}
                            invalid={!passwordValid()}
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            placeholder="password"
                            onChange={handleValidatePassword}
                            value={password}
                            onKeyPress={handleInputKeyPress}
                        />
                        <InputGroupAddon addonType="append">
                            <Button tabIndex={4} className='password-visible-button' onClick={handlePasswordToggle}>
                                <FontAwesomeIcon icon={showPassword ? 'eye' : 'eye-slash'} />
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                    { !userPasswordStrengthMeter &&
                    <>
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
                    </>
                    }
                </FormGroup>
                { userPasswordStrengthMeter &&
                    <>
                    <div className='small-text mb-2'>
                        Password Strength:
                    </div>
                    <Progress multi>
                        <Progress bar color={getPasswordStrengthColor()} value={(passwordStrengthData.score + 1) * 20} />
                    </Progress>
                    <div className='small-text mb-2 mt-2'>
                        {/* displays each warning string in the array */}
                        { passwordStrengthData.warning !== '' &&
                            <>
                                <span>
                                {passwordStrengthData.warning}
                                </span>
                                <br />
                            </>
                        }
                        {
                            passwordStrengthData.suggestions.map(suggestion => (
                                <><span>{suggestion}</span><br/></>
                            ))
                        }
                    </div>
                    </>
                }
                <Button tabIndex={3} onClick={handleRegisterClick} disabled={(!emailValid) || (!passwordValid())}>Create Account</Button>
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

    // weather the password field should use a password strength meter to determine if password is valid or 
    // if character requirements should be used e.g. at least 10 characters and one number
    userPasswordStrengthMeter: PropTypes.bool.isRequired,
};

RegisterCard.defaultProps = {
    userPasswordStrengthMeter: false
};


export default RegisterCard;