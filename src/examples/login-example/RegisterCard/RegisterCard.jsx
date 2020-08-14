import React, { useState } from 'react';
import PropTypes from 'prop-types'
import qs from 'query-string'
import { Link, useHistory } from 'react-router-dom';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Card,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';

import ValidInvalidText from '../../../global/components/ValidInvalidText/ValidInvalidText';
import isUserAccount from '../helpers/userAccountHelpers/isUserAccount';
import saveUserAccount from '../helpers/userAccountHelpers/saveUserAccount';
import setLoggedInUser from '../helpers/userAccountHelpers/setLoggedInUser';
import PasswordInput from '../PasswordInput/PasswordInput';
import {

    checkPasswordStrength,
    checkPasswordToShort,
    checkPasswordContainsSpecialCharacter,
    checkPasswordHasCapital,
    checkPasswordHasLowercase,
    checkPasswordHasNumber,
} from '../helpers/passwordCheckHelpers';

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
        usePasswordStrengthMeter,
    } = props;


    const history = useHistory();

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

    //TODO: find better way to prevent code duplication as this function is very similar to one ine PasswordInput component
    /**
     * @description
     * returns true when the current password is valid
     * only used during the initial render as the password input handles future checking of password validity
     * @param {string} email 
     * @param {string} password 
     */
    const checkPasswordIsValid = (email, password) => {

        if (usePasswordStrengthMeter) {
            let passwordStrengthData = null;
            passwordStrengthData = checkPasswordStrength(email, password);
            if(passwordStrengthData.score > 2) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            let passwordToShort = checkPasswordToShort(password, 8);
            let passwordNeedCapital = checkPasswordContainsSpecialCharacter(password);
            let passwordNeedLowerCase = checkPasswordHasCapital(password);
            let passwordNeedsSpecialCharacter = checkPasswordHasLowercase(password);
            let passwordNeedsNumber = checkPasswordHasNumber(password);
            
            return !passwordToShort
                && !passwordNeedCapital
                && !passwordNeedLowerCase
                && !passwordNeedsSpecialCharacter
                && !passwordNeedsNumber;
        }
    };


    // used when both usePasswordStrengthMeter is true and false
    const [emailValid, setEmailValid] = useState(checkEmailValid(email));
    const [showPassword, setShowPassword] = useState(false);
    const [showAccountAlreadyExistsModal, setShowAccountAlreadyExistsModal] = useState(false);

    const [passwordValid, setPasswordValid] = useState(checkPasswordIsValid(email, password));
    const [showWarnings, setShowWarnings] = useState(false);


    const handleRegisterClick = () => {


        if(!emailValid || !passwordValid) {
            setShowWarnings(true);
            return;
        }

        if (isUserAccount(email) === false) {
            // there is no already existing account for the user so one can be made
            saveUserAccount(email, password, false);
            // saves the logged in user
            setLoggedInUser(email);
            // user is logged in and is moved to logged in page
            history.push('/login-example/logged-in');
        }
        else {
            // there is already a user account for this email ask them if they want to reset there password
            setShowAccountAlreadyExistsModal(true);
        }
    };

    const handleInputKeyPress = (e) => {
        // char code for enter is 13
        // only tries to register user if both email and password are valid
        if (e.charCode === 13 && emailValid && passwordValid) {
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

    const handleHideAccountAlreadyExistsModal = () => {
        setShowAccountAlreadyExistsModal(false);
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
                    <Button color='primary' onClick={() => { history.push('/login-example/login') }}>Login</Button>
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
                        autoFocus
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
                { showWarnings &&
                    <ValidInvalidText
                    className='small-text'
                    text='Email Must Contain a @'
                    valid={emailValid}
                    />
                }
                </FormGroup>
                <PasswordInput
                    email={email}
                    password={password}
                    setPassword={setPassword}
                    passwordValid={passwordValid}
                    setPasswordValid={setPasswordValid}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    usePasswordStrengthMeter={usePasswordStrengthMeter}
                    showWarnings={showWarnings}
                    onEnterPress={handleInputKeyPress}
                />
                <Button tabIndex={3} onClick={handleRegisterClick} >Create Account</Button>
            </Form>
        </Card>
    )
}

RegisterCard.propTypes = {
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,

    // weather the password field should use a password strength meter to determine if password is valid or 
    // if character requirements should be used e.g. at least 10 characters and one number
    usePasswordStrengthMeter: PropTypes.bool,
};

RegisterCard.defaultProps = {
    usePasswordStrengthMeter: false
};


export default RegisterCard;