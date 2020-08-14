import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Card,
    Row,
    Col,
    Button,
    InputGroup,
    CardTitle,
    Form,
    Input,
    Label,
    FormGroup,
    InputGroupAddon,
    Tooltip,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';

import getLoggedInUser from '../helpers/userAccountHelpers/getLoggedInUser';
import PasswordInput from '../PasswordInput/PasswordInput';
import ValidInvalidText from '../../../global/components/ValidInvalidText/ValidInvalidText';
import saveUserAccount from '../helpers/userAccountHelpers/saveUserAccount';

const ChangePasswordPage = () => {

    

    const history = useHistory();

    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);
    const [repeatPassword, setRepeatPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showWarnings, setShowWarnings] = useState(false);
    const [capsLockOn, setCapsLockOn] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    

    // redirects login page if there not logged in
    if(getLoggedInUser() === null) {
        return (
            <Redirect
            to='/login-example/login'/>
        )
    }

    const email = getLoggedInUser();
    
    /**
     * @description
     * on key down checks if caps lock is active and updates state
     * @param {Event} e 
     */
    const handleCapsLockCheck = (e) => {
        let capsLock = e.getModifierState('CapsLock');
        setCapsLockOn(capsLock);
    }


    const passwordAndRepeatMatch = password === repeatPassword && repeatPassword !== '';

    /**
     * @description
     * handles onchange event of repeat password input
     * @param {*} e 
     */
    const handleRepeatPasswordChange = (e) => {
        // repeat password has no requirements as all of those are set via the 
        let repeatPassword = e.target.value;
        setRepeatPassword(repeatPassword);
    }

    /**
     * @description
     * handles changing password of user
     */
    const handleChangePassword = () => {
        if(!passwordValid || !passwordAndRepeatMatch) {
            setShowWarnings(true);
            return;
        }
        saveUserAccount(email, password, true);
        // save new user account shows modal to let the user know there password has changed
        setShowConfirmationModal(true);
    }


    /**
     * @description
     * handles keypress from repeat password input
     * @param {*} e 
     */
    const handleInputKeyPress = (e) => {
        // char code for enter is 13
        if (e.charCode === 13) {
            handleChangePassword();
        }
    }

    /**
     * @description
     * redirects the user to the logged in page
     */
    const handleModalClose = () => {
        setShowConfirmationModal(false);
        history.push('/login-example/logged-in');
    }


    return (
        <div className='change-password-page mt-5'>
            <Modal
                className='custom-modal password-changed-modal'
                isOpen={showConfirmationModal}
            >
                <ModalHeader >Password Changed</ModalHeader>
                <ModalBody className='text-center'>
                    <div className='mt-1'>
                        Your Password was successfully changed
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleModalClose}>Close</Button>
                </ModalFooter>
            </Modal>
            <Row>
                <Col
                    xs={{ size: 10, offset: 1 }}
                    sm={{ size: 8, offset: 2 }}
                    md={{ size: 6, offset: 3 }}
                    lg={{ size: 4, offset: 4 }}
                >
                    <Card className='change-password-card' color='dark' inverse body>
                        <CardTitle>Change Password</CardTitle>
                        <Form>
                            <PasswordInput
                                email={email}
                                password={password}
                                setPassword={setPassword}
                                passwordValid={passwordValid}
                                setPasswordValid={setPasswordValid}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                                usePasswordStrengthMeter
                                showWarnings={showWarnings}
                                onEnterPress={handleChangePassword}
                            />
                            <FormGroup>
                                <Label for="repeat-password">Repeat Password</Label>
                                <InputGroup>
                                    <Input
                                        valid={passwordAndRepeatMatch}
                                        invalid={!passwordAndRepeatMatch}
                                        type={showPassword ? 'text' : 'password'}
                                        name="repeat-password"
                                        id="repeat-password"
                                        placeholder="repeat password"
                                        onChange={handleRepeatPasswordChange}
                                        value={repeatPassword}
                                        onKeyPress={handleInputKeyPress}
                                        onKeyDown={handleCapsLockCheck}
                                        onBlur={() => {setCapsLockOn(false); }}
                                    />
                                    <InputGroupAddon addonType="append">
                                        <Button
                                            tabIndex={4}
                                            className='password-visible-button'
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            <FontAwesomeIcon icon={showPassword ? 'eye' : 'eye-slash'} />
                                        </Button>
                                    </InputGroupAddon>
                                </InputGroup>
                                <Tooltip
                                    className='repeat-password-warning-popover'
                                    placement="left"
                                    isOpen={capsLockOn}
                                    target='repeat-password'
                                    fade={false}
                                >
                                    WARNING Caps Lock is on
                                </Tooltip>
                                { showWarnings && 
                                    <ValidInvalidText
                                        className='small-text'
                                        text='repeat password must match password'
                                        valid={passwordAndRepeatMatch}
                                    />
                                }
                            </FormGroup>
                            <Button
                                onClick={handleChangePassword}
                            >
                                Change Password
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ChangePasswordPage;