import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    FormGroup,
    InputGroup,
    Input,
    Label,
    Tooltip,
    InputGroupAddon,
    Button,
    Progress
} from 'reactstrap';

import ValidInvalidText from '../../../global/components/ValidInvalidText/ValidInvalidText';
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
 * password input is a custom password input that automatically determines if the password is valid
 */
const PasswordInput = (props) => {

    const {
        email,
        password,
        setPassword,
        passwordValid,
        setPasswordValid,

        showWarnings,
        usePasswordStrengthMeter,
        // showPassword and setShowPassword are renamed as if there not provided in via props an internal state value is useed
        showPassword: showPasswordProps,
        setShowPassword: setShowPasswordProps,

        onEnterPress,
    } = props;


    // if an internal state value should be used for show password or if the value should be taken from the props
    const internalShowPassword = showPasswordProps === null || setShowPasswordProps === null;


    const [showPasswordState, setShowPasswordState] = useState(false);

    // used when both usePasswordStrengthMeter is false
    const [passwordToShort, setPasswordToShort] = useState(checkPasswordToShort(password, 8));
    const [passwordNeedCapital, setPasswordNeedCapital] = useState(checkPasswordHasCapital(password));
    const [passwordNeedLowerCase, setPasswordNeedLowerCase] = useState(checkPasswordHasLowercase(password));
    const [passwordNeedsSpecialCharacter, setPasswordNeedsSpecialCharacter] = useState(checkPasswordContainsSpecialCharacter(password));
    const [passwordNeedsNumber, setPasswordNeedsNumber] = useState(checkPasswordHasNumber(password));
    const [capsLockOn, setCapsLockOn] = useState(false);

    // used when both usePasswordStrengthMeter is true
    const [passwordStrengthData, setPasswordStrengthData] = useState(checkPasswordStrength(email, password));

    const showPassword = internalShowPassword ? showPasswordState : showPasswordProps;
    const setShowPassword = internalShowPassword ? setShowPasswordState : setShowPasswordProps;

    
    /**
     * @description
     * handles validating the password input on value change
     * @param {Element} e 
     */
    const handleValidatePassword = (e) => {
        let newPassword = e.target.value;

        let newPasswordStrengthData = null; 
        if (usePasswordStrengthMeter) {
            newPasswordStrengthData = checkPasswordStrength(email, newPassword);
            setPasswordStrengthData(newPasswordStrengthData);
        }
        else {
            setPasswordToShort(checkPasswordToShort(newPassword, 8));
            setPasswordNeedsSpecialCharacter(checkPasswordContainsSpecialCharacter(newPassword))
            setPasswordNeedCapital(checkPasswordHasCapital(newPassword))
            setPasswordNeedLowerCase(checkPasswordHasLowercase(newPassword))
            setPasswordNeedsNumber(checkPasswordHasNumber(newPassword))
        }
        
        let valid = false;
        if(usePasswordStrengthMeter) {
            valid = newPasswordStrengthData.score > 2;
        }
        else {
            valid = !passwordToShort
                && !passwordNeedCapital
                && !passwordNeedLowerCase
                && !passwordNeedsSpecialCharacter
                && !passwordNeedsNumber;
        }

        setPasswordValid(valid);
        setPassword(newPassword);
    };

    const handleInputKeyPress = (e) => {
        // char code for enter is 13
        // only tries to register user if both email and password are valid
        if (e.charCode === 13) {
            onEnterPress();
        }
    }

    /**
     * @description
     * handles the password toggle button
     * shows or hides the characters in the password field
     */
    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    }

    /**
     * @description
     * on key down checks if caps lock is active and updates state
     * @param {Event} e 
     */
    const handleCapsLockCheck = (e) => {
        let capsLock = e.getModifierState('CapsLock');
        setCapsLockOn(capsLock);
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
                case 2:
                return 'danger';
            case 3:
            case 4:
                return 'success';
            default:
                return 'danger';
        }
    }

    return (
        <div className='password-input'>
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
                            onKeyDown={handleCapsLockCheck}
                            onBlur={() => {setCapsLockOn(false); }}
                        />
                        <Tooltip
                            className='password-input-warning-popover'
                            placement="left"
                            isOpen={capsLockOn}
                            target='password'
                            fade={false}
                        >
                            WARNING Caps Lock is on
                        </Tooltip>
                        <InputGroupAddon addonType="append">
                            <Button tabIndex={4} className='password-visible-button' onClick={handlePasswordToggle}>
                                <FontAwesomeIcon icon={showPassword ? 'eye' : 'eye-slash'} />
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                    { showWarnings && usePasswordStrengthMeter &&
                        <ValidInvalidText
                        className='small-text'
                        text='Password strength meter must be green'
                        valid={passwordValid}
                        />
                    }
                    { !usePasswordStrengthMeter &&
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
                { usePasswordStrengthMeter &&
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
                            <div key={suggestion}>
                                {suggestion}
                            </div>
                            ))
                        }
                    </div>
                    </>
                }
        </div>
    )
}
PasswordInput.propTypes = {
    // only used as part of the password strength analyses, passwords containing the email are weaker
    email: PropTypes.string,
    
    // the password and setPassword function as the password state should be stored in a parent component
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
    // the password and setPassword function as the password state should be stored in a parent component
    passwordValid: PropTypes.bool.isRequired,
    setPasswordValid: PropTypes.func.isRequired,

    // weather to show password warning
    showWarnings: PropTypes.bool,
    // if the password strength meter should be used or if a series of requirements should be used
    usePasswordStrengthMeter: PropTypes.bool.isRequired,
    showPassword: PropTypes.bool,
    setShowPassword: PropTypes.func,
    // function to call when enter is pressed and the input has focus
    onEnterPress: PropTypes.func,
}

PasswordInput.defaultProps = {
    email: '',
    showWarnings : false,
    showPassword: null,
    setShowPassword: null,
    onEnterPress: null,
}

export default PasswordInput;