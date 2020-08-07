import React, {useState} from 'react';
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getLoggedInUser from '../../../examples/login-example/helpers/getLoggedInUser';
import setLoggedInUser from '../../../examples/login-example/helpers/setLoggedInUser';
import deleteUserAccount from '../helpers/deleteUserAccount';


/**
 * @description
 * creates profile circle fo use in navbar
 */
const LoginNavbarContent = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showConfirmDeleteUserAccountModal, setShowConfirmDeleteUserAccountModal] = useState(false);

	const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    const loggedInUser = getLoggedInUser();

    const handleLogoutClick = () => {
		setLoggedInUser(null);
		window.location.href = '/login-example';
	}
    
    const handleDeleteUserAccount = () => {
        setLoggedInUser(null);
        deleteUserAccount(loggedInUser);
		window.location.href = '/login-example';
    }


    if (loggedInUser === null)
        return null;

    return (
        <div className='login-navbar-content'>
            <Modal
                className='custom-modal account-already-exists-modal'
                isOpen={showConfirmDeleteUserAccountModal}
            >
                <ModalHeader>Account Already Exists</ModalHeader>
                <ModalBody className='text-center'>
                    <div className='mt-1'>
                        Are You Sure You Want To Delete Your Account?
                        This action is irreversible.
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleDeleteUserAccount}>Yes</Button>
                    <Button color="primary" onClick={() => {setShowConfirmDeleteUserAccountModal(false); }}>No</Button>
                </ModalFooter>
            </Modal>
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle tag='span'>
                    <FontAwesomeIcon className='user-icon' icon='user-circle' />
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem header>{loggedInUser}</DropdownItem>
                    <DropdownItem onClick={handleLogoutClick}>Logout</DropdownItem>
                    <DropdownItem onClick={() => {setShowConfirmDeleteUserAccountModal(true); }}>Delete User Account</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

export default LoginNavbarContent;