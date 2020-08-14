import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
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
import getLoggedInUser from '../../../examples/login-example/helpers/userAccountHelpers/getLoggedInUser';
import setLoggedInUser from '../../../examples/login-example/helpers/userAccountHelpers/setLoggedInUser';
import deleteUserAccount from '../helpers/userAccountHelpers/deleteUserAccount';


/**
 * @description
 * creates profile circle fo use in navbar
 */
const LoginNavbarContent = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showConfirmDeleteUserAccountModal, setShowConfirmDeleteUserAccountModal] = useState(false);

    const history = useHistory();

	const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    const loggedInUser = getLoggedInUser();


    const handleLogoutClick = () => {
		setLoggedInUser(null);
		history.push('/login-example');
	}

    
    /**
     * @description
     * logs out user deletes there account and redirects them to the login page
     */
    const handleDeleteUserAccount = () => {
        setShowConfirmDeleteUserAccountModal(false);
        setLoggedInUser(null);
        deleteUserAccount(loggedInUser);
		history.push('/login-example/login');
    }

    /**
     * @description
     * redirects the user to the change password page
     */
    const handleChangePasswordClick = () => {
		history.push('/login-example/change-password');
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
                    <DropdownItem onClick={handleChangePasswordClick}>Change Password</DropdownItem>
                    <DropdownItem onClick={() => {setShowConfirmDeleteUserAccountModal(true); }}>Delete User Account</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

export default LoginNavbarContent;