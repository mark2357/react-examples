import React, { useState } from 'react';

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


    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(checkEmailValid(email));
    const [showModal, setShowModal] = useState(true);
    // const showOverlay

    const handleHideModal = () => {
        setShowModal(false);
    }

    const handleForgotPasswordClick = () => {
        setShowModal(true);
    }


    const handleEmailOnChange = (e) => {
        let email = e.target.value;
        setEmailValid(checkEmailValid(email))
        setEmail(email);
    }

    return (
        <div className='forgot-password-page mt-5'>
            <Modal
                className='password-reset-modal'
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