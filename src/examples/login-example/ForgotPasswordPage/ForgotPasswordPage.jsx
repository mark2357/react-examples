import React, { useState } from 'react';
import {useLocation} from "react-router-dom";

import {
    Card,
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';


const ForgotPasswordPage = () => {


    // gets the initial email from the url params
    const location = useLocation();
    const initialEmail = new URLSearchParams(location.search).get('email') || '';

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


    const [email, setEmail] = useState(initialEmail);
    const [emailValid, setEmailValid] = useState(checkEmailValid(email));
    const [showModal, setShowModal] = useState(false);
    // const showOverlay

    const handleHideModal = () => {
        setShowModal(false);
        // clears email as email reset has already been sent
        setEmail('');
    }

    const handleForgotPasswordClick = () => {
        setShowModal(true);
    }

    const handleEmailOnChange = (e) => {
        let email = e.target.value;
        setEmailValid(checkEmailValid(email))
        setEmail(email);
    }

    const handleBackToLogin = () => {
        window.location.href = '/login-example';
    }

    return (
        <div className='forgot-password-page mt-5'>
            <Modal
                className='custom-modal password-reset-modal'
                isOpen={showModal}
                toggle={handleHideModal}
            >
                <ModalHeader toggle={handleHideModal}>Password Reset</ModalHeader>
                <ModalBody className='text-center'>
                    <div className='mt-1'>
                        An email will be sent to your inbox
                    </div>
                    <div className='mb-1'>
                        (if an account exists for &quot;{email}&quot;)
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleBackToLogin}>Back To Login</Button>
                    <Button color="primary" onClick={handleHideModal}>Close</Button>
                </ModalFooter>
            </Modal>
            <Row>
                <Col
                    xs={{ size: 10, offset: 1 }}
                    sm={{ size: 8, offset: 2 }}
                    md={{ size: 6, offset: 3 }}
                    lg={{ size: 4, offset: 4 }}
                >
                    <Card className='forgotPassword-card' color='dark' inverse body>
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
                                    onChange={handleEmailOnChange}
                                    value={email}
                                />
                            </FormGroup>
                            <Button
                                onClick={handleForgotPasswordClick}
                                disabled={!emailValid}
                            >
                                Get Password Reset
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ForgotPasswordPage;